import React, { useEffect, useState } from "react";
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
  faEarth
} from "@fortawesome/free-solid-svg-icons";
import { Provider } from "react-redux";
import { default as store, persistor } from "./src/store/store";
import Bookmarks from "./src/components/views/Bookmarks";
import Todos from "./src/components/views/Todos";
import MyTodos from "./src/components/views/MyTodos";
import MyMood from "./src/components/views/MyMood";
import Profile from "./src/components/views/Profile";
import Map from "./src/components/views/Map";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from "./src/components/tools/Spinner";
import { Asset } from "expo-asset";
import { View } from "react-native";
import TaskOfTheDay from "./src/components/views/TaskOfTheDay";

export default function App() {
  const useImages = (images: any) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      Asset.loadAsync(images)
        .then(() => setLoaded(true))
        .catch(setError);
    }, []);

    return [loaded, error];
  };

  const [imagesLoaded] = useImages([
    require("./src/assets/bird-map.png"),
    require("./src/assets/birds.png"),
    require("./src/assets/placeholder.png"),
  ]);

  if (!imagesLoaded) {
    return (
      <View>
        <Spinner />
      </View>
    );
  }

  return (
    <NativeRouter>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
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
            <Route
              path="/day"
              element={
                <BaseLayout
                  title="Exam for Today"
                  icon={faLayerGroup}
                  children={<TaskOfTheDay />}
                  bottonNavDisabled={true}
                />
              }
            />
          </Routes>
        </PersistGate>
      </Provider>
    </NativeRouter>
  );
}
