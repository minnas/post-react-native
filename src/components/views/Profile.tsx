import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../tools/Button";
import { ButtonOptions, ButtonType } from "../tools/settings";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { avatars } from "../../api/api";
import { FaIcon, MyProfile } from "../types/types";
import { colors } from "../../styles/colors";
import { updateProfile } from "../../store/dataSlices";
import Koira from "./../../assets/Koira.svg";

const Profile = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const [icon, setIcon] = useState(profile?.avatar);

  const setProfile = () => {
    dispatch(
      updateProfile({
        avatar: icon,
      } as MyProfile)
    );
  };

  useEffect(() => {
    setProfile();
  }, [icon]);

  const avatarBtn = (curIcon: FaIcon) => {
    const iconSize = 54;
    const options: ButtonOptions =
      curIcon?.label === icon?.label
        ? { backgroundColor: colors.BLACK_OPACITY_2 }
        : {};

    return (
      <Button
        type={ButtonType.ICON_ONLY}
        icon={curIcon?.icon}
        title={curIcon?.label}
        onPress={() => {
          setIcon(curIcon);
        }}
        options={{ ...options, iconSize }}
      />
    );
  };

  const svgButton = () => {
    return (
      <Button
        type={ButtonType.SVG}
        onPress={() => {
          console.log("Hi there, Dog here only!");
        }}
        options={{ backgroundColor: colors.FONT_COLOR }}
        svg={<Koira style={{ width: 54, height: 54 }} />}
      />
    );
  };
  return (
    <>
      <View style={styles.title}>
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>Select Avatar</Text>
      </View>
      <View style={styles.avatarList}>
        {avatars.map((icon: FaIcon, index: number) => (
          <View
            key={index + 1}
            style={{ paddingVertical: 10, paddingHorizontal: 5 }}
          >
            {avatarBtn(icon)}
          </View>
        ))}
        <View style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
          {svgButton()}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarList: {
    flex: 3,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default Profile;
