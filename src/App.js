import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Profile from "./pages/Profile";
import ChatBot from "./pages/ChatBot";
import LandingPage from "./pages/landing";



function App() {
  const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user")));


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<Dashboard user={user} />}
        />
        <Route path="/history" element={<History user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/chat" element={<ChatBot user={user} />} />

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
