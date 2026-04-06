// src/components/Jam.js
import React, { useState, useEffect, useRef } from "react";
import { uploadAudio } from "../utils/uploadAudio";

import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Jam() {
  console.log("Rendering Jam Component");
  const [baseTrack, setBaseTrack] = useState(null);
  const [layerTrack, setLayerTrack] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [user, setUser] = useState(null);
  const [mergeName, setMergeName] = useState("");

  const baseAudioRef = useRef(null);
  const layerAudioRef = useRef(null);

  const baseInputRef = useRef(null);
  const layerInputRef = useRef(null);

  const auth = getAuth();

  // ✅ Watch auth state
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, [auth]);

  // ✅ Fetch uploaded tracks (all users)
  useEffect(() => {
    const q = query(collection(db, "tracks"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTracks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // ✅ Upload track
  const handleUpload = async (file, type) => {
    if (!file || uploading) return;
    if (!user) {
      alert("You must be logged in to upload");
      return;
    }

    console.log("handleUpload called:", file.name, type);
    setUploading(true);

    try {
      const url = await uploadAudio(file, type);
      console.log("Uploaded URL:", url);

      // Prevent duplicates
      const q = query(
        collection(db, "tracks"),
        where("url", "==", url),
        where("type", "==", type)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        console.log("Duplicate track detected, skipping Firestore addition.");
      } else {
       let displayName = file.name;

// ✅ If merged, use the user’s custom name (mergeName state) if provided
if (type === "merged") {
  displayName =
    mergeName && mergeName.trim() !== ""
      ? mergeName.trim()
      : `Merged Track - ${new Date().toLocaleString()}`;
}


        await addDoc(collection(db, "tracks"), {
          name: displayName,
          type,
          url,
          createdAt: serverTimestamp(),
          uid: user.uid, // ✅ save user ID
        });

        if (type === "base") setBaseTrack(url);
        else if (type === "layer") setLayerTrack(url);
        else if (type === "merged") {
          setBaseTrack(url);
          setLayerTrack(null);
        }

        if (type === "base" && baseInputRef.current) {
          baseInputRef.current.value = "";
        } else if (type === "layer" && layerInputRef.current) {
          layerInputRef.current.value = "";
        }

        alert("Audio uploaded successfully!");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload audio");
    }

    setUploading(false);
  };

  // ✅ Delete track
  const handleDelete = async (id, trackUid) => {
    if (!user || user.uid !== trackUid) {
      alert("You don’t have permission to delete this track");
      return;
    }
    try {
      await deleteDoc(doc(db, "tracks", id));
      alert("Track deleted");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete track");
    }
  };

  // ✅ Merge base + layer into one file
  const mergeTracks = async (customName) => {
    if (!baseTrack || !layerTrack) {
      alert("Both base and layer must be selected");
      return;
    }
    setUploading(true);
    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const [baseResponse, layerResponse] = await Promise.all([
        fetch(baseTrack),
        fetch(layerTrack),
      ]);
      const [baseArrayBuffer, layerArrayBuffer] = await Promise.all([
        baseResponse.arrayBuffer(),
        layerResponse.arrayBuffer(),
      ]);
      const [baseBuffer, layerBuffer] = await Promise.all([
        context.decodeAudioData(baseArrayBuffer),
        context.decodeAudioData(layerArrayBuffer),
      ]);

      const length = Math.max(baseBuffer.length, layerBuffer.length);
      const offlineContext = new OfflineAudioContext(
        baseBuffer.numberOfChannels,
        length,
        baseBuffer.sampleRate
      );

      const baseSource = offlineContext.createBufferSource();
      baseSource.buffer = baseBuffer;
      const layerSource = offlineContext.createBufferSource();
      layerSource.buffer = layerBuffer;

      baseSource.connect(offlineContext.destination);
      layerSource.connect(offlineContext.destination);

      baseSource.start(0);
      layerSource.start(0);

      const renderedBuffer = await offlineContext.startRendering();
      const mixedBlob = bufferToWave(renderedBuffer, length);

      // ✅ use custom name if provided
      const safeName =
  customName && customName.trim() !== ""
    ? customName
    : `merged-${Date.now()}`;

const file = new File([mixedBlob], `${safeName}.wav`, {
  type: "audio/wav",
});

      await handleUpload(file, "merged");
      alert("Tracks merged and uploaded!");
    } catch (error) {
      console.error("Merging failed:", error);
      alert("Failed to merge tracks");
    }
    setUploading(false);
  };

  // ✅ Convert audio buffer → WAV Blob
  const bufferToWave = (abuffer, len) => {
    const numOfChan = abuffer.numberOfChannels;
    const length = len * numOfChan * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
    const channels = [];
    let i, sample;
    let offset = 0;
    let pos = 0;

    function setUint16(data) {
      view.setUint16(pos, data, true);
      pos += 2;
    }
    function setUint32(data) {
      view.setUint32(pos, data, true);
      pos += 4;
    }

    setUint32(0x46464952);
    setUint32(length - 8);
    setUint32(0x45564157);
    setUint32(0x20746d66);
    setUint32(16);
    setUint16(1);
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan);
    setUint16(numOfChan * 2);
    setUint16(16);
    setUint32(0x61746164);
    setUint32(length - pos - 4);

    for (i = 0; i < abuffer.numberOfChannels; i++) {
      channels.push(abuffer.getChannelData(i));
    }

    while (pos < length) {
      for (i = 0; i < numOfChan; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
        view.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }
    return new Blob([buffer], { type: "audio/wav" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 px-6 md:px-20 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-3">
        🎤 Let’s Jam
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Upload a <span className="font-semibold">base track</span>, add your{" "}
        <span className="font-semibold">layer</span>, and merge them together.
      </p>

      {/* Upload Base Track */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-purple-700 mb-3">
          1️⃣ Upload Base Track
        </h2>
        <input
          type="file"
          accept="audio/*"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0 file:text-sm file:font-semibold
            file:bg-gradient-to-r file:from-purple-500 file:to-pink-500 file:text-white hover:file:opacity-90"
          ref={baseInputRef}
          onClick={(e) => {
            if (!user) {
              e.preventDefault(); // 🚫 stop file explorer
              alert("Please sign in to upload a base track");
            }
          }}
          onChange={(e) => handleUpload(e.target.files[0], "base")}
        />
      </div>

    {/* Upload Layer */}
<div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
  <h2 className="text-xl font-semibold text-purple-700 mb-3">
    2️⃣ Add Your Layer
  </h2>
  <input
    type="file"
    accept="audio/*"
    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0 file:text-sm file:font-semibold
      file:bg-gradient-to-r file:from-purple-500 file:to-pink-500 file:text-white hover:file:opacity-90"
    ref={layerInputRef}
    onClick={(e) => {
      if (!user) {
        e.preventDefault(); // stop file explorer
        alert("Please sign in to upload a layer track");
      } else if (!baseTrack) {
        e.preventDefault();
        alert("Please select or upload a base track first!");
      }
    }}
    onChange={(e) => handleUpload(e.target.files[0], "layer")}
  />
  {layerTrack && (
    <div className="mt-4">
      <p className="text-gray-700 font-medium">🎸 Your Layer Preview:</p>
      <div className="bg-purple-50 rounded-xl p-4 mt-2">
        <audio controls src={layerTrack} className="w-full" ref={layerAudioRef} />
      </div>
    </div>
  )}
</div>


      {/* Merge Tracks */}
      {user && baseTrack && layerTrack && (
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl shadow-inner mb-8">
          <h2 className="text-xl font-semibold text-yellow-700 mb-3">
            🔗 Merge Tracks
          </h2>
          <input
            type="text"
            placeholder="Enter name for merged track"
            value={mergeName}
            onChange={(e) => setMergeName(e.target.value)}
            className="mb-3 block w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={() => mergeTracks(mergeName)}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-400 text-white font-semibold hover:opacity-90"
          >
            Merge Base & Layer
          </button>
        </div>
      )}

      {/* Play Together */}
      {baseTrack && layerTrack && (
        <div className="bg-green-50 border border-green-200 p-6 rounded-2xl shadow-inner">
          <h2 className="text-xl font-semibold text-green-700 mb-3">
            🎶 Play Both Together
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow p-4">
              <audio
                controls
                src={baseTrack}
                className="w-full"
                ref={baseAudioRef}
              />
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <audio
                controls
                src={layerTrack}
                className="w-full"
                ref={layerAudioRef}
              />
            </div>
          </div>
        </div>
      )}

      {/* Library */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-purple-700 mb-3">
          🎵 Pick from Library
        </h2>
        {tracks.length === 0 ? (
          <p className="text-sm text-gray-500">No tracks uploaded yet.</p>
        ) : (
          tracks
            .filter((t) => t.type === "base" || t.type === "merged")
            .map((track) => (
              <div key={track.id} className="mb-6">
                <p className="font-medium">{track.name}</p>
                <span className="inline-block bg-purple-200 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                  {track.type}
                </span>
                <div className="bg-purple-50 rounded-xl p-4 mt-2">
                  <audio controls src={track.url} className="w-full" />
                </div>
                <button
                  onClick={() =>
                    user
                      ? setBaseTrack(track.url) // ✅ fixed
                      : alert("Please sign in to set a base track")
                  }
                  className="mt-3 px-5 py-2 rounded-full bg-purple-500 to-pink-500 text-white font-semibold hover:opacity-90"
                >
                  Use as Base
                </button>
                {user && user.uid === track.uid && (
                  <button
                    onClick={() => handleDelete(track.id, track.uid)}
                    className="mt-3 ml-2 px-5 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
        )}
      </div>

      {uploading && (
        <p className="text-purple-600 font-medium mt-6">
          Uploading / Processing...
        </p>
      )}
    </div>
  );
}
