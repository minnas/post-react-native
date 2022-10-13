import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import Button from "../tools/Button";
import { ButtonOptions } from "../tools/settings";
import { useNavigate } from "react-router-native";
import {
  faCircle,
  faFeatherPointed,
  faRainbow,
} from "@fortawesome/free-solid-svg-icons";
import { MyProfile } from "../types/types";
import { colors } from "../../styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { updateProfile } from "../../store/dataSlices";
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
  const days: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const icon = (index: number) =>
    page && page === index
      ? profile?.avatar?.icon || faFeatherPointed
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
          {days.map((index: number) => (
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
                  setPath("/info");
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
