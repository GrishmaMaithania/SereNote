import React, { useState } from "react";
// Make sure you have a `quiz.js` file in the same folder
import { getShuffledQuiz } from './quiz.js';
import ToneMetronome from "./ToneMetronome";


const lessons = [
    {
        id: 1,
        title: "Time Signatures",
        description: "Understand different time signatures like 2/4, 3/4, 4/4, 5/4, and 6/8 and how they affect rhythm.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtP8UnK1M1Y86FBkjrtHyQmqwhgBh0vmRXCw&s",
        content: (
            <>
                <h4 className="text-lg font-semibold mt-4 mb-2">⏱️ What is a Time Signature?</h4>
                <p>A time signature appears at the beginning of sheet music and tells you:</p>
                <ul className="list-disc pl-5 mt-2">
                    <li>The top number = number of beats in a measure</li>
                    <li>The bottom number = type of note that gets one beat</li>
                </ul>

                <h4 className="text-lg font-semibold mt-6 mb-2">📦 Simple Time Signatures</h4>
                <p>Each beat divides into 2 equal parts.</p>
                <ul className="list-disc pl-5 mt-2">
                    <li><strong>2/4</strong> – Marches</li>
                    <li><strong>3/4</strong> – Waltzes</li>
                    <li><strong>4/4</strong> – Pop/Rock, most common</li>
                </ul>

                <h4 className="text-lg font-semibold mt-6 mb-2">🔄 Compound Time Signatures</h4>
                <p>Each beat divides into 3 equal parts.</p>
                <ul className="list-disc pl-5 mt-2">
                    <li><strong>6/8</strong> – Two beats (each has 3 eighth notes)</li>
                    <li><strong>9/8</strong> – Three beats (triplet feel)</li>
                    <li><strong>12/8</strong> – Four beats (swing/jazz feel)</li>
                </ul>

                <h4 className="text-lg font-semibold mt-6 mb-2">🔺 Odd/Irregular Time Signatures</h4>
                <p>Unusual meters that combine simple and/or compound beats:</p>
                <ul className="list-disc pl-5 mt-2">
                    <li><strong>5/4</strong> – Dave Brubeck’s “Take Five”</li>
                    <li><strong>7/4</strong> – Pink Floyd’s “Money”</li>
                </ul>

                <h4 className="text-lg font-semibold mt-6 mb-2">🎧 Listen & Feel the Beat</h4>
                <p>Click below to hear the feel of each time signature:</p>
               <div className="flex flex-col gap-4 mt-4">
     <ToneMetronome 
  label="1/4 – Single Beat" 
  beatsPerMeasure={1} 
  defaultBpm={85} 
  description="Used for practicing steady pulses, focusing on timing precision." 
/>

<ToneMetronome 
  label="2/4 – March" 
  beatsPerMeasure={2} 
  defaultBpm={85} 
  description="Common in marches and polkas; emphasizes a strong downbeat and upbeat." 
/>

<ToneMetronome 
  label="3/4 – Waltz" 
  beatsPerMeasure={3} 
  defaultBpm={90} 
  description="Typical of waltzes and dances; has a flowing, circular feel." 
/>

<ToneMetronome 
  label="4/4 – Pop/Rock Beat" 
  beatsPerMeasure={4} 
  defaultBpm={90} 
  description="The most common time signature in modern music; steady and balanced." 
/>

<ToneMetronome 
  label="5/4 – Take Five" 
  beatsPerMeasure={5} 
  defaultBpm={90} 
  description="Famous from Dave Brubeck’s 'Take Five'; gives an uneven, jazzy groove." 
/>

<ToneMetronome 
  label="5/8 – Irregular Groove" 
  beatsPerMeasure={5} 
  defaultBpm={85} 
  description="Used in progressive rock and modern classical; feels angular and syncopated." 
/>

<ToneMetronome 
  label="6/8 – Compound Feel" 
  beatsPerMeasure={6} 
  defaultBpm={90} 
  description="Lively, rolling rhythm found in Irish jigs, ballads, and blues." 
/>

<ToneMetronome 
  label="7/4 – Odd Meter" 
  beatsPerMeasure={7} 
  defaultBpm={85} 
  description="Unusual and dynamic; often used in progressive rock and fusion." 
/>

    </div>

                
            </>
        )
    },
    {
        id: 2,
        title: "Staff Notation",
        description: "Understand how music is written using staff, clefs, ledger lines, and different types of notes.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTas-u2rJPQ9R3AhBSwYC5tskADCdV9xsOa_g&s",
        content: (
            <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-pink-50 p-6">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">🎼 Staff Notation</h2>
                    <div className="mb-8">
                        <h4 className="text-xl font-semibold text-purple-600 mb-3">📚 What is a Staff?</h4>
                        <p className="text-gray-700">The <span className="font-semibold">staff</span> is a set of five horizontal lines and four spaces where musical notes are written...</p>
                        <img src="https://jimmusic.in/wp-content/uploads/Modern_Musical_Notation.jpg" alt="Musical Staff Example" className="mt-4 rounded-lg shadow-md mx-auto" />
                    </div>
                    <div className="mb-8">
                        <h4 className="text-xl font-semibold text-purple-600 mb-3">📏 What Are Ledger Lines?</h4>
                        <p className="text-gray-700">The <span className="font-semibold">staff</span> consists of 5 lines and 4 spaces...</p>
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgfS1SsUH_9IjwL30I_3PSAB-yoMOiMLktQfxZaLRO5ZMITKoHrpAVs-VATAzxFOufBlAICeeJKHwqeo2XL-mvP0NPSRnNdbEKqQz9TL_lfqyoT8nJZVDvt0NAT-m3DGeox6JbsL9yEQK4/s1600/ledger.gif" alt="Ledger Lines" className="mt-4 rounded-lg shadow-md mx-auto" />
                    </div>
                    <div className="mb-8">
                        <h4 className="text-xl font-semibold text-purple-600 mb-3">⬆️⬇️ Lower & Higher Notes</h4>
                        <p className="text-gray-700">Notes placed <span className="font-semibold">above</span> the staff are higher in pitch...</p>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh_Dobxh2nDKe95RRISuJ5ssO-CR7fzI9T2w&s" alt="Notes on Staff" className="mt-4 rounded-lg shadow-md mx-auto" />
                    </div>
                    <div className="mb-8">
                        <h4 className="text-xl font-semibold text-purple-600 mb-3">🎵 Types of Notes</h4>
                        <p className="text-gray-700">Music notes tell us how long a sound lasts. Here are the common ones:</p>
                        <ul className="list-disc pl-6 mt-2 text-gray-700">
                            <li><span className="font-semibold">Whole Note</span>: 4 beats</li>
                            <li><span className="font-semibold">Half Note</span>: 2 beats</li>
                            <li><span className="font-semibold">Quarter Note</span>: 1 beat</li>
                            <li><span className="font-semibold">Eighth Note</span>: ½ beat</li>
                        </ul>
                        <img src="https://i.ytimg.com/vi/SBRf5oG2BoI/hqdefault.jpg" alt="Note Types" className="mt-4 rounded-lg shadow-md mx-auto" />
                    </div>
                    <div className="mb-8">
                        <h4 className="text-xl font-semibold text-purple-600 mb-3">🎼 Notes on the Staff</h4>
                        <p className="text-gray-700">Here's a visual of how notes are placed within the staff using the <span className="font-semibold">treble clef</span>:</p>
                        <ul className="list-disc pl-6 mt-2 text-gray-700">
                            <li><span className="font-semibold">Lines</span>: E – G – B – D – F (“Every Good Boy Does Fine”)</li>
                            <li><span className="font-semibold">Spaces</span>: F – A – C – E (“FACE”)</li>
                        </ul>
                        <img src="https://images.squarespace-cdn.com/content/v1/67f594e3054a9d111d3f71e9/1752782356874-S5SHWMLSL98LQQDGSVVN/the-treble-clef-los-angeles-music-teachers_orig.png" alt="Treble Clef Notes" className="mt-4 rounded-lg shadow-md mx-auto" />
                    </div>
                    <div className="text-center">
                    </div>
                </div>
            </div>
        )
    },
    {
  id: 3,
  title: "Scales",
  description: "Explore major, minor, and modal scales and how they shape the feel of a melody.",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROXSkr30W1smFUmuSCZnY8TLoSekMhy0CdkYNbKYy6e-VxiWjJ7BlK5y7P8tZm7zskF_8&usqp=CAU",
  content: (
    <>
      <h4 className="text-lg font-semibold mt-4 mb-2">🎶 What is a Scale?</h4>
      <p>A scale is a sequence of musical notes arranged in ascending or descending order...</p>

      <h4 className="text-lg font-semibold mt-6 mb-2">📏 Whole & Half Steps</h4>
      <ul className="list-disc pl-5 mt-2">
        <li><strong>Whole step (W)</strong> – 2 semitones (e.g. C to D)</li>
        <li><strong>Half step (H)</strong> – 1 semitone (e.g. E to F)</li>
      </ul>

      <h4 className="text-lg font-semibold mt-6 mb-2">🌞 Major Scale Formula</h4>
      <p>The major scale is known for its bright, happy sound. It follows this pattern:</p>
      <p className="mt-2 bg-yellow-100 p-2 rounded text-center font-medium">W – W – H – W – W – W – H</p>
      <p className="mt-2">For example, the <strong>C Major scale</strong> is:</p>
      <p className="font-semibold mt-1">C – D – E – F – G – A – B – C</p>

      <h4 className="text-lg font-semibold mt-6 mb-2">🌙 Natural Minor Scale Formula</h4>
      <p>The natural minor scale sounds more emotional or somber...</p>
      <p className="mt-2 bg-blue-100 p-2 rounded text-center font-medium">W – H – W – W – H – W – W</p>
      <p className="mt-2">For example, the <strong>A Minor scale</strong> is:</p>
      <p className="font-semibold mt-1">A – B – C – D – E – F – G – A</p>

      <h4 className="text-lg font-semibold mt-6 mb-2">🎨 Musical Modes</h4>
      <p>
        Modes are variations of a scale where you start from a different note but use the 
        same set of notes. This shifts the "color" or mood of the music.
        Example: C Major (C–D–E–F–G–A–B–C).  
        Start on <strong>C</strong> → Ionian (Major).  
        Start on <strong>D</strong> → Dorian.  
        Start on <strong>E</strong> → Phrygian, etc.
      </p>
      <ul className="list-disc pl-5 mt-2">
        <li><strong>Ionian</strong>: Bright & happy (same as Major)</li>
        <li><strong>Dorian</strong>: Jazzy, minor but hopeful</li>
        <li><strong>Phrygian</strong>: Dark, exotic (Spanish feel)</li>
        <li><strong>Lydian</strong>: Dreamy, floating</li>
        <li><strong>Mixolydian</strong>: Bluesy, rock-style</li>
        <li><strong>Aeolian</strong>: Sad, emotional (same as Natural Minor)</li>
        <li><strong>Locrian</strong>: Tense, unstable</li>
      </ul>

      <h4 className="text-lg font-semibold mt-6 mb-2">🎸 Pentatonic & Blues Scales</h4>
      <ul className="list-disc pl-5 mt-2">
        <li><strong>Major Pentatonic</strong>: W – W – W+H – W – W+H (5 notes, happy sound)</li>
        <li><strong>Minor Pentatonic</strong>: W+H – W – W – W+H – W (5 notes, soulful feel)</li>
        <li><strong>Major Blues</strong>: W – W – H – H – W – W – H (6 notes, jazzy & playful)</li>
        <li><strong>Minor Blues</strong>: W+H – W – H – H – W+H – W (6 notes, expressive & gritty)</li>
      </ul>
    </>
  )
}
,
    {
        id: 4,
        title: "Chords",
        description: "Discover how chords are built and used in harmony — major, minor, diminished and more.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnZ-yIHJWaTEb-_Ms4nLGRvLaCz4z2JYPexw&s",
        content: (
            <>
                <h4 className="text-lg font-semibold mt-4 mb-2">🎵 What is a Chord?</h4>
                <p>A chord is a group of 3 or more notes played together...</p>
                <h4 className="text-lg font-semibold mt-6 mb-2">📏 Chord Structure</h4>
                <ul className="list-disc pl-5 mt-2">
                    <li><strong>Root</strong>: The starting note</li>
                    <li><strong>Third</strong>: Major (4 semitones) or Minor (3 semitones)</li>
                    <li><strong>Fifth</strong>: Perfect (7 semitones), Diminished (6), or Augmented (8)</li>
                </ul>
                <h4 className="text-lg font-semibold mt-6 mb-2">🎹 Common Chords and Formulas</h4>
                <ul className="list-disc pl-5 mt-3 space-y-2">
                    <li><strong>Major (C - E - G)</strong>: Root + Major 3rd + Perfect 5th</li>
                    <li><strong>Minor (C - E♭ - G)</strong>: Root + Minor 3rd + Perfect 5th</li>
                    <li><strong>Diminished (C - E♭ - G♭)</strong>: Root + Minor 3rd + Diminished 5th</li>
                    <li><strong>Augmented (C - E - G♯)</strong>: Root + Major 3rd + Augmented 5th</li>
                    <li><strong>Major 7 (C - E - G - B)</strong>: Major triad + Major 7th</li>
                    <li><strong>Dominant 7 (C - E - G - B♭)</strong>: Major triad + Minor 7th</li>
                    <li><strong>Power Chord / 5 (C - G)</strong>: Root + Perfect 5th (no 3rd)</li>
                    <li><strong>Add9 (C - E - G - D)</strong>: Major triad + 9th (2nd an octave up)</li>
                    <li><strong>Sus2 (C - D - G)</strong>: Root + Major 2nd + Perfect 5th (no 3rd)</li>
                    <li><strong>Sus4 (C - F - G)</strong>: Root + Perfect 4th + Perfect 5th (no 3rd)</li>
                </ul>
            </>
        ),
    },
];

// The Quiz component is its own separate component.
const Quiz = ({ questions, onRestart }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        if (answer === questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }
        setTimeout(() => {
            const nextQuestionIndex = currentQuestionIndex + 1;
            if (nextQuestionIndex < questions.length) {
                setCurrentQuestionIndex(nextQuestionIndex);
                setSelectedAnswer(null);
            } else {
                setQuizFinished(true);
            }
        }, 2000); // Wait 2 seconds to show the correct answer
    };

    if (quizFinished) {
        return (
            <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
                <h3 className="text-3xl font-bold text-purple-700">Quiz Complete!</h3>
                <p className="text-xl text-slate-600 mt-4">Your final score is: <span className="font-bold text-purple-700">{score}</span> out of {questions.length}</p>
                <button
                    onClick={onRestart}
                    className="mt-8 px-8 py-3 font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:scale-105"
                >
                    Take Another Quiz
                </button>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="p-6 md:p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/40">
            <p className="text-right text-sm font-semibold text-slate-600 mb-2">Question {currentQuestionIndex + 1}/{questions.length}</p>
            <p className="text-xl font-bold text-slate-800 mb-6">{currentQuestion.question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === currentQuestion.correctAnswer;
                    let buttonClass = 'bg-white hover:bg-purple-100 text-purple-700';

                    if (selectedAnswer) {
                        if (isCorrect) {
                            buttonClass = 'bg-green-500 text-white';
                        } else if (isSelected && !isCorrect) {
                            buttonClass = 'bg-red-500 text-white';
                        } else {
                            buttonClass = 'bg-white/50 text-slate-500 opacity-60';
                        }
                    }

                    return (
                        <button
                            key={option}
                            onClick={() => handleAnswerClick(option)}
                            disabled={selectedAnswer !== null}
                            className={`p-4 rounded-lg text-left font-semibold shadow transition-all duration-300 disabled:cursor-not-allowed ${buttonClass}`}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

// This is the main component that this file exports.
export default function Theory() {
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [showQuiz, setShowQuiz] = useState(false);

    const handleLessonClick = (lesson) => {
        setSelectedLesson(prev => (prev && prev.id === lesson.id ? null : lesson));
    };

    const handleStartQuiz = () => {
        setQuizQuestions(getShuffledQuiz());
        setShowQuiz(true);
    };

    const handleRestartQuiz = () => {
        handleStartQuiz();
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-white via-purple-50 to-pink-100 font-sans">
            <div className="container mx-auto px-4 md:px-12 py-16">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-purple-700 mb-4">🎼 Music Theory Lessons</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Explore fundamental music concepts through interactive lessons and examples.
                    </p>
                </header>

                <main>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {lessons.map((lesson) => (
                            <div
                                key={lesson.id}
                                onClick={() => handleLessonClick(lesson)}
                                className={`group cursor-pointer bg-white/50 backdrop-blur-lg rounded-2xl shadow-lg border border-white/40 p-5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${selectedLesson && selectedLesson.id === lesson.id ? 'ring-4 ring-purple-400 ring-offset-2' : ''
                                    }`}
                            >
                                <img
                                    src={lesson.image}
                                    alt={lesson.title}
                                    className="rounded-lg mb-4 w-full h-40 object-cover shadow-md"
                                />
                                <h2 className="text-xl font-bold text-slate-800">{lesson.title}</h2>
                                <p className="text-slate-600 mt-2 text-sm">{lesson.description}</p>
                            </div>
                        ))}
                    </div>

                    {selectedLesson && (
                        <div className="max-w-4xl mx-auto my-12 bg-white rounded-2xl shadow-2xl p-6 md:p-8">
                            <h2 className="text-3xl font-bold text-purple-700 mb-4">{selectedLesson.title}</h2>
                            <div className="prose lg:prose-lg max-w-none">{selectedLesson.content}</div>
                        </div>
                    )}
                </main>

                <section className="mt-20">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-purple-800 mb-4">🧠 Test Your Knowledge</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Ready to see what you've learned? Take a quick 10-question quiz to find out!
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        {!showQuiz ? (
                            <div className="text-center">
                                <button
                                    onClick={handleStartQuiz}
                                    className="px-10 py-4 font-semibold text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg hover:scale-105"
                                >
                                    Start Quiz
                                </button>
                            </div>
                        ) : (
                            <Quiz questions={quizQuestions} onRestart={handleRestartQuiz} />
                        )}
                    </div>
                </section>

                <footer className="text-center text-slate-500 text-sm mt-16">
                    <p>© 2025 Music Theory Hub. Learn, practice, and enjoy the world of music!</p>
                </footer>
            </div>
        </div>
    );
}