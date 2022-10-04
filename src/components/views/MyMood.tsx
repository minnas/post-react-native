import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { faQuestion, faSmoking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { colors } from "../../styles/colors";
import {
  faFaceAngry,
  faFaceSadCry,
  faSmileBeam,
} from "@fortawesome/free-regular-svg-icons";
import { FaIcon } from "../types/types";
import Button from "../tools/Button";
import { ButtonOptions, ButtonType } from "../tools/settings";

const MyMood = ({}) => {
  const [mood, setMood] = useState("");

  const moods = [
    {
      icon: faFaceAngry,
      label: "I am Angry",
    } as FaIcon,
    {
      icon: faFaceSadCry,
      label: "I am sad and Crying",
    } as FaIcon,
    {
      icon: faSmileBeam,
      label: "I am Happy",
    } as FaIcon,
    {
      icon: faSmoking,
      label: "No Comments",
    } as FaIcon,
  ];
  const updateMood = (icon: FaIcon) => {
    setMood(icon.label);
  };

  const renderMood = ({ item }: any) => {
    const icon = item as FaIcon;
    const iconSize = 32;
    const options = mood === icon?.label ? {} : { noBorder: true };
    return (
      <View style={{ marginLeft: 15 }}>
        <Button
          type={ButtonType.ICON_ONLY}
          icon={icon?.icon}
          title={icon?.label}
          onPress={() => {
            updateMood(icon);
          }}
          options={{ ...options, iconSize } as ButtonOptions}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>How do you feel today</Text>
        <FontAwesomeIcon
          color={colors.FONT_COLOR}
          icon={faQuestion}
          size={32}
        />
      </View>
      <View style={styles.row}>
        <FlatList
          data={moods}
          renderItem={renderMood}
          horizontal={true}
          style={styles.moodList}
        />
      </View>
      <View style={{ ...styles.row, flex: 3 }}>
        <Text style={{ ...styles.title, alignSelf: "flex-end" }}>{mood}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: "5%",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderBottomColor: colors.APP_COLOR,
    borderBottomWidth: 2,
  },
  column: {
    flexDirection: "column",
    paddingVertical: 25,
    flex: 2,
    paddingHorizontal: 15,
    marginVertical: 25,
  },
  moodList: {
    marginHorizontal: 5,
    maxHeight: 80,
    padding: 5,
    width: 300,
  },
});

export default MyMood;
