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
  const color = type && type == ToastType.ERROR ? "#ff0000" : "#00ff00";

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
      top: -50,
      left: -100,
      zIndex: 4,
      backgroundColor: "rgba(255, 255, 255,.6)",
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
