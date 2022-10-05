import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Button from "../tools/Button";
import { ButtonOptions } from "../tools/settings";
import { useNavigate } from "react-router-native";
import { faCloud, faStar, faBookDead } from "@fortawesome/free-solid-svg-icons";
import { MapIcon } from "../types/types";
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
  ];

  return (
    <View style={styles.container}>
      <ImageBackground source={map} style={styles.imageBg}>
        <View style={{ flex: 2, width: "100%" }}>
          {icons.map((mapIcon: MapIcon, index: number) => (
            <View
              key={index + 1}
              style={{
                marginLeft: (index + 1) * 57,
                marginTop: 52,
                width: 100,
              }}
            >
              <Button
                icon={mapIcon.icon}
                title={mapIcon.label}
                onPress={() => {
                  navigate(mapIcon.path);
                }}
                options={{ noBorder: true, iconSize: 62 } as ButtonOptions}
              />
            </View>
          ))}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
  },
});

export default Map;
