import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Accordion from "../tools/Accordion";
import { colors } from "../../styles/colors";
const birds = require("./../../assets/birds.png");

const About = ({}) => {
  const aboutInfo = (
    <View>
      <ImageBackground source={birds} style={styles.imageBg}>
        <Text style={styles.imgText}>
          This is a simple dummy app for testing React native and some custom
          components
        </Text>
      </ImageBackground>
    </View>
  );
  return (
    <>
      <View style={styles.column}>
        <Accordion label="About the App" children={aboutInfo} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imageBg: {
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
    padding: 35,
  },
  imgText: {
    color: colors.FONT_COLOR,
    fontSize: 24,
    lineHeight: 34,
    textAlign: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: colors.WHITE_OPACITY_6,
  },
});

export default About;
