import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { ReactNode, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../styles/colors";

interface Props {
  label?: string;
  color?: string;
  children?: ReactNode;
}
const Accordion: React.FC<Props> = ({ label, color, children }) => {
  const [open, setOpen] = useState(false);
  const icon = open ? faChevronUp : faChevronDown;
  const labelColor = color || colors.APP_COLOR;

  const toggle = () => {
    setOpen(!open);
  };

  const styles = StyleSheet.create({
    content: {
      display: "flex",
      flexDirection: "column",
      width: 250,
      position: "relative",
    },
    label: {
      fontSize: 24,
      fontWeight: "bold",
    },
    toggler: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      color: labelColor,
      fontSize: 24,
      height: 50,
      position: "absolute",
      zIndex: 5,
      width: 250,
    },
  });

  return (
    <View style={styles.content}>
      <TouchableOpacity onPress={toggle} style={styles.toggler}>
        {label ? <Text style={styles.label}>{label}</Text> : ""}
        <FontAwesomeIcon color={labelColor} icon={icon} size={32} />
      </TouchableOpacity>
      {open ? (
        <View
          style={{
            ...styles.content,
            position: "absolute",
            top: 50,
            zIndex: 5,
          }}
        >
          {children ? children : ""}
        </View>
      ) : (
        ""
      )}
    </View>
  );
};

export default Accordion;
