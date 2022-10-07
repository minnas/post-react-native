import { faBookmark, faBookDead } from "@fortawesome/free-solid-svg-icons";
import { FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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
import { RootState } from "../../store/store";
import { styles } from "../../styles/views";
import { addBookmark } from "../../store/dataSlices";

const Posts = () => {
  const [posts, setPosts] = useState([] as ListItem[]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toastErrorVisible, setToastErrorVisible] = useState(false);
  const [toastErrorMessage, setToastErrorMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.bookmarks);

  const btnOptions = {
    noBorder: true,
    iconSize: 32,
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
    return bookmarks.find((t: Bookmark) => t.postId === id) != undefined;
  };

  const renderPost = ({ item }: any) => {
    return (
      <View key={item.key} style={styles.listItemIconLeft}>
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
    <>
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
    </>
  );
};

export default Posts;
