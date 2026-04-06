// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Auth from "./Auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="flex justify-between items-center py-2 px-8 bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-gray-200 font-medium shadow-md relative">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src="/image-removebg-preview (14).png"
          alt="Serenote Logo"
          className="h-14 w-auto"
        />
        <span className="text-2xl font-extrabold font-serif tracking-wide text-white">
          Serenote
        </span>
      </Link>

      {/* Navigation Links */}
      <ul className="flex gap-6 items-center text-base">
        <li><Link to="/" className="hover:text-yellow-200">Home</Link></li>
        <li><Link to="/chords" className="hover:text-yellow-200">Chords</Link></li>
        <li><Link to="/theory" className="hover:text-yellow-200">Theory</Link></li>
        <li><Link to="/jam" className="hover:text-yellow-200">Jam</Link></li>
        <li><Link to="/voice" className="hover:text-yellow-200">Sing</Link></li>
      </ul>

      {/* Auth/Profile Section */}
      <div className="relative">
        {user ? (
          <Link to="/profile">
            <button className="bg-white text-purple-800 font-semibold px-4 py-1 rounded-full hover:bg-gray-200 transition">
              Profile
            </button>
          </Link>
        ) : (
          <>
            <button
              onClick={() => setShowAuth(!showAuth)}
              className="bg-white text-purple-800 font-semibold px-4 py-1 rounded-full hover:bg-gray-200 transition"
            >
              Sign in / Login
            </button>
            {showAuth && (
              <div className="absolute right-0 mt-2 z-50">
                <Auth onClose={() => setShowAuth(false)} />
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
