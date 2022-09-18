import { faBookmark, faHome } from "@fortawesome/free-solid-svg-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-native";
import { search } from "../../api/api";
import Spinner from "../tools/Spinner";
import { Post, ListItem } from "../types/types";
import Button from "../tools/Button";
import { ButtonOptions, ButtonType, ToastType } from "../tools/settings";
import Toast from "../tools/Toast";

const Posts = () => {
  const [posts, setPosts] = useState([] as ListItem[]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toastErrorVisible, setToastErrorVisible] = useState(false);
  const [toastErrorMessage, setToastErrorMessage] = useState("");
  const navigate = useNavigate();

  const btnOptions = {
    noBorder: true,
  } as ButtonOptions;

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
          options={btnOptions}
          onPress={() => {}}
        />
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>Current {count} posts in the list</Text>
        <Button
          icon={faHome}
          type={ButtonType.ICON_ONLY}
          options={{ ...btnOptions, color: "#000" }}
          onPress={() => {
            navigate("/");
          }}
        />
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
    marginTop: 25,
  },
  containerPosts: {
    //marginVertical: 4,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    height: 50,
    flexDirection: "row",
    alignItems: "flex-end",
    borderBottomColor: "rgba(0, 0, 0, .2)",
    borderBottomWidth: 3,
    paddingBottom: 5,
  },
  itemText: {
    fontSize: 24,
    fontWeight: "normal",
    color: "#000",
    marginHorizontal: 25,
  },
});

export default Posts;
