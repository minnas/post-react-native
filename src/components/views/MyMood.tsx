import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { colors } from "@Styles/colors";
import {
  faFaceAngry,
  faFaceSadCry,
  faSmileBeam,
  faFaceMehBlank,
} from "@fortawesome/free-regular-svg-icons";
import { FaIcon } from "@Types/types";
import Button from "@Tools/Button";
import { ButtonOptions, ButtonType } from "@Tools/settings";
import { View as AnimatableView } from "react-native-animatable";

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
      icon: faFaceMehBlank,
      label: "No Comments",
    } as FaIcon,
  ];
  const updateMood = (icon: FaIcon) => {
    setMood(icon.label);
  };

  const renderMood = (icon: FaIcon) => {
    const iconSize = 50;
    const options = mood === icon?.label ? {} : { noBorder: true };
    return (
      <Button
        type={ButtonType.ICON_ONLY}
        icon={icon?.icon}
        title={icon?.label}
        onPress={() => {
          updateMood(icon);
        }}
        options={{ ...options, iconSize } as ButtonOptions}
      />
    );
  };

  return (
    <>
      <View style={styles.textRow}>
        <Text style={styles.title}>How do you feel today</Text>
        <FontAwesomeIcon
          color={colors.FONT_COLOR}
          icon={faQuestion}
          size={32}
        />
      </View>
      <AnimatableView
        style={styles.moodRow}
        animation="fadeInLeft"
        duration={800}
        delay={0}
      >
        {moods.map((icon: FaIcon, index: number) => (
          <View
            key={index + 1}
            style={{ paddingVertical: 10, paddingHorizontal: 5 }}
          >
            {renderMood(icon)}
          </View>
        ))}
      </AnimatableView>
      <View style={styles.textRow}>
        <Text style={{ fontSize: 32, fontStyle: "italic" }}>{mood}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderBottomColor: colors.APP_COLOR,
    borderBottomWidth: 2,
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 2,
  },
});

export default MyMood;
