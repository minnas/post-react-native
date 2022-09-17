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
import { ToastType } from "./settings";

interface Props {
  content?: string;
  type?: ToastType;
  hide?: (event: GestureResponderEvent) => void;
}

const Toast: React.FC<Props> = ({ content, type, hide }) => {
  const icon =
    type && type == ToastType.ERROR ? faExclamationTriangle : faCheck;
  const color =
    type && type == ToastType.ERROR ? "rgb(255, 0, 0)" : "rgb(0, 255, 0)";
  const bgColor =
    type && type == ToastType.ERROR
      ? "rgba(255, 0, 0, .5)"
      : "rgba(0, 255, .5)";

  const styles = StyleSheet.create({
    toast: {
      elevation: 8,
      borderColor: color,
      borderWidth: 2,
      borderRadius: 15,
      paddingVertical: 15,
      paddingHorizontal: 15,
      shadowOpacity: 0.5,
      backgroundColor: bgColor,
      width: "50%",
    },
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={hide} style={styles.toast}>
      <FontAwesomeIcon color={color} icon={icon} size={24} />
      {content ? <Text>{content}</Text> : ""}
    </TouchableOpacity>
  );
};

export default Toast;
