import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Switch, Text, View } from "react-native";
import { colors } from "@Styles/colors";
import Button from "@Tools/Button";
import { ButtonType } from "@Tools/settings";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-native";
import { View as AnimatableView } from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@Store/store";
import { updateProfile } from "@Store/dataSlices";
import { MyProfile } from "@Types/types";

const Info = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const [disableInfo, setDisableInfo] = useState(profile?.disableInfo || false);

  const toggleInfoDisabled = () => {
    dispatch(
      updateProfile({
        disableInfo,
      } as MyProfile)
    );
  };

  useEffect(() => {
    toggleInfoDisabled();
  }, [disableInfo]);

  return (
    <>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("@Assets/birds.png")}
          style={styles.imageBg}
        >
          <View style={styles.content}>
            <AnimatableView animation="fadeInRight" duration={800} delay={0}>
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    ...styles.header,
                    fontSize: 42,
                    textTransform: "uppercase",
                  }}
                >
                  Info
                </Text>
                <Text style={{ ...styles.imgText }}>
                  Lorem ipsum dolor sit amet. Click arrow to continue
                </Text>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type={ButtonType.ICON_ONLY}
                    icon={faArrowRight}
                    options={{ fontSize: 32, iconSize: 95, noBorder: true }}
                    onPress={() => {
                      navigate("/day");
                    }}
                  />
                  <AnimatableView
                    animation="fadeInLeft"
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: 120,
                    }}
                    duration={800}
                    delay={800}
                  >
                    <Text style={{ fontStyle: "italic", fontSize: 20 }}>
                      {disableInfo ? "Hide" : "Show"}
                    </Text>
                    <Switch
                      thumbColor={colors.APP_COLOR}
                      value={disableInfo}
                      trackColor={{
                        false: colors.LIGHT_VIOLET_8,
                        true: colors.LIGHT_VIOLET_6,
                      }}
                      onChange={() => setDisableInfo(!disableInfo)}
                    />
                  </AnimatableView>
                </View>
              </View>
            </AnimatableView>
          </View>
        </ImageBackground>
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

export default Info;
