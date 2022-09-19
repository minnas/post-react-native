import {
  faBookmark,
  faBookDead,
} from "@fortawesome/free-solid-svg-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-native";
import { search } from "../../api/api";
import Spinner from "../tools/Spinner";
import { Post, ListItem, Bookmark } from "../types/types";
import Button from "../tools/Button";
import {
  ButtonOptions,
  ButtonType,
  ToastOptions,
  ToastType,
} from "../tools/settings";
import Toast from "../tools/Toast";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, RootState } from "../../store/store";

const Posts = () => {
  const [posts, setPosts] = useState([] as ListItem[]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toastErrorVisible, setToastErrorVisible] = useState(false);
  const [toastErrorMessage, setToastErrorMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.bookmarks);

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

  const addToBookmarks = (id: string) => {
    const post = posts.find((t) => t.key.toString() === id.toString());
    if (post) {
      dispatch(
        addBookmark({
          postId: id,
          id:id,
          title: post.title,
        } as Bookmark)
      );
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 500);
    }
  };

  const copyDisabled = (id: string) => {
    return (
      bookmarks.find((t: Bookmark) => t.postId === id.toString()) != undefined
    );
  };

  const renderPost = ({ item }: any) => {
    return (
      <View key={item.key} style={styles.listItem}>
        <Button
          icon={copyDisabled(item.key.toString()) ? faBookDead : faBookmark}
          type={ButtonType.ICON_ONLY}
          disabled={copyDisabled(item.key.toString())}
          options={btnOptions}
          onPress={() => {
            return addToBookmarks(item.key.toString());
          }}
        />
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>Current {count} posts in the list</Text>
      </View>
      <View style={styles.containerPosts}>
        {toastVisible ? (
          <Toast
            content="Done"
            type={ToastType.SUCCESS}
            options={{ left: 5, top: 2 } as ToastOptions}
          />
        ) : (
          ""
        )}
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
