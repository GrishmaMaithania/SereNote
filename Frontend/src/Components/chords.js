// Chords.js

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Youtube, Upload } from "lucide-react";
import YouTube from "react-youtube";

// ✅ Helper: extract only the videoId
function getYoutubeVideoId(url) {
  try {
    const u = new URL(url.trim().replace("http://", "https://"));
    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1); // short link
    }
    if (u.hostname.includes("youtube.com")) {
      return u.searchParams.get("v"); // standard link
    }
    return null;
  } catch {
    return null;
  }
}

export default function Chords() {
  const [file, setFile] = useState(null);
  const [chordData, setChordData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const [youtubeUrl, setYoutubeUrl] = useState("");
  const playerRef = useRef(null);

  // ✅ Detect chords from YouTube
  const handleYoutubeDetect = async () => {
    if (!youtubeUrl.trim()) {
      setError("Please enter a YouTube URL!");
      return;
    }

    const videoId = getYoutubeVideoId(youtubeUrl);
    if (!videoId) {
      setError("Invalid YouTube URL!");
      return;
    }

    setLoading(true);
    setError("");
    setChordData([]);

    try {
      const res = await axios.post(
        "http://localhost:8000/detect-chords-from-youtube/",
        { url: youtubeUrl }, // send full URL to backend
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.chords && Array.isArray(res.data.chords) && res.data.chords.length > 0) {
        setChordData(res.data.chords);
      } else if (res.data.error) {
        setError(res.data.error);
      } else {
        setError("No chords detected or unexpected response from server.");
      }
    } catch (err) {
      setError("Failed to detect chords from YouTube.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cleanup audio URL
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // ✅ Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setChordData([]);
    setError("");
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    if (selectedFile) {
      setAudioUrl(URL.createObjectURL(selectedFile));
    } else {
      setAudioUrl(null);
    }
  };

  // ✅ Detect chords from file
  const handleUpload = async () => {
    if (!file) {
      setError("Please select an audio file first!");
      setChordData([]);
      return;
    }

    setLoading(true);
    setError("");
    setChordData([]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/detect-chords/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.chords && Array.isArray(res.data.chords) && res.data.chords.length > 0) {
        setChordData(res.data.chords);
      } else if (res.data.error) {
        setError(res.data.error);
      } else {
        setError("No chords detected or unexpected response from server.");
      }
    } catch (err) {
      console.error("Error detecting chords:", err);
      setError("Failed to detect chords. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Track audio element time
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // ✅ Track YouTube playback time
  const handlePlayerReady = (event) => {
    playerRef.current = event.target;
    setInterval(() => {
      if (playerRef.current) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 500); // check every 0.5s
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden">
      {/* Glow blobs */}
     

      <main className="relative z-10 px-10 py-20">
        {/* Hero */}
        <motion.h1
          className="text-6xl font-bold leading-tight bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Detect Chords from Your Music
        </motion.h1>
        <p className="text-center text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
          Upload an <strong>audio file</strong> or paste a <strong>YouTube link</strong>, and our AI will reveal the chords in real time.
          Perfect for <span className="text-purple-600 font-semibold">musicians, learners, and songwriters.</span>
        </p>

        {/* Upload + YouTube Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* File Upload */}
          <div className="glass p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-purple-700">
              <Upload className="w-6 h-6" /> Upload Audio File
            </h2>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="block w-full mb-4 text-sm border border-purple-200 rounded-xl px-4 py-3 cursor-pointer focus:ring-purple-400 focus:border-purple-400"
            />
            <button
              onClick={handleUpload}
              disabled={loading || !file}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition disabled:bg-gray-300"
            >
              {loading ? "Detecting Chords..." : "Detect from File"}
            </button>
          </div>

          {/* YouTube Input */}
          <div className="glass p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-600">
              <Youtube className="w-6 h-6" /> Paste YouTube Link
            </h2>
            <input
              type="text"
              placeholder="https://youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="block w-full mb-4 text-sm border border-gray-300 rounded-xl px-4 py-3 focus:ring-red-400 focus:border-red-400"
            />
            <button
              onClick={handleYoutubeDetect}
              disabled={loading || !youtubeUrl}
              className="w-full bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition disabled:bg-gray-300"
            >
              {loading ? "Detecting from YouTube..." : "Detect from YouTube"}
            </button>
          </div>
        </div>

        {error && (
          <div className="max-w-3xl mx-auto mt-10 bg-red-100 text-red-700 px-6 py-4 rounded-xl shadow">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Playback */}
        {audioUrl && (
          <div className="glass rounded-2xl max-w-4xl mx-auto mt-14 p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-purple-700">🎧 Playback</h2>
            <audio
              ref={audioRef}
              controls
              src={audioUrl}
              onTimeUpdate={handleTimeUpdate}
              className="w-full"
            />
          </div>
        )}

        {/* ✅ Fixed YouTube Playback with sync */}
        {youtubeUrl && getYoutubeVideoId(youtubeUrl) && (
          <div className="glass rounded-2xl max-w-4xl mx-auto mt-14 p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-purple-700">🎬 YouTube Playback</h2>
            <YouTube
              videoId={getYoutubeVideoId(youtubeUrl)}
              opts={{ width: "100%", height: "360" }}
              onReady={handlePlayerReady}
            />
          </div>
        )}

        {/* Chord Display */}
        {chordData.length > 0 && (
          <div className="glass rounded-2xl max-w-6xl mx-auto mt-14 p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-purple-700">🎼 Detected Chords</h2>
            <div className="space-y-6">
              {chordData.reduce((rows, chord, i) => {
                const rowIndex = Math.floor(i / 3);
                if (!rows[rowIndex]) rows[rowIndex] = [];
                rows[rowIndex].push(chord);
                return rows;
              }, []).map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-6 justify-center flex-wrap">
                  {row.map((segment, index) => {
                    const isActive =
                      currentTime >= segment.start_time &&
                      currentTime < segment.end_time;

                    return (
                      <motion.div
                        key={index}
                        className={`px-6 py-4 rounded-xl text-white font-bold shadow-lg ${
                          isActive ? "bg-purple-700 scale-110" : "bg-purple-500"
                        }`}
                        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.6, repeat: isActive ? Infinity : 0 }}
                      >
                        <div className="text-xl">{segment.chord}</div>
                        <div className="text-sm opacity-80">
                          {segment.start_time.toFixed(1)}s - {segment.end_time.toFixed(1)}s
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
