# CUSTOR STT

Premium liquid-glass desktop Speech-to-Text assistant built with Electron, React, TypeScript, Tailwind CSS, Framer Motion, and Zustand.

## Highlights

- Floating 999px capsule assistant bar with frosted glass, reflections, edge lighting, and soft depth.
- `Ctrl + Alt + S` global shortcut toggles between the full assistant and compact popup mode.
- Browser speech recognition powered live transcription with smooth manual text editing.
- Draggable live caption overlay with opacity and size controls.
- Dark/light theme toggle with animated transitions.
- Windows `.exe` packaging through Electron Builder.

## Commands

```bash
npm install
npm run dev
npm run build
npm run dist
```

## Secrets

Do not commit API keys. If cloud STT/AI providers are added later, place keys in a local `.env` file and load them through a secure Electron main-process bridge.
