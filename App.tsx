import React from "react";
import { NativeRouter, Route, Routes } from "react-router-native";
import About from "./src/components/views/About";
import Posts from "./src/components/views/Posts";
import BaseLayout from "./src/components/views/BaseLayout";
import {
  faBookAtlas,
  faBookmark,
  faLayerGroup,
  faNoteSticky,
  faUserNinja,
  faMehRollingEyes,
  faEarth,
} from "@fortawesome/free-solid-svg-icons";
import { Provider } from "react-redux";
import store from "./src/store/store";
import Bookmarks from "./src/components/views/Bookmarks";
import Todos from "./src/components/views/Todos";
import MyTodos from "./src/components/views/MyTodos";
import MyMood from "./src/components/views/MyMood";
import Profile from "./src/components/views/Profile";
import Map from "./src/components/views/Map";

export default function App() {
  return (
    <NativeRouter>
      <Provider store={store}>
        <Routes>
          <Route
            path="/"
            element={<BaseLayout title="Profile" children={<Profile />} />}
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
          <Route
            path="/bookmarks"
            element={
              <BaseLayout
                title="Some Awesome Bookmarks"
                icon={faBookmark}
                children={<Bookmarks />}
              />
            }
          />
          <Route
            path="/todos"
            element={
              <BaseLayout
                title="Some Awesome Todos"
                icon={faNoteSticky}
                children={<Todos />}
              />
            }
          />
          <Route
            path="/my-todos"
            element={
              <BaseLayout
                title="My Todos"
                icon={faBookAtlas}
                children={<MyTodos />}
              />
            }
          />
          <Route
            path="/my-mood"
            element={
              <BaseLayout
                title="My Mood"
                icon={faMehRollingEyes}
                children={<MyMood />}
              />
            }
          />
          <Route
            path="/map"
            element={
              <BaseLayout title="Map" icon={faEarth} children={<Map />} />
            }
          />
        </Routes>
      </Provider>
    </NativeRouter>
  );
}
