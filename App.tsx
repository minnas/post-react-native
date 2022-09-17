import React from "react";
import Profi from "./src/components/views/Profi";
import { NativeRouter, Route, Routes } from "react-router-native";
import About from "./src/components/views/About";
import Posts from "./src/components/views/Posts";
import BaseLayout from "./src/components/views/BaseLayout";
import { faLayerGroup, faUserNinja } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route
          path="/"
          element={<BaseLayout children={<Profi name="Minna" />} />}
        />
        <Route
          path="/about"
          element={
            <BaseLayout title="About" icon={faUserNinja} children={<About />} />
          }
        />
        <Route
          path="/posts"
          element={
            <BaseLayout
              title="Some Awesome Posts"
              icon={faLayerGroup}
              children={<Posts />}
            />
          }
        />
      </Routes>
    </NativeRouter>
  );
}
