import init, { detect_pitch } from "../wasm/pitch_wasm";

// Convert Hz → Note
export function hzToNoteName(hz) {
  if (hz < 1) return "—";

  const A4 = 440;
  const noteNames = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
  const semitoneOffset = Math.round(12 * Math.log2(hz / A4));
  const noteIndex = (semitoneOffset + 9 + 12 * 10) % 12; // shift to C index
  const octave = Math.floor((semitoneOffset + 9) / 12) + 4;

  return `${noteNames[noteIndex]}${octave}`;
}

// Start pitch detection
export async function startPitchDetection(setNote) {
  await init();

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const source = audioCtx.createMediaStreamSource(stream);
  const processor = audioCtx.createScriptProcessor(2048, 1, 1);

  source.connect(processor);
  processor.connect(audioCtx.destination);

  processor.onaudioprocess = (e) => {
    const input = e.inputBuffer.getChannelData(0);
    const sampleRate = audioCtx.sampleRate;

    const pitch = detect_pitch(input, sampleRate);
    const note = hzToNoteName(pitch);

    setNote(note);
  };
}
