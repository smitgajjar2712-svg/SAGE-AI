/// <reference types="vite/client" />

type CustorSpeechRecognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  start: () => void;
  stop: () => void;
};

interface Window {
  custor?: {
    minimize: () => void;
    close: () => void;
    onShow: (callback: () => void) => void;
    onMini: (callback: () => void) => void;
    onMinimize: (callback: () => void) => void;
  };
  SpeechRecognition?: new () => CustorSpeechRecognition;
  webkitSpeechRecognition?: new () => CustorSpeechRecognition;
}
