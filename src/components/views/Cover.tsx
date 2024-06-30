import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { colors } from "@Styles/colors";
import Button from "@Tools/Button";
import { ButtonType } from "@Tools/settings";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-native";
import { View as AnimatableView } from "react-native-animatable";

const Cover = ({}) => {
  const navigate = useNavigate();

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@Assets/birds.png")}
        style={styles.imageBg}
      >
        <View style={styles.content}>
          <AnimatableView animation="fadeInLeft" duration={800} delay={0}>
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  ...styles.header,
                  fontSize: 42,
                  textTransform: "uppercase",
                }}
              >
                One small App
              </Text>
              <Text style={{ ...styles.imgText }}>
                This is a small app done using react native and expo. Click
                arrow to continue
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type={ButtonType.ICON_ONLY}
                  icon={faArrowRight}
                  options={{ fontSize: 32, iconSize: 95, noBorder: true }}
                  onPress={() => {
                    navigate("/profile");
                  }}
                />
              </View>
            </View>
          </AnimatableView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 35,
  },
  imageBg: {
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  imgText: {
    color: colors.FONT_COLOR,
    fontSize: 24,
    lineHeight: 34,
    textAlign: "center",
  },
  content: {
    paddingHorizontal: 85,
    paddingVertical: 95,
    backgroundColor: colors.WHITE_OPACITY_8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Cover;
