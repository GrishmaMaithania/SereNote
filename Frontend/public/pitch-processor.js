// public/pitch-processor.js

let detect_pitch;

class PitchProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.wasmReady = false; // Add a flag to track WASM readiness.

    this.port.onmessage = async (event) => {
      try {
        const wasmModule = await WebAssembly.instantiate(event.data.wasmBuffer);
        detect_pitch = wasmModule.instance.exports.detect_pitch;
        
        // ❗ Set the flag to true only after WASM is successfully loaded.
        this.wasmReady = true;
        console.log("✅ WASM module is ready in audio worklet.");
      } catch (err) {
        console.error("❌ Failed to instantiate WASM in worklet:", err);
      }
    };
  }

  process(inputs) {
    // ❗ Wait for the wasmReady flag to be true before processing audio.
    if (!this.wasmReady) {
      return true;
    }

    const inputChannel = inputs[0][0];

    if (inputChannel) {
      const pitch = detect_pitch(inputChannel, sampleRate);
      if (pitch > 0) {
        this.port.postMessage({ pitch });
      }
    }
    
    return true;
  }
}

registerProcessor("pitch-processor", PitchProcessor);