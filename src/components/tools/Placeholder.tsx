import React from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
} from "react-native";
import { colors } from "@Styles/colors";

interface Props {
  text?: string;
  image?: ImageSourcePropType;
}
const Placeholder: React.FC<Props> = ({ text, image }) => {
  const styles = StyleSheet.create({
    image: {
      flex: 1,
      resizeMode: "cover",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 200,
      minWidth: 250,
      marginTop: 5,
    },
    text: {
      color: colors.FONT_COLOR,
      fontSize: 24,
      lineHeight: 34,
      textAlign: "center",
      paddingHorizontal: 5,
      backgroundColor: colors.WHITE_OPACITY_6,
    },
  });

  return (
    <ImageBackground style={styles.image} source={image}>
      {text ? <Text style={styles.text}>{text}</Text> : ""}
    </ImageBackground>
  );
};

export default Placeholder;
