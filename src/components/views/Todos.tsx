import { faBookAtlas, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { search } from "@Api/api";
import Spinner from "@Tools/Spinner";
import { ListItem, MyTodo, Todo } from "@Types/types";
import Button from "@Tools/Button";
import {
  ButtonOptions,
  ButtonType,
  ToastOptions,
  ToastType,
} from "@Tools/settings";
import Toast from "@Tools/Toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@Store/store";
import { styles } from "@Styles/views";
import { add } from "@Store/dataSlices";
import { ApiType } from "@Api/type";
import { View as AnimatableView } from "react-native-animatable";

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
    iconSize: 32,
  } as ButtonOptions;

  useEffect(() => {
    setLoading(true);
    search(ApiType.TODOS)
      .then((items) => {
        const myItems = items.map((item: Todo) => {
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
      <View key={item.key} style={styles.listItemIconRight}>
        <Text style={styles.itemText}>{item.title}</Text>
        <Button
          icon={addDisabled(item.key.toString()) ? faBookAtlas : faNoteSticky}
          type={ButtonType.ICON_ONLY}
          disabled={addDisabled(item.key.toString())}
          options={btnOptions}
          onPress={() => {
            return addToMyTodos(item.key.toString());
          }}
        />
      </View>
    );
  };
  return (
    <>
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
          <AnimatableView
            style={styles.containerPosts}
            animation="slideInUp"
            duration={800}
            delay={0}
          >
            <FlatList data={todos} renderItem={renderTodo} />
          </AnimatableView>
        )}
      </View>
    </>
  );
};
export default Todos;
