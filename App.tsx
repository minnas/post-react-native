import React from "react";
import Profi from "./src/components/views/Profi";
import { NativeRouter, Route, Routes } from "react-router-native";
import About from "./src/components/views/About";
import Posts from "./src/components/views/Posts";

export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<Profi name="Minna" />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </NativeRouter>
  );
}
