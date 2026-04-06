export function noteToFrequency(note) {
  const noteMap = {
    C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5,
    "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11
  };

  const match = note.match(/^([A-G]#?)(\d)$/);
  if (!match) return null;

  const [, pitchClass, octave] = match;
  const semitoneIndex = noteMap[pitchClass.toUpperCase()];
  const midiNumber = semitoneIndex + (parseInt(octave) + 1) * 12;
  return 440 * Math.pow(2, (midiNumber - 69) / 12); // A4 = 440 Hz
}
