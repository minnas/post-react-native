import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  faHome,
  faLayerGroup,
  faSnowflake,
  faInfo,
  faBookmark,
  faNoteSticky,
  faBookAtlas,
  faMehRollingEyes,
  faEarth,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigate } from "react-router-native";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Button from "../tools/Button";
import { ButtonOptions, ButtonType } from "../tools/settings";
import { colors } from "../../styles/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const BaseLayout = ({
  children,
  title,
  icon,
}: {
  children: ReactNode;
  title?: string;
  icon?: IconProp;
}) => {
  const profile = useSelector((state: RootState) => state.profile);
  const myTitle = title || "Dummy Post App";
  const myIcon = icon || faSnowflake;
  const navigate = useNavigate();

  const btnOptions = {
    color: "#000",
    noBorder: true,
  } as ButtonOptions;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {profile?.avatar?.icon ? (
          <FontAwesomeIcon icon={profile.avatar.icon} size={32} />
        ) : (
          ""
        )}
        <Text style={styles.title}>{myTitle}</Text>
        <FontAwesomeIcon icon={myIcon} size={32} />
      </View>
      <View style={styles.content}>{children}</View>
      <View style={styles.footer}>
        <View style={styles.footerButtons}>
          <Button
            onPress={() => {
              navigate("/");
            }}
            icon={faHome}
            type={ButtonType.ICON_ONLY}
            options={btnOptions}
          />
          <Button
            onPress={() => {
              navigate("/about");
            }}
            icon={faInfo}
            type={ButtonType.ICON_ONLY}
            options={btnOptions}
          />
          <Button
            onPress={() => {
              navigate("/posts");
            }}
            icon={faLayerGroup}
            type={ButtonType.ICON_ONLY}
            options={btnOptions}
          />
          <Button
            onPress={() => {
              navigate("/bookmarks");
            }}
            icon={faBookmark}
            type={ButtonType.ICON_ONLY}
            options={btnOptions}
          />
        </View>
        <View style={styles.footerButtons}>
          <Button
            onPress={() => {
              navigate("/todos");
            }}
            icon={faNoteSticky}
            type={ButtonType.ICON_ONLY}
            options={btnOptions}
          />
          <Button
            onPress={() => {
              navigate("/my-todos");
            }}
            icon={faBookAtlas}
            type={ButtonType.ICON_ONLY}
            options={btnOptions}
          />
          <Button
            onPress={() => {
              navigate("/my-mood");
            }}
            icon={faMehRollingEyes}
            type={ButtonType.ICON_ONLY}
            options={btnOptions}
          />
          <Button
            onPress={() => {
              navigate("/map");
            }}
            icon={faEarth}
            type={ButtonType.ICON_ONLY}
            options={btnOptions}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
  header: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.APP_COLOR,
  },

  content: {
    flex: 5,
  },
  footer: {
    flex: 1,
    flexDirection: "column",
    marginTop: "auto",
    backgroundColor: colors.APP_COLOR,
  },
  footerButtons: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  link: {
    color: "#b141ec",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  column: {
    flexDirection: "column",
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
});

export default BaseLayout;
