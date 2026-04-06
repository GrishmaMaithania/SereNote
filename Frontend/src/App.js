import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Voice from "./Components/Voice";
import Theory from "./Components/Theory";
import Jam from "./Components/jam";
import Chords from "./Components/chords";
import Auth from "./Components/Auth";
import Navbar from "./Components/Navbar"; 
import Profile from "./Components/Profile";

function App() {
  return (
    <Router>
      <Navbar />  {/* Navbar added here so it's visible on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/voice" element={<Voice />} />
        <Route path="/theory" element={<Theory />} />
        <Route path="/jam" element={<Jam />} />
        <Route path="/chords" element={<Chords />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
