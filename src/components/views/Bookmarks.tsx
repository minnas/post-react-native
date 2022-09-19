import {
  faBookmark,
  faCheckCircle,
  faCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-native";
import { ListItem, Bookmark } from "../types/types";
import Button from "../tools/Button";
import { ButtonOptions, ButtonType } from "../tools/settings";
import { useDispatch, useSelector } from "react-redux";
import { removeBookmark, RootState, updateBookmark } from "../../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Posts = () => {
  const bookmarks = useSelector((state: RootState) => state.bookmarks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  const removeFromBookmarks = (id: string) => {
    dispatch(removeBookmark({ id }));
  };

  const toggleImportant = (id: string) => {
    const bookmark = bookmarks.find((b) => (b.id as string) == id);
    const clone = {
      ...bookmark,
      important: bookmark?.important ? false : true,
    };
    dispatch(updateBookmark(clone));
  };

  const isImportant = (id: string) => {
    return bookmarks.find((b) => (b.id as string) == id)?.important;
  };
  useEffect(() => {
    setCount(bookmarks.length);
  }, [bookmarks]);

  const btnOptions = {
    noBorder: true,
  } as ButtonOptions;

  const renderBookmark = ({ item }: any) => {
    return (
      <View key={item.key} style={styles.listItem}>
        <Text style={styles.itemText}>{item.title}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={{
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              width: 40,
              height: 40,
            }}
            onPress={() => {
              return toggleImportant(item.key.toString());
            }}
          >
            <FontAwesomeIcon icon={faCircle} color="#916ec9" size={40} />
            <FontAwesomeIcon
              icon={faBookmark}
              color="rgba(0, 0, 0, 0.8)"
              size={25}
              style={{ position: "absolute", zIndex: 99 }}
            />
            {isImportant(item.key) ? (
              <FontAwesomeIcon
                style={{
                  position: "absolute",
                  zIndex: 100,
                  top: -8,
                  right: -2,
                }}
                icon={faCheckCircle}
                color="rgba(0, 0, 0, 0.8)"
                size={18}
              />
            ) : (
              ""
            )}
          </TouchableOpacity>

          <Button
            icon={faTimes}
            type={ButtonType.ICON_ONLY}
            options={btnOptions}
            onPress={() => {
              return removeFromBookmarks(item.key.toString());
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>My Bookmarks</Text>
      </View>
      <View style={styles.containerPosts}>
        <FlatList
          data={bookmarks.map((item: Bookmark) => {
            return { key: item.id, title: item.title } as ListItem;
          })}
          renderItem={renderBookmark}
        />
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
  listItem: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
    borderBottomColor: "#916ec9",
    borderBottomWidth: 2,
  },
  actions: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: 80,
    paddingLeft: 5,
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
    maxWidth: "60%",
    fontSize: 24,
    fontWeight: "normal",
    color: "#000",
    marginHorizontal: 25,
  },
});

export default Posts;
