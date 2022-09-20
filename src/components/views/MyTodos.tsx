import {
  faBookmark,
  faCheck,
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
import { ListItem, Bookmark, MyTodo } from "../types/types";
import Button from "../tools/Button";
import { ButtonOptions, ButtonType } from "../tools/settings";
import { useDispatch, useSelector } from "react-redux";
import { remove, RootState, update } from "../../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const MyTodos = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const removeTodo = (id: string) => {
    dispatch(remove({ id }));
  };

  const toggleDone = (id: string) => {
    const todo = todos.find((b) => b.id == id);
    const clone = {
      ...todo,
      completed: todo?.completed ? false : true,
    };
    dispatch(update(clone));
  };

  const isDone = (id: string) => {
    return todos.find((b) => (b.id as string) == id)?.completed;
  };

  useEffect(() => {
    setCount(todos.length);
  }, [todos]);

  const btnOptions = {
    noBorder: true,
  } as ButtonOptions;

  const renderTodo = ({ item }: any) => {
    return (
      <View key={item.key} style={styles.listItem}>
        <Text style={styles.itemText}>{item.title}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => {
              return toggleDone(item.key.toString());
            }}
          >
            {isDone(item.key) ? (
              <FontAwesomeIcon
                icon={faCheck}
                color="rgb(0, 255, 0)"
                size={32}
              />
            ) : (
              <FontAwesomeIcon icon={faCheck} color="#000" size={32} />
            )}
          </TouchableOpacity>

          <Button
            icon={faTimes}
            type={ButtonType.ICON_ONLY}
            options={btnOptions}
            onPress={() => {
              return removeTodo(item.key.toString());
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>My Todos</Text>
      </View>
      <View style={styles.containerPosts}>
        <FlatList
          data={todos.map((item: MyTodo) => {
            return { key: item.id, title: item.title } as ListItem;
          })}
          renderItem={renderTodo}
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
    maxWidth: "70%",
    fontSize: 24,
    fontWeight: "normal",
    color: "#000",
    marginHorizontal: 25,
  },
});

export default MyTodos;
