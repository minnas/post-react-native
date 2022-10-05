import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../tools/Button";
import { ButtonOptions, ButtonType } from "../tools/settings";
import { colors } from "../../styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState, updateProfile } from "../../store/store";
import { avatars } from "../../api/api";
import { FaIcon, MyProfile } from "../types/types";

const Profile = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const [icon, setIcon] = useState(profile?.avatar);
  const [name, setName] = useState(profile?.name);

  const setProfile = () => {
    dispatch(
      updateProfile({
        avatar: icon,
        name,
      } as MyProfile)
    );
  };

  useEffect(() => {
    setProfile();
  }, [icon, name]);

  const renderAvatar = ({ item }: any) => {
    const curIcon = item as FaIcon;
    const iconSize = 54;
    const options = curIcon?.label === icon?.label ? {} : { noBorder: true };

    return (
      <View style={{ marginLeft: 15 }}>
        <Button
          type={ButtonType.ICON_ONLY}
          icon={curIcon?.icon}
          title={curIcon?.label}
          onPress={() => {
            setIcon(curIcon);
          }}
          options={{ ...options, iconSize } as ButtonOptions}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Text style={{ fontSize: 24, alignSelf: "center" }}>Set Profile</Text>
      </View>
      <View style={{ ...styles.inputRow }}>
        <TextInput
          value={name}
          style={styles.inputField}
          placeholder="your name"
          onChangeText={(text) => {
            setName(text);
          }}
        />
      </View>
      <View style={{ ...styles.inputRow, flex: 1, alignItems: "baseline" }}>
        <FlatList
          data={avatars}
          renderItem={renderAvatar}
          style={styles.avatarList}
          horizontal={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  inputRow: {
    width: "80%",
    margin: 15,
  },
  inputField: {
    padding: 5,
    height: 50,
    fontSize: 20,
    borderColor: colors.APP_COLOR,
    borderRadius: 15,
    borderWidth: 2,
  },
  avatarList: {
    alignSelf: "center",
  },
});

export default Profile;
