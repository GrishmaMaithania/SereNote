import React, { useState } from "react";
import { startPitchDetection } from "../hooks/usePitchDetection";
import { noteToFrequency } from "../utils/noteToFrequency";

export default function Voice() {
  const [note, setNote] = useState("—");
  const [targetNote, setTargetNote] = useState("");
  const [detectedNote, setDetectedNote] = useState("—");
  const [accuracy, setAccuracy] = useState(null);
  const [playNote, setPlayNote] = useState("");

 
  let audioCtx = null;
  let oscillator = null;
  let gain = null;

 const handlePlayNote = (note) => {
  const freq = noteToFrequency(note);
  if (!freq) {
    alert("Invalid note format! Try something like A4, C#5");
    return;
  }

  // Create AudioContext if not already
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  // Stop any existing oscillator before starting a new one
  if (oscillator) {
    handleStopNote();
  }

  oscillator = audioCtx.createOscillator();
  gain = audioCtx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

  // Smooth fade-in (avoid clicks)
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);

  oscillator.connect(gain);
  gain.connect(audioCtx.destination);

  oscillator.start();
};

const handleStopNote = () => {
  if (oscillator && gain) {
    // Smooth fade-out
    gain.gain.cancelScheduledValues(audioCtx.currentTime);
    gain.gain.setValueAtTime(gain.gain.value, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);

    oscillator.stop(audioCtx.currentTime + 0.1);

    // Disconnect everything
    oscillator.disconnect();
    gain.disconnect();

    // Reset references
    oscillator = null;
    gain = null;
  }
};


  // ---------- Helpers ----------
  function normalizeNote(note) {
    if (!note) return "";
    return note.replace("♯", "#");
  }

  function noteToMidi(note) {
    const notes = [
      "C","C#","D","D#","E","F","F#","G","G#","A","A#","B"
    ];
    const match = note.match(/^([A-G](?:#|♯)?)(\d)$/);
    if (!match) return -1;
    const [_, n, octave] = match;
    return notes.indexOf(normalizeNote(n)) + 12 * (parseInt(octave) + 1);
  }

  function calculateDotX(detected, target) {
    if (!detected || !target) return 50;

    const midiDetected = noteToMidi(normalizeNote(detected));
    const midiTarget = noteToMidi(normalizeNote(target));

    if (midiDetected < 0 || midiTarget < 0) return 50;

    const diff = midiDetected - midiTarget;
    const maxOffset = 3;
    let percent = 50 + (diff / maxOffset) * 50;
    return Math.min(100, Math.max(0, percent));
  }

  function calculateAccuracy(detected, target) {
    const midiDetected = noteToMidi(normalizeNote(detected));
    const midiTarget = noteToMidi(normalizeNote(target));
    if (midiDetected < 0 || midiTarget < 0) return 0;

    const diff = Math.abs(midiDetected - midiTarget);
    return Math.max(0, 100 - diff * 20);
  }

  // ---------- Sing Along ----------
  const startSingAlong = () => {
    startPitchDetection((note) => {
      setDetectedNote(note);
      if (targetNote) {
        setAccuracy(calculateAccuracy(note, targetNote));
      }
    });
  };

  // ---------- Free Sing ----------
  const handleFreeSingStart = () => {
    startPitchDetection(setNote);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 px-6 py-10 md:px-20 text-gray-800">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-purple-700">
        🎤 Vocal Practice
      </h1>
      <p className="text-sm text-gray-600 mb-8 max-w-xl">
        Improve your pitch accuracy and vocal control with real-time feedback.
      </p>

      {/* Headphone Message */}
      <div className="bg-purple-50 border border-purple-200 text-purple-700 text-sm rounded-xl px-4 py-3 mb-8 shadow-sm">
        🎧 For the best experience, please use headphones.  
        This prevents your microphone from picking up the notes played by the app.
      </div>

      {/* Sing Along */}
      <div className="bg-white/70 backdrop-blur-md shadow-md rounded-2xl p-6 mb-10 border border-purple-100">
        <h2 className="text-xl font-semibold mb-2 text-purple-700">Sing Along</h2>
        <input
          type="text"
          value={targetNote}
          onChange={(e) => setTargetNote(e.target.value)}
          placeholder="Type a note (e.g. A4)"
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={startSingAlong}
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
        >
          Start Singing
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-purple-700">
            🎵 Detected Note: {detectedNote}
          </p>
          {accuracy !== null && (
            <p className="text-sm text-green-600 font-semibold">
              🎯 Accuracy: {accuracy.toFixed(1)}%
            </p>
          )}
        </div>

        {/* Pitch Visualizer */}
        <div className="mt-10">
          <p className="text-lg font-semibold text-purple-700 mb-2">
            🎯 Live Pitch Visualizer
          </p>
          <div className="relative h-64 border-2 border-purple-200 rounded-lg overflow-hidden bg-purple-50">
            <div className="absolute bottom-1/2 left-0 w-full h-0.5 bg-gray-400" />
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-purple-600" />
            <div
              className="absolute w-4 h-4 bg-green-500 rounded-full shadow-md transition-all duration-100"
              style={{
                left: `${calculateDotX(detectedNote, targetNote)}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center italic">
            The green dot shows how far your pitch is from the target note.
          </p>
        </div>
      </div>

      {/* Free Sing */}
      <div className="bg-white/70 backdrop-blur-md shadow-md rounded-2xl p-6 mb-10 border border-green-100">
        <h2 className="text-xl font-semibold mb-2 text-green-700">Free Sing</h2>
        <button
          onClick={handleFreeSingStart}
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
        >
          Start Free Singing
        </button>
        <div className="text-center mt-6">
          <p className="text-lg font-semibold text-green-700">🎵 Detected Note:</p>
          <p className="text-4xl font-bold text-purple-600">{note}</p>
        </div>
      </div>

      {/* Note Playback */}
      <div className="bg-white/70 backdrop-blur-md shadow-md rounded-2xl p-6 border border-yellow-100">
        <h2 className="text-xl font-semibold mb-2 text-yellow-700">Note Playback</h2>

        {/* Buttons for C4–C5 octave */}
        <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 mb-4">
          {["C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4","C5"].map((n) => (
            <button
              key={n}
              onClick={() => handlePlayNote(n)}
              className="bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-purple-700 text-sm"
            >
              {n}
            </button>
          ))}
        </div>

        {/* Custom input */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter a note (e.g. F#3, A5)"
            onChange={(e) => setPlayNote(e.target.value)}
            value={playNote}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full sm:w-auto"
          />
          <button
            onClick={() => handlePlayNote(playNote)}
            className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700"
          >
            Play Custom Note
          </button>
        </div>

        {/* Stop Button */}
        <button
          onClick={handleStopNote}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
        >
          Stop
        </button>
      </div>
    </div>
  );
}
