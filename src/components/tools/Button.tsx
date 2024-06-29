import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ButtonOptions, ButtonType } from "./settings";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { colors } from "@Styles/colors";

interface Props {
  title?: string;
  onPress: (event: GestureResponderEvent) => void;
  icon?: IconProp;
  type?: ButtonType;
  disabled?: boolean;
  options?: ButtonOptions;
  svg?: ReactNode;
}

const Button: React.FC<Props> = ({
  title,
  onPress,
  icon,
  type,
  disabled,
  options,
  svg,
}) => {
  const onlyIcon = type == ButtonType.ICON_ONLY;
  const btnColor = options?.color ?? colors.APP_COLOR;
  const btnBorderColor = options?.noBorder ? "transparent" : btnColor;
  const iconSize = options?.iconSize ?? 24;
  const bgColor = options?.backgroundColor ?? "transparent";
  const fontSize = options?.fontSize ?? 18;

  const styles = StyleSheet.create({
    button: {
      elevation: 8,
      borderColor: btnBorderColor,
      borderWidth: 2,
      borderRadius: 15,
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: bgColor,
      maxWidth: 200,
    },
    btnText: {
      fontSize,
      color: btnColor,
      fontWeight: "bold",
      alignSelf: "center",
      flexWrap: "wrap",
    },
  });

  return (
    <Pressable onPress={onPress} style={styles.button} disabled={disabled}>
      {onlyIcon ?? !title ? "" : <Text style={styles.btnText}>{title}</Text>}
      {icon && <FontAwesomeIcon color={btnColor} icon={icon} size={iconSize} />}
      {svg ? svg : ""}
    </Pressable>
  );
};

export default Button;
