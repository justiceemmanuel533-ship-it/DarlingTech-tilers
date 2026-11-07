import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Layers, Eye, RefreshCw, ChevronDown, ChevronUp, Sparkles, Sliders } from 'lucide-react';

interface FinishOption {
  id: string;
  name: string;
  color: string;
  roughness: number;
  metalness: number;
  specular: string;
  patternType: 'calacatta' | 'nero' | 'travertine' | 'sage' | 'terrazzo';
}

const FINISHES: FinishOption[] = [
  {
    id: 'calacatta',
    name: 'Calacatta Gold Porcelain',
    color: '#f8f8fa',
    roughness: 0.12,
    metalness: 0.05,
    specular: '#ffffff',
    patternType: 'calacatta',
  },
  {
    id: 'nero',
    name: 'Nero Marquina Polished',
    color: '#1a1a1c',
    roughness: 0.15,
    metalness: 0.08,
    specular: '#e0e0e0',
    patternType: 'nero',
  },
  {
    id: 'travertine',
    name: 'Honed Warm Travertine',
    color: '#d6c4a8',
    roughness: 0.42,
    metalness: 0.02,
    specular: '#eae0d2',
    patternType: 'travertine',
  },
  {
    id: 'sage',
    name: 'Glazed Sage Ceramic',
    color: '#6e8070',
    roughness: 0.18,
    metalness: 0.04,
    specular: '#b5c4b8',
    patternType: 'sage',
  },
  {
    id: 'terrazzo',
    name: 'Artisan Flake Terrazzo',
    color: '#e8e5de',
    roughness: 0.28,
    metalness: 0.03,
    specular: '#f2efe8',
    patternType: 'terrazzo',
  },
];

export const ThreeTileStudio: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeFinish, setActiveFinish] = useState<FinishOption>(FINISHES[0]);
  const [explodeLevel, setExplodeLevel] = useState<number>(0); // 0 = assembled, 1 = exploded
  const [groutWidth, setGroutWidth] = useState<'1.5mm' | '3.0mm' | '5.0mm'>('1.5mm');
  const [groutColor, setGroutColor] = useState<string>('#9e9e9e');
  const [isControlsExpanded, setIsControlsExpanded] = useState<boolean>(true);
  const [cameraView, setCameraView] = useState<'perspective' | 'top' | 'corner' | 'laser'>('perspective');

  const sceneRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    controls?: OrbitControls;
    tileMeshes?: THREE.Mesh[];
    adhesiveMesh?: THREE.Mesh;
    waterproofMesh?: THREE.Mesh;
    screedMesh?: THREE.Mesh;
    laserGroup?: THREE.Group;
    updateFinish?: (f: FinishOption) => void;
    setExplode?: (val: number) => void;
    setCameraPreset?: (view: string) => void;
  }>({});

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 560;

    // Detect software WebGL guard
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene & Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e131d);
    scene.fog = new THREE.FogExp2(0x0e131d, 0.045);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(4.2, 3.8, 4.6);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.replaceChildren(renderer.domElement);

    // Studio Environment (PMREM + RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.minDistance = 2.0;
    controls.maxDistance = 12.0;
    controls.target.set(0, 0.4, 0);

    // Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.2);
    keyLight.position.set(5, 7, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 18;
      const d = 4;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.bias = -0.0004;
    }
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0x90a4ae, 0x1f242d, 1.2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xb0bec5, 1.0);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // Helper: Procedural Texture Generator
    const createTileCanvasTexture = (type: FinishOption['patternType']) => {
      const cvs = document.createElement('canvas');
      cvs.width = 512;
      cvs.height = 512;
      const ctx = cvs.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(cvs);

      if (type === 'calacatta') {
        ctx.fillStyle = '#f9f9fb';
        ctx.fillRect(0, 0, 512, 512);
        // Subtle grey & gold marble veins
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(160, 165, 175, 0.35)';
        ctx.beginPath();
        ctx.moveTo(40, 20);
        ctx.bezierCurveTo(180, 120, 240, 320, 480, 480);
        ctx.stroke();

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(212, 163, 115, 0.45)'; // gold vein
        ctx.beginPath();
        ctx.moveTo(80, 10);
        ctx.bezierCurveTo(220, 180, 320, 260, 460, 440);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(180, 185, 195, 0.2)';
        ctx.beginPath();
        ctx.moveTo(380, 40);
        ctx.bezierCurveTo(310, 140, 180, 390, 80, 460);
        ctx.stroke();
      } else if (type === 'nero') {
        ctx.fillStyle = '#141416';
        ctx.fillRect(0, 0, 512, 512);
        // Fine white lightning veins
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
        ctx.beginPath();
        ctx.moveTo(60, 490);
        ctx.lineTo(190, 320);
        ctx.lineTo(260, 220);
        ctx.lineTo(440, 30);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(240, 240, 240, 0.3)';
        ctx.beginPath();
        ctx.moveTo(190, 320);
        ctx.lineTo(310, 360);
        ctx.lineTo(420, 290);
        ctx.stroke();
      } else if (type === 'travertine') {
        ctx.fillStyle = '#d8c8af';
        ctx.fillRect(0, 0, 512, 512);
        for (let i = 0; i < 512; i += 8) {
          ctx.fillStyle = i % 16 === 0 ? 'rgba(180, 155, 130, 0.15)' : 'rgba(245, 235, 220, 0.15)';
          ctx.fillRect(0, i, 512, 6);
        }
      } else if (type === 'sage') {
        ctx.fillStyle = '#738675';
        ctx.fillRect(0, 0, 512, 512);
        const grad = ctx.createLinearGradient(0, 0, 512, 512);
        grad.addColorStop(0, 'rgba(255,255,255,0.12)');
        grad.addColorStop(1, 'rgba(0,0,0,0.12)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);
      } else {
        // Terrazzo
        ctx.fillStyle = '#eae7e1';
        ctx.fillRect(0, 0, 512, 512);
        const colors = ['#2b2d30', '#c89d66', '#a48471', '#7d8a97'];
        for (let i = 0; i < 70; i++) {
          ctx.fillStyle = colors[i % colors.length];
          const x = (i * 47) % 512;
          const y = (i * 83) % 512;
          const s = 4 + (i % 8);
          ctx.beginPath();
          ctx.arc(x, y, s, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const tex = new THREE.CanvasTexture(cvs);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };

    // Concrete Slab (Layer 1 - Bottom)
    const slabGeo = new THREE.BoxGeometry(3.6, 0.25, 3.6);
    const slabMat = new THREE.MeshStandardMaterial({
      color: 0x474e5a,
      roughness: 0.9,
      metalness: 0.05,
    });
    const screedMesh = new THREE.Mesh(slabGeo, slabMat);
    screedMesh.position.set(0, -0.125, 0);
    screedMesh.receiveShadow = !isSoftwareGl;
    scene.add(screedMesh);

    // Waterproofing Membrane (Layer 2)
    const wpGeo = new THREE.BoxGeometry(3.56, 0.03, 3.56);
    const wpMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.7,
      metalness: 0.1,
    });
    const waterproofMesh = new THREE.Mesh(wpGeo, wpMat);
    waterproofMesh.position.set(0, 0.015, 0);
    scene.add(waterproofMesh);

    // Notched Adhesive Bed (Layer 3)
    const adhGeo = new THREE.BoxGeometry(3.52, 0.04, 3.52);
    const adhMat = new THREE.MeshStandardMaterial({
      color: 0x78716c,
      roughness: 0.85,
      metalness: 0.05,
    });
    const adhesiveMesh = new THREE.Mesh(adhGeo, adhMat);
    adhesiveMesh.position.set(0, 0.05, 0);
    scene.add(adhesiveMesh);

    // Tile Grid (Layer 4 - Top, 600x600 layout: 4x4 tiles)
    const tileGroup = new THREE.Group();
    const tileMeshes: THREE.Mesh[] = [];
    const tileSize = 0.82;
    const tileThickness = 0.03;
    const tileGeo = new THREE.BoxGeometry(tileSize, tileThickness, tileSize);

    const initialTexture = createTileCanvasTexture(FINISHES[0].patternType);
    const tileMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(FINISHES[0].color),
      roughness: FINISHES[0].roughness,
      metalness: FINISHES[0].metalness,
      map: initialTexture,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
    });

    const gap = 0.04;
    const startOffset = -1.5 * (tileSize + gap);

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const mesh = new THREE.Mesh(tileGeo, tileMat);
        mesh.position.set(
          startOffset + c * (tileSize + gap),
          0.085,
          startOffset + r * (tileSize + gap)
        );
        mesh.castShadow = !isSoftwareGl;
        mesh.receiveShadow = !isSoftwareGl;
        tileMeshes.push(mesh);
        tileGroup.add(mesh);
      }
    }
    scene.add(tileGroup);

    // 45° Mitred Edge Showcase Block (Right Edge)
    const mitreGroup = new THREE.Group();
    mitreGroup.position.set(1.4, 0.15, 1.4);
    const stepTop = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.03, 0.7),
      tileMat
    );
    stepTop.castShadow = !isSoftwareGl;
    const stepFace = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.28, 0.03),
      tileMat
    );
    stepFace.position.set(0, -0.125, 0.335);
    mitreGroup.add(stepTop);
    mitreGroup.add(stepFace);
    scene.add(mitreGroup);

    // Professional Laser Level Tool on Tripod
    const laserGroup = new THREE.Group();
    laserGroup.position.set(-1.45, 0, -1.45);

    // Tripod legs
    const legGeo = new THREE.CylinderGeometry(0.012, 0.015, 0.75, 8);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });
    const leg1 = new THREE.Mesh(legGeo, legMat);
    leg1.position.set(0.12, 0.36, 0.12);
    leg1.rotation.set(0.25, 0, -0.25);
    const leg2 = new THREE.Mesh(legGeo, legMat);
    leg2.position.set(-0.16, 0.36, 0.06);
    leg2.rotation.set(0.2, 0, 0.3);
    const leg3 = new THREE.Mesh(legGeo, legMat);
    leg3.position.set(0.04, 0.36, -0.16);
    leg3.rotation.set(-0.3, 0, 0.1);
    laserGroup.add(leg1, leg2, leg3);

    // Laser Box
    const boxGeo = new THREE.BoxGeometry(0.16, 0.18, 0.16);
    const boxMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3, metalness: 0.5 });
    const laserBox = new THREE.Mesh(boxGeo, boxMat);
    laserBox.position.set(0, 0.74, 0);
    laserGroup.add(laserBox);

    // Laser Beam (Cylindrical procedural line across the floor)
    const beamGeo = new THREE.CylinderGeometry(0.003, 0.003, 4.5, 6);
    const beamMat = new THREE.MeshBasicMaterial({ color: 0xff1744 });
    const beamX = new THREE.Mesh(beamGeo, beamMat);
    beamX.position.set(1.45, 0.12, 1.45);
    beamX.rotation.z = Math.PI / 2;
    const beamZ = new THREE.Mesh(beamGeo, beamMat);
    beamZ.position.set(1.45, 0.12, 1.45);
    beamZ.rotation.x = Math.PI / 2;
    laserGroup.add(beamX, beamZ);
    scene.add(laserGroup);

    // Contact shadow floor
    const groundGeo = new THREE.PlaneGeometry(16, 16);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.45 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.251;
    ground.receiveShadow = !isSoftwareGl;
    scene.add(ground);

    // Store references
    sceneRef.current = {
      renderer,
      scene,
      camera,
      controls,
      tileMeshes,
      adhesiveMesh,
      waterproofMesh,
      screedMesh,
      laserGroup,
      updateFinish: (finish: FinishOption) => {
        const tex = createTileCanvasTexture(finish.patternType);
        tileMat.color.set(finish.color);
        tileMat.roughness = finish.roughness;
        tileMat.metalness = finish.metalness;
        tileMat.map = tex;
        tileMat.needsUpdate = true;
      },
      setExplode: (val: number) => {
        // val 0 to 1
        const maxOffset = 0.5;
        waterproofMesh.position.y = 0.015 + val * (maxOffset * 0.35);
        adhesiveMesh.position.y = 0.05 + val * (maxOffset * 0.7);
        tileGroup.position.y = val * maxOffset * 1.35;
        mitreGroup.position.y = 0.15 + val * maxOffset * 1.35;
      },
      setCameraPreset: (view: string) => {
        if (!controls || !camera) return;
        if (view === 'perspective') {
          camera.position.set(4.2, 3.8, 4.6);
          controls.target.set(0, 0.4, 0);
        } else if (view === 'top') {
          camera.position.set(0, 6.2, 0.01);
          controls.target.set(0, 0, 0);
        } else if (view === 'corner') {
          camera.position.set(2.4, 1.5, 2.5);
          controls.target.set(1.2, 0.2, 1.2);
        } else if (view === 'laser') {
          camera.position.set(-1.2, 1.2, -1.2);
          controls.target.set(0.6, 0.1, 0.6);
        }
        controls.update();
      },
    };

    // Render loop
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      tileGeo.dispose();
      slabGeo.dispose();
      wpGeo.dispose();
      adhGeo.dispose();
      tileMat.dispose();
      slabMat.dispose();
      wpMat.dispose();
      adhMat.dispose();
    };
  }, []);

  const handleFinishChange = (finish: FinishOption) => {
    setActiveFinish(finish);
    sceneRef.current.updateFinish?.(finish);
  };

  const handleExplodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setExplodeLevel(val);
    sceneRef.current.setExplode?.(val);
  };

  const handleCameraChange = (view: 'perspective' | 'top' | 'corner' | 'laser') => {
    setCameraView(view);
    sceneRef.current.setCameraPreset?.(view);
  };

  return (
    <div className="relative w-full h-[620px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl">
      {/* 3D WebGL Canvas Viewport (100% Unobstructed Center) */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Floating Badge Bar (Single Clean Title & Specs) */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3 bg-neutral-900/85 backdrop-blur-md px-4 py-2.5 rounded-xl border border-neutral-700/60 shadow-lg text-xs">
        <span className="font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive 3D Studio
        </span>
        <span className="text-neutral-500">·</span>
        <span className="text-neutral-300">PBR Studio Surface Engine</span>
        <span className="text-neutral-500">·</span>
        <span className="text-neutral-400 font-mono-numbers">Drag to Orbit · Scroll to Zoom</span>
      </div>

      {/* Camera View Switcher (Top Right, Quiet) */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-neutral-900/85 backdrop-blur-md p-1 rounded-xl border border-neutral-700/60 text-xs">
        <button
          onClick={() => handleCameraChange('perspective')}
          className={`px-2.5 py-1.5 rounded-lg transition-colors ${
            cameraView === 'perspective' ? 'bg-amber-600 text-white font-medium shadow-sm' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => handleCameraChange('corner')}
          className={`px-2.5 py-1.5 rounded-lg transition-colors ${
            cameraView === 'corner' ? 'bg-amber-600 text-white font-medium shadow-sm' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          45° Mitre Edge
        </button>
        <button
          onClick={() => handleCameraChange('top')}
          className={`px-2.5 py-1.5 rounded-lg transition-colors ${
            cameraView === 'top' ? 'bg-amber-600 text-white font-medium shadow-sm' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Top Plan
        </button>
        <button
          onClick={() => handleCameraChange('laser')}
          className={`px-2.5 py-1.5 rounded-lg transition-colors ${
            cameraView === 'laser' ? 'bg-amber-600 text-white font-medium shadow-sm' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Laser Align
        </button>
      </div>

      {/* Zero-Occlusion Collapsible Bottom Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-3xl">
        {/* Toggle Expand/Collapse Drawer Button */}
        <div className="flex justify-center -mb-2">
          <button
            onClick={() => setIsControlsExpanded(!isControlsExpanded)}
            className="flex items-center gap-1.5 px-3 py-1 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 text-xs font-medium rounded-t-lg border-t border-x border-neutral-700 shadow-md transition-colors"
          >
            {isControlsExpanded ? (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Collapse 3D Controls</span>
              </>
            ) : (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Configure Tile Finishes & Layers</span>
              </>
            )}
          </button>
        </div>

        {isControlsExpanded && (
          <div className="bg-neutral-900/95 backdrop-blur-md p-4 rounded-2xl border border-neutral-700/80 shadow-2xl space-y-4">
            {/* Tile Finishes Swatches */}
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                <span className="font-medium text-neutral-200">Select Porcelain / Ceramic Finish:</span>
                <span className="text-amber-400 font-medium">{activeFinish.name}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {FINISHES.map((finish) => (
                  <button
                    key={finish.id}
                    onClick={() => handleFinishChange(finish)}
                    className={`flex items-center gap-2 p-2 rounded-xl text-left border text-xs transition-all ${
                      activeFinish.id === finish.id
                        ? 'border-amber-500 bg-amber-500/10 text-white shadow-sm'
                        : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: finish.color }}
                    />
                    <span className="truncate font-medium">{finish.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Row: Layer Explode Slider & Technical Specs */}
            <div className="pt-2 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              {/* Explode Substrate Layers Slider */}
              <div className="w-full sm:w-1/2 flex items-center gap-3">
                <Layers className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-neutral-300 font-medium whitespace-nowrap">Explode Substrate:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explodeLevel}
                  onChange={handleExplodeChange}
                  className="w-full accent-amber-500 bg-neutral-800 h-1.5 rounded-lg cursor-pointer"
                />
                <span className="font-mono-numbers text-neutral-400 w-10 text-right">
                  {Math.round(explodeLevel * 100)}%
                </span>
              </div>

              {/* Technical Layer Legend */}
              <div className="flex items-center gap-3 text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
                  Concrete Screed
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-800 inline-block" />
                  Tanking
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-stone-500 inline-block" />
                  C2TE Mortar
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                  Porcelain Slab
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
