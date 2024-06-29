import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Button from "@Tools/Button";
import { ButtonOptions } from "@Tools/settings";
import { useNavigate } from "react-router-native";
import {
  faCircle,
  faFeatherPointed,
  faRainbow,
} from "@fortawesome/free-solid-svg-icons";
import { MyProfile } from "@Types/types";
import { colors } from "@Styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@Store/store";
import { updateProfile } from "@Store/dataSlices";
import { fetchTask } from "@Api/api";
import { Task } from "@Api/type";
const map = require("@Assets/bird-map.png");

const Map = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const [page, setPage] = useState(profile?.page);
  const [path, setPath] = useState("");
  const [pages, setPages] = useState([] as number[]);

  useEffect(() => {
    const tasks = fetchTask() as Task[];
    setPages(
      tasks.map((task: Task, index: number) => {
        return index + 1;
      })
    );
  }, []);

  const setProfile = () => {
    dispatch(
      updateProfile({
        page,
      } as MyProfile)
    );
  };

  useEffect(() => {
    setProfile();
  }, [page]);

  useEffect(() => {
    navigate(path);
  }, [path]);

  const icon = (index: number) =>
    page && page === index
      ? profile?.avatar?.icon ?? faFeatherPointed
      : faCircle;

  const options = (index: number) => {
    if (page && page === index) {
      return {
        iconSize: 58,
        backgroundColor: colors.BLACK_OPACITY_6,
        color: colors.WHITE_OPACITY_8,
      };
    }
    return {
      iconSize: 42,
      color: colors.BLACK_OPACITY_8,
    };
  };

  return (
    <>
      <ImageBackground source={map} style={styles.imageBg}>
        <View style={styles.mapIcons}>
          {pages.map((index: number) => (
            <View
              key={index}
              style={{
                padding: 15,
              }}
            >
              <Button
                icon={icon(index)}
                title={index.toString()}
                onPress={() => {
                  setPage(index);
                  if (!(profile.disableInfo === true)) {
                    setPath("/info");
                  } else {
                    setPath("/day");
                  }
                }}
                options={
                  {
                    backgroundColor: colors.WHITE_OPACITY_2,
                    ...options(index),
                  } as ButtonOptions
                }
              />
            </View>
          ))}
          <View
            style={{
              padding: 15,
            }}
          >
            <Button
              icon={faRainbow}
              onPress={() => {
                setPath("/end");
              }}
              title="Result"
              options={
                {
                  backgroundColor: colors.WHITE_OPACITY_6,
                  color: colors.APP_COLOR,
                  iconSize: 52,
                } as ButtonOptions
              }
            />
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  mapIcons: {
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default Map;
