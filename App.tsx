import React from "react";
import Profi from "./src/components/views/Profi";
import { NativeRouter, Route, Routes } from "react-router-native";
import About from "./src/components/views/About";
import Posts from "./src/components/views/Posts";
import BaseLayout from "./src/components/views/BaseLayout";
import { faLayerGroup, faUserNinja } from "@fortawesome/free-solid-svg-icons";
import { Provider } from "react-redux";
import store from "./src/store/store";

export default function App() {
  return (
    <NativeRouter>
      <Provider store={store}>
        <Routes>
          <Route
            path="/"
            element={<BaseLayout children={<Profi name="Minna" />} />}
          />
          <Route
            path="/about"
            element={
              <BaseLayout
                title="About"
                icon={faUserNinja}
                children={<About />}
              />
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
      </Provider>
    </NativeRouter>
  );
}
