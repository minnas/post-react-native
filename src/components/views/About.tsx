import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { faHome, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Link } from "react-router-native";
import Button from "../tools/Button";
import Toast from "../tools/Toast";

const About = ({}) => {
  const [visible, setVisible] = useState(false);

  const toggleToast = () => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      clearTimeout(timer);
    }, 1500);
  };

  const hideToast = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>
          Here will be some useful info about the app
        </Text>
      </View>
      <View>
        <Link to="/" activeOpacity={0.2}>
          <View style={styles.row}>
            <FontAwesomeIcon icon={faHome} size={32} />
          </View>
        </Link>
      </View>
      <View style={styles.column}>
        <Button
          title="Toast"
          onPress={toggleToast}
          icon={faMessage}
          disabled={visible}
        />
        {visible ? <Toast content="THIS IS TEST TOAST" hide={hideToast} /> : ""}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  link: {
    borderColor: "#b141ec",
    padding: "5px",
    borderRadius: 25,
    color: "#b141ec",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: "5%",
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

export default About;
