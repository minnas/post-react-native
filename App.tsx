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
  faEarth,
  faClipboardQuestion,
  faUserAstronaut,
  faMoneyCheckDollar,
  faInfo,
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
import TasksStatus from "./src/components/views/TasksStatus";
import Cover from "./src/components/views/Cover";
import Info from "./src/components/views/Info";

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
