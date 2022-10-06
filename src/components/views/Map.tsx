import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Button from "../tools/Button";
import { ButtonOptions } from "../tools/settings";
import { useNavigate } from "react-router-native";
import {
  faCloud,
  faStar,
  faBookDead,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { MapIcon } from "../types/types";
import { colors } from "../../styles/colors";
const map = require("./../../assets/bird-map.png");

const Map = () => {
  const navigate = useNavigate();
  const icons: MapIcon[] = [
    {
      icon: faStar,
      label: "Profile",
      path: "/",
    },
    { icon: faCloud, label: "Mood", path: "/my-mood" },
    { icon: faBookDead, label: "My Todos", path: "/my-todos" },
    { icon: faBookmark, label: "My Bookmarks", path: "/bookmarks" },
  ];

  return (
    <>
      <ImageBackground source={map} style={styles.imageBg}>
        <View style={styles.mapIcons}>
          {icons.map((mapIcon: MapIcon, index: number) => (
            <View
              key={index + 1}
              style={{
                padding: 15,
              }}
            >
              <Button
                icon={mapIcon.icon}
                title={mapIcon.label}
                onPress={() => {
                  navigate(mapIcon.path);
                }}
                options={
                  {
                    noBorder: true,
                    iconSize: 62,
                    color: colors.BLACK_OPACITY_8,
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
