import React from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import { Captions, Copy, Eraser, Mic, MicOff, Minus, Moon, Settings, Sun, X } from 'lucide-react';
import { useAssistantStore } from './store';
import './styles.css';

function useSpeech() {
  const micOn = useAssistantStore((s) => s.micOn);
  const setTranscript = useAssistantStore((s) => s.setTranscript);

  React.useEffect(() => {
    const SpeechApi = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechApi || !micOn) return;
    const recognition = new SpeechApi();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const text = Array.from(event.results).map((result) => result[0]?.transcript ?? '').join(' ');
      setTranscript(text.trim());
    };
    recognition.start();
    return () => recognition.stop();
  }, [micOn, setTranscript]);
}

function Waveform() {
  return <div className="waveform" aria-hidden>{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ '--i': i } as React.CSSProperties} />)}</div>;
}

function PillButton({ active, onClick, children, label }: { active?: boolean; onClick: () => void; children: React.ReactNode; label: string }) {
  return <motion.button aria-label={label} className={`pill-button ${active ? 'active' : ''}`} onClick={onClick} whileTap={{ scale: 0.92 }} whileHover={{ scale: 1.05 }}>{children}</motion.button>;
}

function CaptionOverlay() {
  const { captionsOn, transcript, captionOpacity, captionScale, setCaptionOpacity, setCaptionScale } = useAssistantStore();
  return <AnimatePresence>{captionsOn && <motion.aside className="caption-overlay" drag initial={{ opacity: 0, y: 30, scale: .94 }} animate={{ opacity: captionOpacity, y: 0, scale: captionScale }} exit={{ opacity: 0, y: 20 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }}>
    <span>LIVE CAPTION</span><p>{transcript || 'Captions are ready for your voice.'}</p>
    <div className="caption-controls"><label>Opacity <input type="range" min=".35" max="1" step=".01" value={captionOpacity} onChange={(e) => setCaptionOpacity(Number(e.target.value))} /></label><label>Size <input type="range" min=".82" max="1.3" step=".01" value={captionScale} onChange={(e) => setCaptionScale(Number(e.target.value))} /></label></div>
  </motion.aside>}</AnimatePresence>;
}

function Assistant() {
  useSpeech();
  const { theme, micOn, captionsOn, transcript, setTheme, toggleMic, toggleCaptions, setTranscript, clearTranscript } = useAssistantStore();
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => { document.documentElement.dataset.theme = theme; window.custor?.onShow(() => setVisible(true)); window.custor?.onMini(() => setVisible(false)); }, [theme]);
  const isMini = window.innerWidth < 520;
  return <main className="stage">
    <div className="aurora" />
    <CaptionOverlay />
    <AnimatePresence mode="wait">
      {(visible || !isMini) && <motion.section className="assistant-shell" initial={{ opacity: 0, y: 80, scale: .86, filter: 'blur(20px)' }} animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, y: 20, scale: .9 }} transition={{ type: 'spring', stiffness: 220, damping: 24 }}>
        <div className="reflection" />
        <section className="left-cluster"><PillButton label="Toggle microphone" active={micOn} onClick={toggleMic}>{micOn ? <Mic /> : <MicOff />}</PillButton><Waveform /></section>
        <section className="transcript-panel"><div className="status"><b>CUSTOR STT</b><span>{micOn ? 'Listening' : 'Idle'} · Ctrl+Alt+S</span></div><textarea value={transcript} onChange={(e) => setTranscript(e.target.value)} placeholder="Speak or type..." /><div className="actions"><button onClick={() => navigator.clipboard?.writeText(transcript)}> <Copy size={15}/> Copy</button><button onClick={clearTranscript}><Eraser size={15}/> Clear</button></div></section>
        <section className="right-cluster"><PillButton label="Toggle captions" active={captionsOn} onClick={toggleCaptions}><Captions /></PillButton><PillButton label="Settings" onClick={() => undefined}><Settings /></PillButton><PillButton label="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun /> : <Moon />}</PillButton><PillButton label="Minimize" onClick={() => window.custor?.minimize()}><Minus /></PillButton><PillButton label="Close" onClick={() => window.custor?.close()}><X /></PillButton></section>
      </motion.section>}
    </AnimatePresence>
  </main>;
}

createRoot(document.getElementById('root')!).render(<Assistant />);
