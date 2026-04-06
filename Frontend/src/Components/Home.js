// Home.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Music, HeartPulse, Leaf, Sparkles, Star } from "lucide-react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [keyResult, setKeyResult] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      setKeyResult("Analyzing your file...");
      const res = await axios.post("http://localhost:8000/detect-key/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setKeyResult(res.data.key || res.data.scale || res.data.error);
    } catch (error) {
      console.error(error);
      setKeyResult("Something went wrong");
    }
  };

  const handleYoutubeUpload = async () => {
    if (!youtubeUrl) {
      alert("Please enter a YouTube URL first!");
      return;
    }
    try {
      new URL(youtubeUrl);
    } catch (_) {
      alert("Please enter a valid URL.");
      return;
    }

    try {
      setKeyResult("Fetching and analyzing from YouTube...");
      const res = await axios.post(
        "http://localhost:8000/detect-from-youtube/",
        { url: youtubeUrl },
        { headers: { "Content-Type": "application/json" } }
      );
      setKeyResult(res.data.key || res.data.scale || res.data.error);
    } catch (error) {
      console.error("Error detecting key from YouTube URL:", error);
      setKeyResult("Failed to process the YouTube link. It may be private or invalid.");
    }
  };

  return (
    <>
  
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden font-sans">
        

        

        {/* Hero */}
        <section className="relative px-10 py-20">
          <h1 className="text-6xl font-bold leading-tight bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent relative z-10">
            Learn music <br /> Anytime. <span className="underline">Anywhere.</span>
          </h1>

          <div className="mt-6 text-xl space-y-2 relative z-10 text-gray-700">
            <p>✨ <span className="text-purple-600 underline">Feel</span> music</p>
            <p>✨ Play music</p>
          </div>

          <button className="mt-8 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white px-8 py-2 rounded-full shadow-lg hover:scale-105 transition relative z-10">
            Start learning now
          </button>
        </section>

        {/* Floating Image */}
        <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2">
          <motion.div
            className="relative shadow-2xl rounded-3xl overflow-hidden"
            animate={{ y: [-150, -250, -150] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={"/4aedfb97-fd23-4c23-8cf7-bab3a5cf4f04.jpeg"}
              alt={"music"}
              className="w-80 h-56 object-cover rounded-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent" />
          </motion.div>
        </div>

        {/* Quotes */}
        <div className="px-10 mt-16 grid gap-10 md:grid-cols-2">
          <div className="border-l-4 border-purple-500 pl-6 italic text-2xl text-gray-800">
            "I won’t be a rock star. I will be a legend."
            <p className="mt-4 font-bold text-purple-700">— Freddie Mercury</p>
          </div>
          <div className="border-l-4 border-pink-500 pl-6 italic text-2xl text-gray-800">
            "One good thing about music, when it hits you, you feel no pain."
            <p className="mt-4 font-bold text-pink-700">— Bob Marley</p>
          </div>
        </div>
      </div>

      {/* Key Detection */}
      <section className="relative py-24 bg-gradient-to-br from-purple-50/40 via-white/70 to-pink-50/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent leading-relaxed">
  🎵 Detect the Key of Your Song
</h1>


          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-14">
            Upload your audio file or paste a YouTube link, and we’ll analyze it
            to detect the <strong>key</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="glass p-8 rounded-2xl">
              <h2 className="text-xl font-semibold text-purple-700 mb-4">Upload Audio File</h2>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-gray-600 border border-purple-200 rounded-xl px-4 py-3 mb-4 cursor-pointer focus:ring-purple-400 focus:border-purple-400"
              />
              <button
                onClick={handleUpload}
                disabled={!file}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition disabled:bg-gray-300"
              >
                Detect from File
              </button>
            </div>

            <div className="glass p-8 rounded-2xl">
              <h2 className="text-xl font-semibold text-red-600 mb-4">Paste YouTube Link</h2>
              <input
                type="text"
                placeholder="https://youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="block w-full text-sm border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:ring-red-400 focus:border-red-400"
              />
              <button
                onClick={handleYoutubeUpload}
                disabled={!youtubeUrl}
                className="w-full bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition disabled:bg-gray-300"
              >
                Detect from YouTube
              </button>
            </div>
          </div>

          {keyResult && (
            <div className="mt-14">
              <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-10 py-5 rounded-full shadow-lg animate-pulse">
                <p className="text-2xl font-bold">Result: {keyResult}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Fun Facts */}
      <section className="py-24 bg-gradient-to-br from-pink-50/60 via-white/70 to-purple-50/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-14 leading-normal">
  🎼 Fun & Fascinating Facts About Music
</h2>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              { icon: <HeartPulse className="w-6 h-6 text-red-500" />, text: "Listening to music releases dopamine — the 'feel-good' chemical." },
              { icon: <Leaf className="w-6 h-6 text-green-500" />, text: "Music helps plants grow faster when played regularly." },
              { icon: <Star className="w-6 h-6 text-yellow-500" />, text: "Mozart composed his first music at age 5!" },
              { icon: <Music className="w-6 h-6 text-purple-600" />, text: "Your heartbeat can sync to the rhythm of the music." },
              { icon: <Sparkles className="w-6 h-6 text-pink-500" />, text: "Bees can recognize patterns in music." },
              { icon: <Music className="w-6 h-6 text-orange-500" />, text: "A Stradivarius violin sold for $15.9M — the most expensive instrument ever." },
            ].map((fact, i) => (
              <div
                key={i}
                className="glass p-6 rounded-2xl flex items-center gap-4 hover:scale-105 transition-transform"
              >
                {fact.icon}
                <p className="text-lg text-gray-700">{fact.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// Extra glassmorphism helper
const glass = "bg-white/40 backdrop-blur-md border border-white/20 shadow-xl";
