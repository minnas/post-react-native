import {
  faCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { ToastOptions, ToastType } from "./settings";
import { colors } from "@Styles/colors";

interface Props {
  content?: string;
  type?: ToastType;
  hide?: (event: GestureResponderEvent) => void;
  options?: ToastOptions;
}
const Toast: React.FC<Props> = ({ content, type, hide, options }) => {
  const icon =
    type && type == ToastType.ERROR ? faExclamationTriangle : faCheck;
  const color =
    type && type == ToastType.ERROR ? colors.ERROR_COLOR : colors.SUCCESS_COLOR;

  const styles = StyleSheet.create({
    toast: {
      elevation: 8,
      borderColor: color,
      borderLeftWidth: 8,
      borderTopWidth: 2,
      borderRadius: 5,
      paddingVertical: 15,
      paddingHorizontal: 15,
      position: "absolute",
      top: options?.top || -50,
      left: options?.left || -100,
      zIndex: 4,
      backgroundColor: "rgba(145, 110, 201, .6)",
      flexDirection: "row",
    },
    text: {
      color: "#000",
      fontSize: 24,
    },
  });

  return (
    <TouchableOpacity onPress={hide} style={styles.toast}>
      <FontAwesomeIcon color={color} icon={icon} size={24} />
      {content ? <Text style={styles.text}>{content}</Text> : ""}
    </TouchableOpacity>
  );
};

export default Toast;
