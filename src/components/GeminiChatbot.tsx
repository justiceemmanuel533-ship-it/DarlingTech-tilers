import React, { useState, useRef, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { Sparkles, MessageSquare, Send, X, Mic, MicOff, Volume2, ArrowRight, Bot, User, Radio, RefreshCw, Copy, Check } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export const GeminiChatbot: React.FC = () => {
  const { isAiChatOpen, setIsAiChatOpen, activeAiPrompt, setActiveAiPrompt, siteData } = useSite();
  const primaryPhone = siteData.phones[0];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hello! I am the Master Tiling AI Consultant for **Darlingtech Tilers** (founded by Darlington Kanyandura / Kayz). 

Ask me anything about:
- Porcelain slab sizing & layout patterns (1200×600, 800×800, herringbone)
- Accurate adhesive bags & grout estimation for your square meterage in Zimbabwe
- Waterproofing & falls for luxury curbless walk-in showers
- Why our 45-degree hand-mitred edges beat cheap plastic trims
- Booking Darlington for a free on-site measurement anywhere in Harare or Zimbabwe!`,
      timestamp: 'Just now',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Live Voice API State
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [liveStatus, setLiveStatus] = useState<string>('idle');
  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle auto-prompt when triggered from other parts of the site
  useEffect(() => {
    if (activeAiPrompt && isAiChatOpen) {
      handleSend(activeAiPrompt);
      setActiveAiPrompt('');
    }
  }, [activeAiPrompt, isAiChatOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6).map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await response.json();
      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply || 'Thank you for your question. You can also contact Darlington directly on WhatsApp (+263771624931).',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error('Chatbot error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'model',
          text: 'I could not connect to the consultation server right now. Please message Darlington directly on WhatsApp (+263771624931) for immediate help!',
          timestamp: 'Now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Convert Float32Array PCM to 16-bit PCM base64
  const pcmToBase64 = (float32Array: Float32Array): string => {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Live API Start / Stop Voice Mode
  const toggleLiveVoiceMode = async () => {
    if (isLiveActive) {
      // Stop Live Mode
      try {
        wsRef.current?.close();
        mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
        audioContextRef.current?.close();
      } catch (e) {
        console.error('Error stopping live audio:', e);
      }
      setIsLiveActive(false);
      setLiveStatus('idle');
      return;
    }

    // Start Live Mode
    try {
      setLiveStatus('connecting');
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      const inputAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000,
      });
      const outputAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 24000,
      });
      audioContextRef.current = outputAudioCtx;

      ws.onopen = async () => {
        setLiveStatus('listening');
        setIsLiveActive(true);

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
        const source = inputAudioCtx.createMediaStreamSource(stream);
        const processor = inputAudioCtx.createScriptProcessor(4096, 1, 1);
        scriptProcessorRef.current = processor;

        source.connect(processor);
        processor.connect(inputAudioCtx.destination);

        processor.onaudioprocess = (e) => {
          if (ws.readyState === WebSocket.OPEN) {
            const pcmData = e.inputBuffer.getChannelData(0);
            const base64 = pcmToBase64(pcmData);
            ws.send(JSON.stringify({ audio: base64 }));
          }
        };
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.audio) {
            setLiveStatus('speaking');
            playAudioChunk(outputAudioCtx, msg.audio);
          }
        } catch (e) {
          console.error('Live onmessage parse error:', e);
        }
      };

      ws.onerror = (e) => {
        console.error('Live WS error:', e);
        setLiveStatus('error');
      };

      ws.onclose = () => {
        setIsLiveActive(false);
        setLiveStatus('idle');
      };
    } catch (e: any) {
      console.error('Failed to start Live API voice:', e);
      setLiveStatus('error');
      alert('Microphone access is required for live voice consultation. You can also type your questions in the chat.');
    }
  };

  // Playback 24kHz raw PCM chunk
  let nextStartTime = 0;
  const playAudioChunk = (audioCtx: AudioContext, base64Audio: string) => {
    try {
      const binaryString = atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const int16Array = new Int16Array(bytes.buffer);
      const float32Array = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768.0;
      }

      const audioBuffer = audioCtx.createBuffer(1, float32Array.length, 24000);
      audioBuffer.copyToChannel(float32Array, 0);

      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);

      const currentTime = audioCtx.currentTime;
      if (nextStartTime < currentTime) {
        nextStartTime = currentTime;
      }
      source.start(nextStartTime);
      nextStartTime += audioBuffer.duration;
    } catch (e) {
      console.error('Error playing live audio chunk:', e);
    }
  };

  const lastModelMessage = [...messages].reverse().find((m) => m.role === 'model')?.text || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(lastModelMessage);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const suggestedQuestions = [
    'Estimate 60m² porcelain living room in Harare',
    'Waterproofing details for curbless shower',
    'Why 45° mitred edges instead of aluminum trims?',
    'What adhesive works best with 1200x600 slabs in Zim?',
  ];

  return (
    <>
      {/* Floating Action Launcher (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsAiChatOpen(!isAiChatOpen)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs shadow-2xl shadow-amber-500/30 border border-amber-300 transition-all hover:scale-105 group"
          aria-label="Open AI Tiler Consultation"
        >
          <Sparkles className="w-4 h-4 fill-neutral-950 group-hover:rotate-12 transition-transform" />
          <span>Ask AI Tiler 💠</span>
        </button>
      </div>

      {/* Main Chat Drawer / Modal */}
      {isAiChatOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-neutral-950 border-l border-neutral-800 shadow-2xl flex flex-col animate-slide-left">
          {/* Header */}
          <div className="p-4 border-b border-neutral-800 bg-neutral-900 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Darlingtech AI Consultant</span>
                  <span className="text-[10px] text-amber-400 font-normal">Gemini 3.8</span>
                </h3>
                <span className="text-[11px] text-neutral-400">
                  Tiling Specs & Zimbabwe Project Advisory
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Live Voice API Button */}
              <button
                onClick={toggleLiveVoiceMode}
                className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                  isLiveActive
                    ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse'
                    : 'bg-neutral-800 text-neutral-300 hover:text-white border-neutral-700'
                }`}
                title="Toggle Gemini Live Real-Time Voice Consultation"
              >
                {isLiveActive ? (
                  <>
                    <Mic className="w-3.5 h-3.5" />
                    <span>Live Voice</span>
                  </>
                ) : (
                  <>
                    <Radio className="w-3.5 h-3.5 text-amber-400" />
                    <span>Live Voice</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsAiChatOpen(false)}
                className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Live Voice Active Notification Bar */}
          {isLiveActive && (
            <div className="p-3 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold text-white">Gemini Live Voice Connected</span>
                <span className="text-neutral-500">·</span>
                <span className="text-amber-400 capitalize">{liveStatus}</span>
              </div>
              <button
                onClick={toggleLiveVoiceMode}
                className="text-xs text-red-400 hover:text-red-300 font-medium"
              >
                End Call
              </button>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'model' && (
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 space-y-1.5 ${
                    m.role === 'user'
                      ? 'bg-amber-500 text-neutral-950 font-medium rounded-tr-none'
                      : 'bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-line leading-relaxed">{m.text}</div>
                  <div
                    className={`text-[10px] text-right ${
                      m.role === 'user' ? 'text-neutral-800' : 'text-neutral-500'
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>

                {m.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300 shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-neutral-400 text-xs py-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>Crafting master tiler recommendations...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Queries */}
          <div className="p-3 bg-neutral-900/60 border-t border-neutral-800/80">
            <div className="text-[11px] text-neutral-400 mb-1.5 font-medium">
              Suggested Consultations:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-[11px] border border-neutral-800 hover:border-amber-500/40 transition-colors text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Action: Send AI Recommendation to WhatsApp */}
          {lastModelMessage && (
            <div className="px-4 py-2 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-xs">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-neutral-400 hover:text-white"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied' : 'Copy Response'}</span>
              </button>

              <a
                href={`https://wa.me/${primaryPhone.cleanNumber}?text=${encodeURIComponent(
                  `Hi Darlington! I consulted the Darlingtech AI Assistant regarding:\n\n${lastModelMessage.slice(0, 400)}...\n\nCould we arrange a site measurement?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Send to Kayz on WhatsApp</span>
              </a>
            </div>
          )}

          {/* Input Box */}
          <div className="p-4 bg-neutral-900 border-t border-neutral-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about tiles, adhesive bags, shower falls..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs placeholder:text-neutral-500 focus:border-amber-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
