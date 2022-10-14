import React, { useEffect, useState } from "react";
import { NativeRouter, Route, Routes } from "react-router-native";
import About from "@Views/About";
import Posts from "@Views/Posts";
import BaseLayout from "@Views/BaseLayout";
import {
  faBookAtlas,
  faBookmark,
  faLayerGroup,
  faNoteSticky,
  faUserNinja,
  faMehRollingEyes,
  faEarth,
  faClipboardQuestion,
  faUserAstronaut,
  faMoneyCheckDollar,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { Provider } from "react-redux";
import { default as store, persistor } from "./src/store/store";
import Bookmarks from "@Views/Bookmarks";
import Todos from "@Views/Todos";
import MyTodos from "@Views/MyTodos";
import MyMood from "@Views/MyMood";
import Profile from "@Views/Profile";
import Map from "@Views/Map";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from "@Tools/Spinner";
import { Asset } from "expo-asset";
import { View } from "react-native";
import TaskOfTheDay from "@Views/TaskOfTheDay";
import TasksStatus from "@Views/TasksStatus";
import Cover from "@Views/Cover";
import Info from "@Views/Info";

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
    require("./src/assets/bird-map-rotated.png"),
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
            <Route path="/" element={<Cover />} />
            <Route
              path="/profile"
              element={
                <BaseLayout
                  title="Avatar"
                  children={<Profile />}
                  icon={faUserAstronaut}
                  bottonNavDisabled={false}
                />
              }
            />
            <Route
              path="/about"
              element={
                <BaseLayout
                  title="Accordions"
                  icon={faInfo}
                  children={<About />}
                  bottonNavDisabled={false}
                />
              }
            />
            <Route
              path="/posts"
              element={
                <BaseLayout
                  title="Awesome Posts"
                  icon={faLayerGroup}
                  children={<Posts />}
                  bottonNavDisabled={false}
                />
              }
            />
            <Route
              path="/bookmarks"
              element={
                <BaseLayout
                  title="Awesome Bookmarks"
                  icon={faBookmark}
                  children={<Bookmarks />}
                  bottonNavDisabled={false}
                />
              }
            />
            <Route
              path="/todos"
              element={
                <BaseLayout
                  title="Awesome Todos"
                  icon={faNoteSticky}
                  children={<Todos />}
                  bottonNavDisabled={false}
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
                  bottonNavDisabled={false}
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
                  bottonNavDisabled={false}
                />
              }
            />
            <Route
              path="/map"
              element={
                <BaseLayout
                  title="Map"
                  icon={faEarth}
                  children={<Map />}
                  bottonNavDisabled={true}
                />
              }
            />
            <Route
              path="/day"
              element={
                <BaseLayout
                  title="Small todo"
                  icon={faClipboardQuestion}
                  children={<TaskOfTheDay />}
                  bottonNavDisabled={true}
                />
              }
            />
            <Route
              path="/end"
              element={
                <BaseLayout
                  title="Done/undo"
                  icon={faMoneyCheckDollar}
                  children={<TasksStatus />}
                  bottonNavDisabled={true}
                />
              }
            />
            <Route path="/info" element={<Info />} />
          </Routes>
        </PersistGate>
      </Provider>
    </NativeRouter>
  );
}
