// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Music } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [myTracks, setMyTracks] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const q = query(
          collection(db, "tracks"),
          where("uid", "==", currentUser.uid)
        );
        const unsubTracks = onSnapshot(q, (snap) => {
          setMyTracks(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubTracks();
      } else {
        setMyTracks([]);
      }
    });

    return () => unsubAuth();
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).catch((error) => {
      console.error("Sign-out error:", error);
    });
  };

  if (!user) {
    return (
      <p className="text-center text-gray-600 mt-10">
        Please sign in to see your profile.
      </p>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white/40 rounded-3xl shadow-xl backdrop-blur-lg border border-white/20 mt-10">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-6">
       <h2 className="text-2xl font-extrabold text-gray-800">
          {user.displayName || "My"}'s Profile
        </h2>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-800 rounded-full shadow hover:bg-gray-300 transition"

        >
          Sign Out
        </button>
      </div>

      {/* User Info */}
      <div className="mb-8 text-center">
        {user.photoURL && (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto border-4 border-purple-300 shadow-md"
          />
        )}
        <p className="mt-2 text-gray-700 font-semibold">{user.email}</p>
      </div>

      {/* Uploads */}
      <h3 className="text-lg font-bold mb-4 text-purple-700 flex items-center gap-2">
        <Music className="w-5 h-5 text-pink-500" /> My Uploads
      </h3>

      {myTracks.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No uploads yet 🎶</p>
      ) : (
        <div className="space-y-4">
          {myTracks.map((track) => (
            <div
              key={track.id}
              className="p-4 rounded-xl bg-gradient-to-r from-purple-50 via-white to-pink-50 border border-purple-200 shadow hover:shadow-lg transition"
            >
              <p className="font-medium text-gray-800">{track.name}</p>
              <audio controls src={track.url} className="w-full mt-2 rounded-lg" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
