import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import Accordion from "../tools/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { colors } from "../../styles/colors";

const About = ({}) => {
  const aboutInfo = (
    <Text style={{ fontSize: 20 }}>
      This is a simple dummy app for testing React native and some custom
      components
    </Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>This is an about page for the app</Text>
        <FontAwesomeIcon color={colors.FONT_COLOR} icon={faInfo} size={32} />
      </View>
      <View style={styles.column}>
        <Accordion label="Toggle About Info" children={aboutInfo} />
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
    paddingHorizontal: 15,
  },
});

export default About;
