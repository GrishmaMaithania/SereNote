// src/components/Auth.js
import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Auth({ onClose }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        onClose?.(); // close dropdown after login
        navigate("/profile"); // redirect to profile
      }
    });
    return () => unsubscribe();
  }, [navigate, onClose]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
      alert("Google login failed!");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // redirect to home
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-56 bg-white rounded-lg shadow-lg py-3 px-4">
      {user ? (
        <div className="text-center">
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="profile"
              className="w-12 h-12 mx-auto rounded-full mb-2"
            />
          )}
          <p className="text-sm text-gray-700 mb-3">
            Hi, {user.displayName}
          </p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
      )}
    </div>
  );
}
