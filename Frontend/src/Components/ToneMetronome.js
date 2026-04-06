// src/components/ToneMetronome.jsx
import React, { useState, useRef } from "react";
import * as Tone from "tone";

const ToneMetronome = ({ label = "Metronome", beatsPerMeasure = 4, defaultBpm = 80 }) => {
  const [bpm, setBpm] = useState(defaultBpm);
  const [isPlaying, setIsPlaying] = useState(false);
  const loopRef = useRef(null);
  const synthRef = useRef(null);

  const startMetronome = async () => {
    await Tone.start(); // unlock audio context
    Tone.Transport.stop();
    Tone.Transport.cancel();

    Tone.Transport.bpm.value = bpm;
    Tone.Transport.timeSignature = beatsPerMeasure;

    // Single synth
    synthRef.current = new Tone.MembraneSynth().toDestination();

    let count = 0;
    loopRef.current = new Tone.Loop((time) => {
      if (count % beatsPerMeasure === 0) {
        // Beat 1: louder
        synthRef.current.triggerAttackRelease("C1", "8n", time, 1.0);
      } else {
        // Other beats: softer
        synthRef.current.triggerAttackRelease("C3", "8n", time, 0.4);
      }
      count++;
    }, "4n").start(0);

    Tone.Transport.start();
    setIsPlaying(true);
  };

  const stopMetronome = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    if (loopRef.current) loopRef.current.stop();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) stopMetronome();
    else startMetronome();
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
      <p className="font-medium mb-3">{label}</p>

      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className={`px-4 py-2 rounded-md text-white font-semibold ${
            isPlaying
              ? "bg-pink-500 hover:bg-pink-600"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {isPlaying ? "Stop" : "Start"}
        </button>

        <div className="flex items-center gap-2">
          <input
            type="range"
            min="40"
            max="200"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-32"
          />
          <span className="font-mono text-lg">{bpm} BPM</span>
        </div>

        <div className="ml-auto font-bold text-2xl text-purple-700">
          {beatsPerMeasure}/4
        </div>
      </div>
    </div>
  );
};

export default ToneMetronome;
