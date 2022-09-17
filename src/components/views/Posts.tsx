import {
  faSignsPost,
  faBookmark,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-native";
import { search } from "../../api/api";
import Spinner from "../tools/Spinner";
import { Post, ListItem } from "../types/types";
import Button from "../tools/Button";
import { ButtonType, ToastType } from "../tools/settings";
import Toast from "../tools/Toast";

const Posts = () => {
  const [posts, setPosts] = useState([] as ListItem[]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toastErrorVisible, setToastErrorVisible] = useState(false);
  const [toastErrorMessage, setToastErrorMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    search()
      .then((items) => {
        const myItems = items.map((item: Post) => {
          return {
            key: item.id,
            title: item.title,
          } as ListItem;
        });

        setPosts(myItems);
        setCount(items.length);
        setLoading(false);
      })
      .catch((e: Error) => {
        setToastErrorMessage(e.message);
        setToastErrorVisible(true);
        setTimeout(() => {
          setToastErrorVisible(false);
        }, 1500);
        setLoading(false);
      });
  }, []);

  const renderPost = ({ item }: any) => {
    return (
      <View key={item.key} style={styles.listItem}>
        <Button
          icon={faBookmark}
          type={ButtonType.ICON_ONLY}
          disabled={true}
          onPress={() => {}}
        />
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.text}>Some Awesome Posts.</Text>
        <FontAwesomeIcon icon={faSignsPost} size={32} />
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>Current {count} posts in the list</Text>
      </View>
      <View>
        <Link to="/" activeOpacity={0.2}>
          <View style={styles.item}>
            <FontAwesomeIcon icon={faHome} size={32} />
          </View>
        </Link>
      </View>
      <View style={styles.containerPosts}>
        {toastErrorVisible ? (
          <Toast content={toastErrorMessage} type={ToastType.ERROR} />
        ) : (
          ""
        )}
        {loading ? (
          <Spinner />
        ) : (
          <FlatList data={posts} renderItem={renderPost} />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 12,
    paddin: 25,
  },
  containerPosts: {
    height: "60%",
    marginVertical: 4,
  },
  item: {
    flexDirection: "row",
    display: "flex",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItem: {
    flexDirection: "row",
    display: "flex",
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 2,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  itemText: {
    fontSize: 24,
    fontWeight: "normal",
    color: "#000",
    marginHorizontal: 25,
  },
  btnRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 25,
    paddingHorizontal: 55,
  },
});

export default Posts;
