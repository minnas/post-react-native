import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Accordion from "@Tools/Accordion";
import { colors } from "@Styles/colors";
import Park from "@Assets/amusementpartk.svg";
import Chat from "@Assets/chat.svg";
import Bubble from "@Assets/hashtag-bubble.svg";
import Feedback from "@Assets/feedback.svg";
import Button from "@Tools/Button";
import { ButtonType } from "@Tools/settings";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBookAtlas,
  faBookmark,
  faEarth,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const About = ({}) => {
  enum blockType {
    BOOKMARKS,
    TODOS,
    MAP,
  }
  const [infos, setInfos] = useState([] as blockType[]);
  useEffect(() => {
    setInfos([blockType.MAP, blockType.BOOKMARKS, blockType.TODOS]);
  }, []);

  const iconAndText = (icon: IconProp, text: string) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <FontAwesomeIcon
          color={colors.BLACK_OPACITY_6}
          icon={icon}
          size={32}
          style={{ marginRight: 10 }}
        />
        <Text style={{ ...styles.imgText, fontSize: 22 }}>{text}</Text>
      </View>
    );
  };

  const infoBlock = (type: blockType) => {
    if (type === blockType.MAP) return iconAndText(faEarth, "Map of the tasks");
    if (type === blockType.BOOKMARKS)
      return iconAndText(faBookmark, "My bookmarks");
    if (type === blockType.TODOS) return iconAndText(faBookAtlas, "My todos");
    return "";
  };

  const aboutInfo = (
    <View>
      <ImageBackground
        source={require("@Assets/birds.png")}
        style={styles.imageBg}
      >
        <View style={styles.textLayer}>
          <Text style={styles.imgText}>
            This is a simple dummy app for testing React native and some custom
            components.
          </Text>
          <View
            style={{
              borderTopColor: colors.LIGHT_VIOLET_8,
              borderTopWidth: 2,
              paddingTop: 15,
            }}
          >
            {infos.map((index: blockType) => (
              <View key={index}>{infoBlock(index)}</View>
            ))}
          </View>
        </View>
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
    <ScrollView>
      <Accordion label="About the App" children={aboutInfo} />
      <Accordion label="Svg Image" children={svgView} />
      <Accordion label="Svg Button" children={svgButton} />
      <Accordion label="Svg Chat" children={svgViewChat} />
    </ScrollView>
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
  textLayer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: colors.WHITE_OPACITY_6,
  },
  imgText: {
    color: colors.FONT_COLOR,
    fontSize: 24,
    lineHeight: 34,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default About;
