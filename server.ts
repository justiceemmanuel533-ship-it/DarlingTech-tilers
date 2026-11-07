import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Shared Server-side Gemini client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // REST API Route for Gemini Consultation & Estimator
  app.post('/api/ai/consult', async (req, res) => {
    try {
      const { message, projectDetails, history } = req.body;

      const systemPrompt = `You are the master craftsman AI Consultant for "Darlingtech Tilers", founded by Darlington Kanyandura (Kayz) in Zimbabwe.
Company Contacts & Channels:
- Phone / WhatsApp 1: +263771624931 (Econet, Primary)
- Phone / WhatsApp 2: 0789423434 (+263789423434)
- Phone / WhatsApp 3: 0719418701 (+263719418701, NetOne)
- Email: darlingtonkanyandura@gmail.com
- Instagram: @Kayz_real_zw
- Company Facebook: @Darlingtech tilers
- Owner Facebook: Darlington Kanyandura
- Official WhatsApp Channel: Darlingtech Tilers Official Updates

Your Specialty:
- Precision porcelain, ceramic, marble, travertine, granite and slate installation
- Flawless 45° mitred corner joints (seamless external corners, no plastic bead unless requested)
- Zero hollow tile guarantee (100% full bed contact & back-buttering)
- Curbless walk-in showers with linear drain falls and tanking/waterproofing
- Large format slabs (1200x600, 800x800, 1600x800)
- Herringbone, subway, chevron, and modular French pattern floor/wall tiling
- Local Zimbabwe expertise: screeding prep on Zimbabwean building foundations, red clay soil settlement mitigation, high-performance C2TE polymer adhesives (TAL, Weber, local brands).

Respond in a warm, expert, practical tone with clear formatting:
1. Recommended tile material, finish (matt, polished porcelain, textured anti-slip for wet/outdoor areas), and layout pattern.
2. Preparation & technical watch-outs (screed dampness, waterproofing, expansion joints).
3. Exact estimated quantities for adhesive (20kg bags based on 4-5m² per bag for 6mm notch or 3m² for 10-12mm notch on large format), grout (approx 0.3-0.5kg/m² depending on tile size), and 10-15% wastage allowance.
4. Estimated timeline and guidance on booking Darlingtech Tilers for a free on-site measurement anywhere in Harare, Bulawayo, or Zimbabwe-wide.
Keep answers structured and ready to copy to WhatsApp.`;

      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const item of history) {
          if (item.role && item.text) {
            contents.push({
              role: item.role === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }],
            });
          }
        }
      }

      const userText = projectDetails
        ? `Project Specs:
- Room Type: ${projectDetails.room || 'General Area'}
- Dimensions: ${projectDetails.dimensions || 'Custom'} (${projectDetails.areaM2 || 'Not specified'} m²)
- Preferred Tile: ${projectDetails.tileType || 'Porcelain'}
- Pattern: ${projectDetails.pattern || 'Straight Stack'}
- Location: ${projectDetails.location || 'Zimbabwe'}

User Inquiry: ${message}`
        : message;

      contents.push({
        role: 'user',
        parts: [{ text: userText }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: systemPrompt,
        },
      });

      res.json({ reply: response.text || 'Thank you for consulting Darlingtech Tilers. Please contact Darlington Kanyandura (Kayz) on WhatsApp (+263771624931) for immediate booking.' });
    } catch (error: any) {
      console.error('Gemini Consultant API error:', error);
      res.status(500).json({
        error: error.message || 'Internal server error while contacting AI consultant',
      });
    }
  });

  // Quick Tile Layout Generator
  app.post('/api/ai/quick-quote', async (req, res) => {
    try {
      const { areaM2, roomType, tileStyle, location } = req.body;
      const prompt = `Calculate a fast professional tile installation estimate for Darlingtech Tilers in Zimbabwe (Owner: Darlington Kanyandura / Kayz).
Area: ${areaM2} m²
Room: ${roomType}
Tile style: ${tileStyle}
Location in Zimbabwe: ${location || 'Harare'}

Return a concise structured JSON object with keys:
- tileBoxesNeeded (assuming ~1.44m² per box, plus 12% wastage)
- adhesiveBags20kg (assuming ~3.5m² per 20kg bag for large format or 4.5m² for standard)
- groutKgNeeded (approx 0.35kg per m²)
- estimatedLaborDays (number of working days)
- estimatedLaborRangeUsd (e.g. "$180 - $240")
- expertTips (array of 3 short bullet tips)
- whatsappSummary (a 3-sentence clean text ready to send to Kayz at +263771624931)`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (error: any) {
      console.error('Quick Quote Error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate quick quote' });
    }
  });

  // WebSocket Server for Gemini Live API (Real-time voice & audio)
  const wss = new WebSocketServer({ server, path: '/api/live' });

  wss.on('connection', async (clientWs: WebSocket) => {
    console.log('[Gemini Live] Client connected for real-time voice consultation');
    let session: any = null;

    try {
      session = await ai.live.connect({
        model: 'gemini-3.8-live',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: `You are the master voice consultant for "Darlingtech Tilers", Zimbabwe's premier tiling company owned by Darlington Kanyandura (Kayz).
Contacts: +263771624931, 0789423434, 0719418701, Email: darlingtonkanyandura@gmail.com.
You speak clearly, warmly, and knowledgeably about floor tiling, 45-degree mitred edges, adhesives (TAL, C2TE), waterproofing shower wetrooms, and project estimates in Zimbabwe. Keep spoken answers concise (1-3 sentences) suitable for interactive voice.`,
        },
        callbacks: {
          onmessage: (message: LiveServerMessage) => {
            for (const part of message.serverContent?.modelTurn?.parts ?? []) {
              if (part.inlineData?.data) {
                clientWs.send(JSON.stringify({ audio: part.inlineData.data }));
              }
            }
            if (message.serverContent?.interrupted) {
              clientWs.send(JSON.stringify({ interrupted: true }));
            }
          },
          onerror: (err: any) => {
            console.error('[Gemini Live] Session error:', err);
            clientWs.send(JSON.stringify({ error: err?.message || 'Live session error' }));
          },
          onclose: () => {
            console.log('[Gemini Live] Session closed');
            clientWs.send(JSON.stringify({ closed: true }));
          },
        },
      });

      clientWs.on('message', (data: Buffer | string) => {
        try {
          const parsed = JSON.parse(data.toString());
          if (parsed.audio) {
            session.sendRealtimeInput({
              audio: { data: parsed.audio, mimeType: 'audio/pcm;rate=16000' },
            });
          } else if (parsed.text) {
            session.sendRealtimeInput({
              text: parsed.text,
            });
          }
        } catch (e) {
          console.error('[Gemini Live] Client message parse error:', e);
        }
      });

      clientWs.on('close', () => {
        console.log('[Gemini Live] Client disconnected');
        try {
          session?.close?.();
        } catch {}
      });
    } catch (err: any) {
      console.error('[Gemini Live] Initialization error:', err);
      clientWs.send(JSON.stringify({ error: err?.message || 'Failed to initialize Gemini Live session' }));
    }
  });

  // Mount Vite middleware in development or static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Darlingtech Server & Gemini Live running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
