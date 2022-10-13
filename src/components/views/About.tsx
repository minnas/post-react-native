import React from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Accordion from "../tools/Accordion";
import { colors } from "../../styles/colors";
import Park from "./../../assets/amusementpartk.svg";
import Chat from "./../../assets/chat.svg";
import Bubble from "./../../assets/hashtag-bubble.svg";
import Feedback from "./../../assets/feedback.svg";
import Button from "../tools/Button";
import { ButtonType } from "../tools/settings";

const About = ({}) => {
  const aboutInfo = (
    <View>
      <ImageBackground
        source={require("./../../assets/birds.png")}
        style={styles.imageBg}
      >
        <Text style={styles.imgText}>
          This is a simple dummy app for testing React native and some custom
          components
        </Text>
      </ImageBackground>
    </View>
  );

  const svgView = (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Park height={250} width={250} />
    </View>
  );

  const svgViewChat = (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Chat width={56} height={56} fill={colors.LIGHT_VIOLET_8} />
      <Bubble width={56} height={56} fill={colors.APP_COLOR} />
    </View>
  );

  const svgButton = (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        type={ButtonType.SVG}
        onPress={() => {}}
        options={{ backgroundColor: colors.LIGHT_VIOLET }}
        svg={<Feedback height={42} width={42} />}
      />
    </View>
  );

  return (
    <>
      <ScrollView>
        <Accordion label="About the App" children={aboutInfo} />
        <Accordion label="Svg Image" children={svgView} />
        <Accordion label="Svg Button" children={svgButton} />
        <Accordion label="Svg Chat" children={svgViewChat} />
      </ScrollView>
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
