import React, { ReactNode, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  faHome,
  faLayerGroup,
  faSnowflake,
  faInfo
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Link } from "react-router-native";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const BaseLayout = ({
    children,
    title,
    icon
  }: {
    children: ReactNode;
    title?: string;
    icon?: IconProp;
  }) => {
    const myTitle = title || "Dummy Post App";
    const myIcon = icon || faSnowflake;

    return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{myTitle}</Text>
        <FontAwesomeIcon icon={myIcon} size={32} />
      </View>
      <View style={styles.content}>
        {children}
      </View>
      <View style={styles.footer}>
        <Link to="/" activeOpacity={0.2}>
            <FontAwesomeIcon icon={faHome} size={32} />
        </Link>    
        <Link to="/about" activeOpacity={0.2}>
            <FontAwesomeIcon icon={faInfo} size={32} />
        </Link>    
        <Link to="/posts" activeOpacity={0.2}>
            <FontAwesomeIcon icon={faLayerGroup} size={32} />
        </Link>    
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
  header: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: "#916ec9",
    paddingBottom: 15
  },
  
  content: {
    flex: 5,
    width: '100%',
  },
  footer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 'auto',
    flexDirection: 'row',
    backgroundColor: "#916ec9"
  },
  link: {
    color: "#b141ec"
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

export default BaseLayout;