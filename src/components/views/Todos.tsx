import { faBookAtlas, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { search } from "../../api/api";
import Spinner from "../tools/Spinner";
import { Post, ListItem, MyTodo } from "../types/types";
import Button from "../tools/Button";
import {
  ButtonOptions,
  ButtonType,
  ToastOptions,
  ToastType,
} from "../tools/settings";
import Toast from "../tools/Toast";
import { useDispatch, useSelector } from "react-redux";
import { add, RootState } from "../../store/store";

const Todos = () => {
  const [todos, setTodos] = useState([] as ListItem[]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toastErrorVisible, setToastErrorVisible] = useState(false);
  const [toastErrorMessage, setToastErrorMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const dispatch = useDispatch();
  const myTodos = useSelector((state: RootState) => state.todos);

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

        setTodos(myItems);
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

  const addToMyTodos = (id: string) => {
    const post = todos.find((t) => t.key.toString() === id.toString());
    if (post) {
      dispatch(
        add({
          externalId: id,
          title: post.title,
        } as MyTodo)
      );
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 500);
    }
  };

  const addDisabled = (id: string) => {
    return myTodos.find((t: MyTodo) => t.externalId === id) != undefined;
  };

  const renderTodo = ({ item }: any) => {
    return (
      <View key={item.key} style={styles.listItem}>
        <Button
          icon={addDisabled(item.key.toString()) ? faBookAtlas : faNoteSticky}
          type={ButtonType.ICON_ONLY}
          disabled={addDisabled(item.key.toString())}
          options={btnOptions}
          onPress={() => {
            return addToMyTodos(item.key.toString());
          }}
        />
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>Current {count} todos in the list</Text>
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
          <FlatList data={todos} renderItem={renderTodo} />
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
    paddingHorizontal: 3,
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

export default Todos;
