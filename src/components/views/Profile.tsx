import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "@Tools/Button";
import { ButtonOptions, ButtonType } from "@Tools/settings";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@Store/store";
import { avatars } from "@Api/api";
import { FaIcon, MyProfile } from "@Types/types";
import { colors } from "@Styles/colors";
import { updateProfile } from "@Store/dataSlices";
import { View as AnimatableView } from "react-native-animatable";

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

  return (
    <>
      <View style={styles.title}>
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>Select Avatar</Text>
      </View>
      <AnimatableView
        style={styles.avatarList}
        animation="fadeInLeft"
        duration={800}
        delay={0}
      >
        {avatars.map((icon: FaIcon, index: number) => (
          <View
            key={index + 1}
            style={{ paddingVertical: 10, paddingHorizontal: 5 }}
          >
            {avatarBtn(icon)}
          </View>
        ))}
      </AnimatableView>
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
