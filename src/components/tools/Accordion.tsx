import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { ReactNode, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@Styles/colors";

interface Props {
  label?: string;
  color?: string;
  children?: ReactNode;
}
const Accordion: React.FC<Props> = ({ label, color, children }) => {
  const [open, setOpen] = useState(false);
  const icon = open ? faChevronUp : faChevronDown;
  const labelColor = color ?? colors.APP_COLOR;

  const toggle = () => {
    setOpen(!open);
  };

  const styles = StyleSheet.create({
    content: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: 24,
      fontWeight: "bold",
    },
    toggler: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      color: labelColor,
      fontSize: 24,
      padding: 15,
    },
  });

  return (
    <View style={styles.content}>
      <View style={{ flex: 1 }}>
        <Pressable onPress={toggle} style={styles.toggler}>
          {label ? <Text style={styles.label}>{label}</Text> : ""}
          <FontAwesomeIcon color={labelColor} icon={icon} size={32} />
        </Pressable>
      </View>
      {open && (
        <View
          style={{
            ...styles.content,
            flex: 4,
            padding: 15,
          }}
        >
          {children && children}
        </View>
      )}
    </View>
  );
};

export default Accordion;
