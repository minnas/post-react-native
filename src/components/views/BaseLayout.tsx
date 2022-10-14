import React, { ReactNode, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
import Button from "@Tools/Button";
import { ButtonOptions, ButtonType } from "@Tools/settings";
import { colors } from "@Styles/colors";
import { useSelector } from "react-redux";
import { RootState } from "@Store/store";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

const BaseLayout = ({
  children,
  title,
  icon,
  bottonNavDisabled,
}: {
  children: ReactNode;
  title?: string;
  icon?: IconProp;
  bottonNavDisabled?: boolean;
}) => {
  const profile = useSelector((state: RootState) => state.profile);
  const myTitle = title || "Dummy Post App";
  const myIcon = icon || faSnowflake;
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(
    bottonNavDisabled ? false : true
  );

  const btnOptions = {
    color: "#000",
    noBorder: true,
    iconSize: 26,
  } as ButtonOptions;

  const profileAvatar = (icon: IconProp) => {
    return (
      <>
        <TouchableOpacity
          style={{
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            width: 52,
            height: 52,
          }}
          onPress={() => {
            navigate("/profile");
          }}
        >
          <FontAwesomeIcon icon={faCircle} size={52} />
          <FontAwesomeIcon
            icon={icon}
            size={38}
            style={{ position: "absolute", zIndex: 99 }}
          />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {profile?.avatar?.icon ? profileAvatar(profile?.avatar?.icon) : ""}
        <Text style={styles.title}>{myTitle}</Text>
        <FontAwesomeIcon icon={myIcon} size={32} />
      </View>
      <View
        style={!bottonNavDisabled ? styles.content : styles.contentNoBottomNav}
      >
        {children}
      </View>
      {!bottonNavDisabled ? (
        <View style={styles.footer}>
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
      ) : (
        ""
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: colors.APP_COLOR,
  },

  content: {
    flex: 4,
  },
  contentNoBottomNav: {
    flex: 5,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.APP_COLOR,
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
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
