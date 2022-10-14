import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, MyTodo } from "@Types/types";
import Button from "@Tools/Button";
import { ButtonOptions, ButtonType } from "@Tools/settings";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@Store/store";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { colors } from "@Styles/colors";
import Placeholder from "@Tools/Placeholder";
import { styles } from "@Styles/views";
import { remove, update } from "@Store/dataSlices";
import { View as AnimatableView } from "react-native-animatable";

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
    iconSize: 32,
  } as ButtonOptions;

  const renderTodo = ({ item }: any) => {
    return (
      <View key={item.key} style={styles.listItemIconRight}>
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
                color={colors.SUCCESS_COLOR}
                size={32}
              />
            ) : (
              <FontAwesomeIcon
                icon={faCheck}
                color={colors.FONT_COLOR}
                size={32}
              />
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

  const emptyList = () => (
    <Placeholder
      image={require("@Assets/placeholder.png")}
      text="Yay! No Todos here!"
    />
  );
  return (
    <>
      <View style={styles.title}>
        <Text style={styles.text}>My Todos</Text>
      </View>
      <AnimatableView
        style={styles.containerPosts}
        animation="slideInUp"
        duration={800}
        delay={0}
      >
        <FlatList
          ListEmptyComponent={emptyList}
          data={todos.map((item: MyTodo) => {
            return { key: item.id, title: item.title } as ListItem;
          })}
          renderItem={renderTodo}
        />
      </AnimatableView>
    </>
  );
};
export default MyTodos;
