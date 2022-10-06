import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import Accordion from "../tools/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { colors } from "../../styles/colors";
const duck = require("./../../assets/duck.png");

const About = ({}) => {
  const aboutInfo = (
    <View>
      <ImageBackground source={duck} style={styles.imageBg}>
        <Text style={styles.imgText}>
          This is a simple dummy app for testing React native and some custom
          components
        </Text>
      </ImageBackground>
    </View>
  );
  return (
    <>
      <View style={styles.row}>
        <Text style={styles.title}>This is an about page for the app</Text>
        <FontAwesomeIcon color={colors.FONT_COLOR} icon={faInfo} size={32} />
      </View>
      <View style={styles.column}>
        <Accordion label="Toggle About Info" children={aboutInfo} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 25,
    borderBottomColor: colors.APP_COLOR,
    borderBottomWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imageBg: {
    resizeMode: "cover",
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  imgText: {
    color: colors.FONT_COLOR,
    fontSize: 24,
    lineHeight: 34,
    textAlign: "center",
    paddingHorizontal: 5,
    backgroundColor: colors.WHITE_OPACITY_6,
  },
});

export default About;
