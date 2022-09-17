import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ButtonType } from "./settings";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface Props {
  title?: string;
  onPress: (event: GestureResponderEvent) => void;
  icon?: IconProp;
  type?: ButtonType;
  color?: string;
  disabled?: boolean;
  id?: string;
}

const Button: React.FC<Props> = ({
  title,
  onPress,
  icon,
  type,
  color,
  disabled,
  id,
}) => {
  const onlyIcon = type == ButtonType.ICON_ONLY;
  const btnColor = color || "#916ec9";

  const styles = StyleSheet.create({
    button: {
      elevation: 8,
      borderColor: btnColor,
      borderWidth: 2,
      borderRadius: 15,
      paddingVertical: 15,
      paddingHorizontal: 15,
    },
    btnText: {
      fontSize: 18,
      color: btnColor,
      fontWeight: "bold",
      alignSelf: "center",
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.button}
      disabled={disabled}
    >
      {onlyIcon ? "" : <Text style={styles.btnText}>{title}</Text>}
      {icon ? <FontAwesomeIcon color={btnColor} icon={icon} size={24} /> : ""}
    </TouchableOpacity>
  );
};

export default Button;
