import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import Button from "../tools/Button";
import { ButtonOptions } from "../tools/settings";
import { useNavigate } from "react-router-native";
import {
  faCircle,
  faFeatherPointed
} from "@fortawesome/free-solid-svg-icons";
import { MapIcon, MyProfile } from "../types/types";
import { colors } from "../../styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState, updateProfile } from "../../store/store";
const map = require("./../../assets/bird-map.png");

const Map = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const [page, setPage] = useState(profile?.page);
  const [path, setPath] = useState("");

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

  const icons: MapIcon[] = [
    {
      label: "Day 1",
      path: "/",
    },
    { label: "Day 2", path: "/posts" },
    { label: "Day 3", path: "/bookmarks" },
    { label: "Day 4", path: "/todos" },
    { label: "Day 5", path: "/my-todos" },
    { label: "Day 6", path: "/my-mood" },
  ];

  const icon = (index: number) =>
    page && page === index ? (profile?.avatar?.icon || faFeatherPointed) : faCircle;
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
          <View style={{ paddingVertical: 5 }}>
            <Text style={{ fontSize: 24, fontStyle: "italic" }}>
              On Day {page}
            </Text>
          </View>
          {icons.map((mapIcon: MapIcon, index: number) => (
            <View
              key={index + 1}
              style={{
                padding: 15,
              }}
            >
              <Button
                icon={icon(index + 1)}
                title={mapIcon.label}
                onPress={() => {
                  setPage(index + 1);
                  setPath(mapIcon.path);
                }}
                options={
                  {
                    backgroundColor: colors.WHITE_OPACITY_2,
                    ...options(index + 1),
                  } as ButtonOptions
                }
              />
            </View>
          ))}
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
