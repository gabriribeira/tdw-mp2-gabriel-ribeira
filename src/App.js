import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import Artist from "./pages/Artist";
import Album from "./pages/Album";
import Meems from "./pages/Meems";
import Profile from "./pages/Profile";

function App() {
  useEffect(() => {
    document.title = "MEEM";
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/meems" element={<Meems />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
