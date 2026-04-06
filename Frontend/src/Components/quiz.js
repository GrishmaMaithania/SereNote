const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const allQuestions = [
  // --- Time Signatures ---
  {
    question: "In a 4/4 time signature, what does the top number '4' represent?",
    options: ["There are 4 measures in the song", "A quarter note gets 4 beats", "There are 4 beats in a measure", "The tempo is 4 beats per minute"],
    correctAnswer: "There are 4 beats in a measure",
  },
  {
    question: "Which time signature is most commonly associated with a waltz?",
    options: ["2/4", "4/4", "3/4", "6/8"],
    correctAnswer: "3/4",
  },
  {
    question: "A 6/8 time signature is considered what type of meter?",
    options: ["Simple", "Compound", "Irregular", "Complex"],
    correctAnswer: "Compound",
  },
  {
    question: "How many eighth notes are in a measure of 6/8 time?",
    options: ["3", "4", "6", "8"],
    correctAnswer: "6",
  },
  {
    question: "In a 2/4 time signature, which note gets one beat?",
    options: ["Whole Note", "Half Note", "Quarter Note", "Eighth Note"],
    correctAnswer: "Quarter Note",
  },
  {
    question: "The song 'Take Five' by Dave Brubeck is famous for its use of which odd time signature?",
    options: ["7/4", "5/4", "9/8", "3/4"],
    correctAnswer: "5/4",
  },
  {
    question: "In compound meters like 6/8 or 9/8, the main beat is typically subdivided into how many parts?",
    options: ["2 equal parts", "3 equal parts", "4 equal parts", "1 equal part"],
    correctAnswer: "3 equal parts",
  },
  {
    question: "What is the primary 'feel' of a 2/4 time signature?",
    options: ["A flowing, three-beat pattern", "A standard four-beat pattern", "A two-beat march-like pattern", "A complex, jazzy pattern"],
    correctAnswer: "A two-beat march-like pattern",
  },
  {
    question: "How many quarter notes can fit in one measure of 3/4 time?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "3",
  },
  {
    question: "Pink Floyd's song 'Money' is well-known for its main riff in which irregular time signature?",
    options: ["5/8", "6/8", "7/4", "4/4"],
    correctAnswer: "7/4",
  },
  {
    question: "If a measure has two beats and each beat is a dotted quarter note, what is the time signature?",
    options: ["4/4", "2/2", "3/4", "6/8"],
    correctAnswer: "6/8",
  },
  {
    question: "What does the bottom number in a time signature indicate?",
    options: ["How many beats are in a measure", "The type of note that gets one beat", "The total number of measures", "The recommended tempo"],
    correctAnswer: "The type of note that gets one beat",
  },

  // --- Staff Notation ---
  {
    question: "How many lines are in a standard musical staff?",
    options: ["4", "5", "6", "7"],
    correctAnswer: "5",
  },
  {
    question: "Which type of note has a duration of 2 beats in common time?",
    options: ["Whole Note", "Half Note", "Quarter Note", "Eighth Note"],
    correctAnswer: "Half Note",
  },
  {
    question: "On a standard treble clef staff, which note is found on the second line from the bottom?",
    options: ["E", "G", "B", "D"],
    correctAnswer: "G",
  },
  {
    question: "What is the mnemonic for remembering the spaces on the treble clef from bottom to top?",
    options: ["Every Good Boy Does Fine", "FACE", "All Cows Eat Grass", "Good Boys Do Fine Always"],
    correctAnswer: "FACE",
  },
  {
    question: "A quarter note is equal in duration to how many eighth notes?",
    options: ["One", "Two", "Three", "Four"],
    correctAnswer: "Two",
  },
  {
    question: "What are the short lines used to write notes above or below the staff called?",
    options: ["Bar lines", "Ledger lines", "Staff lines", "Clef lines"],
    correctAnswer: "Ledger lines",
  },
  {
    question: "How many beats does a whole note receive in 4/4 time?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "4",
  },
  {
    question: "Notes placed higher on the staff have a...",
    options: ["Higher pitch", "Lower pitch", "Longer duration", "Shorter duration"],
    correctAnswer: "Higher pitch",
  },
  {
    question: "Which clef is also known as the G-clef because its curl wraps around the 'G' line?",
    options: ["Bass Clef", "Alto Clef", "Tenor Clef", "Treble Clef"],
    correctAnswer: "Treble Clef",
  },
  {
    question: "If you have two half notes in a measure of 4/4 time, how many beats are left?",
    options: ["Zero", "One", "Two", "Three"],
    correctAnswer: "Zero",
  },
  {
    question: "What is the note in the second space from the bottom of the treble clef?",
    options: ["F", "A", "C", "E"],
    correctAnswer: "A",
  },

  // --- Scales ---
  {
    question: "What is the correct whole (W) and half (H) step formula for a major scale?",
    options: ["W-H-W-W-H-W-W", "W-W-H-W-W-W-H", "W-W-W-H-W-W-H", "H-W-W-H-W-W-W"],
    correctAnswer: "W-W-H-W-W-W-H",
  },
  {
    question: "How many notes are typically in a minor pentatonic scale?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "5",
  },
  {
    question: "The natural minor scale is also known by what modal name?",
    options: ["Dorian", "Lydian", "Mixolydian", "Aeolian"],
    correctAnswer: "Aeolian",
  },
  {
    question: "A half step is the distance of how many semitones?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "1",
  },
  {
    question: "Which mode is identical to the major scale?",
    options: ["Aeolian", "Dorian", "Phrygian", "Ionian"],
    correctAnswer: "Ionian",
  },
  {
    question: "The 'blues' scale adds one extra note to which other scale?",
    options: ["Major scale", "Diatonic scale", "Pentatonic scale", "Chromatic scale"],
    correctAnswer: "Pentatonic scale",
  },
  {
    question: "Which mode is known for its 'dreamy' sound due to its raised 4th degree?",
    options: ["Lydian", "Mixolydian", "Locrian", "Dorian"],
    correctAnswer: "Lydian",
  },
  {
    question: "How many whole steps are in a major scale?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "5",
  },
  {
    question: "The Phrygian mode is often described as having what kind of feel?",
    options: ["Jazzy / Bluesy", "Bright / Happy", "Spanish / Dark", "Dreamy / Ethereal"],
    correctAnswer: "Spanish / Dark",
  },
  {
    question: "What is the interval pattern for a natural minor scale?",
    options: ["W-W-H-W-W-W-H", "W-H-W-W-H-W-W", "W-W-H-W-W-H-W", "H-W-W-H-W-W-W"],
    correctAnswer: "W-H-W-W-H-W-W",
  },
  {
    question: "A whole step is equal to how many half steps?",
    options: ["One", "Two", "Three", "Four"],
    correctAnswer: "Two",
  },

  // --- Chords ---
  {
    question: "A standard major chord is built from which three scale degrees?",
    options: ["Root, 2nd, and 5th", "Root, 3rd, and 5th", "Root, 4th, and 5th", "Root, 3rd, and 6th"],
    correctAnswer: "Root, 3rd, and 5th",
  },
  {
    question: "What is the key difference between a major triad and a minor triad?",
    options: ["The root note", "The fifth", "The third", "The number of notes"],
    correctAnswer: "The third",
  },
  {
    question: "A chord that contains a root, a minor third, and a diminished fifth is called what?",
    options: ["Augmented", "Major 7th", "Diminished", "Sus4"],
    correctAnswer: "Diminished",
  },
  {
    question: "A C Major chord consists of which three notes?",
    options: ["C-D-G", "C-Eb-G", "C-E-G", "C-F-G"],
    correctAnswer: "C-E-G",
  },
  {
    question: "What does a 'sus4' chord replace the third with?",
    options: ["The second", "The fourth", "The fifth", "The sixth"],
    correctAnswer: "The fourth",
  },
  {
    question: "A 'Power Chord' or '5' chord is made of which two notes?",
    options: ["Root and Major Third", "Root and Minor Third", "Root and Perfect Fifth", "Third and Fifth"],
    correctAnswer: "Root and Perfect Fifth",
  },
  {
    question: "What kind of third does a diminished chord have?",
    options: ["Major Third", "Minor Third", "Perfect Third", "No Third"],
    correctAnswer: "Minor Third",
  },
  {
    question: "A chord made of a Root, a Major Third, and an Augmented Fifth is called what?",
    options: ["Major", "Minor", "Diminished", "Augmented"],
    correctAnswer: "Augmented",
  },
  {
    question: "What is the formula for a Dominant 7th chord?",
    options: ["Major triad + Major 7th", "Major triad + Minor 7th", "Minor triad + Minor 7th", "Diminished triad + Major 7th"],
    correctAnswer: "Major triad + Minor 7th",
  },
  {
    question: "Why do 'sus' chords create a feeling of tension or suspense?",
    options: ["They have too many notes", "They are always dissonant", "They lack a third, which defines the chord as major or minor", "They are difficult to play"],
    correctAnswer: "They lack a third, which defines the chord as major or minor",
  },
  {
    question: "The notes C, Eb, and G make up which chord?",
    options: ["C Major", "C Minor", "C Diminished", "C Augmented"],
    correctAnswer: "C Minor",
  },
  {
    question: "What is the minimum number of notes required to form a chord?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "3",
  },
];

export const getShuffledQuiz = () => shuffleArray(allQuestions).slice(0, 10);