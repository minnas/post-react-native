import {
  faBookmark,
  faCheck,
  faCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Bookmark } from "../types/types";
import Button from "../tools/Button";
import { ButtonOptions, ButtonType } from "../tools/settings";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { colors } from "../../styles/colors";
import Placeholder from "../tools/Placeholder";
import { styles } from "../../styles/views";
import { removeBookmark, updateBookmark } from "../../store/dataSlices";
import { View as AnimatableView } from "react-native-animatable";

const Bookmarks = () => {
  const bookmarks = useSelector((state: RootState) => state.bookmarks);
  const dispatch = useDispatch();
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
    iconSize: 32,
  } as ButtonOptions;

  const renderBookmark = ({ item }: any) => {
    return (
      <View key={item.key} style={styles.listItemIconRight}>
        <Text style={styles.itemText}>{item.title}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={{
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              width: 32,
              height: 32,
            }}
            onPress={() => {
              return toggleImportant(item.key.toString());
            }}
          >
            <FontAwesomeIcon
              icon={faCircle}
              color={colors.APP_COLOR}
              size={32}
            />
            <FontAwesomeIcon
              icon={faBookmark}
              color={colors.BLACK_OPACITY_8}
              size={15}
              style={{ position: "absolute", zIndex: 99 }}
            />
            {isImportant(item.key) ? (
              <FontAwesomeIcon
                style={{
                  position: "absolute",
                  zIndex: 100,
                  top: -12,
                  right: -5,
                }}
                icon={faCheck}
                color={colors.SUCCESS_COLOR}
                size={25}
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

  const noBookmarks = () => (
    <Placeholder
      image={require("./../../assets/birds.png")}
      text="Ou nou! Nothing here."
    />
  );

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.text}>My Bookmarks</Text>
      </View>
      <AnimatableView
        style={styles.containerPosts}
        animation="slideInUp"
        duration={800}
        delay={0}
      >
        <FlatList
          ListEmptyComponent={noBookmarks}
          data={bookmarks.map((item: Bookmark) => {
            return { key: item.id, title: item.title } as ListItem;
          })}
          renderItem={renderBookmark}
        />
      </AnimatableView>
    </>
  );
};
export default Bookmarks;
