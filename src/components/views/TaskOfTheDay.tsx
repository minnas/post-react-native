import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import Button from "../tools/Button";
import { ButtonOptions, ButtonType } from "../tools/settings";
import { useNavigate } from "react-router-native";
import { faEarth, faBroom } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  addAnswer,
  clearAll,
  removeAnswer,
  updateAnswer,
} from "../../store/dataSlices";
import { fetchTask } from "../../api/api";
import { Answer, Choice, Task, TaskAnswerType } from "../../api/type";

const TaskOfTheDay = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const taskId = useSelector(
    (state: RootState) => state.profile.page
  )?.toString();
  const answers = useSelector((state: RootState) => state.answers).filter(
    (item: Answer) => item.taskId == taskId
  );
  const [task, setTask] = useState({} as Task);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setTask(fetchTask(taskId?.toString()) as Task);
  }, []);

  useEffect(() => {
    if (answers.length > 0) {
      setSelected(answers[0].answer);
    } else {
      setSelected("");
    }
  }, [answers]);

  const remove = (id: string) => {
    dispatch(removeAnswer({ id }));
  };

  const add = (answer: Answer) => {
    dispatch(addAnswer(answer));
    const others = answers.filter(
      (item: Answer) => item.answer != answer.answer && item.id
    );
    for (const item of others) {
      const answer = item as Answer;
      if (answer.id) {
        remove(answer.id);
      }
    }
  };

  const options = (choice: Choice) => {
    const settings = choice.icon ? {} : { fontSize: 24 };
    if (selected === choice.id) {
      return {
        ...settings,
        iconSize: 58,
        backgroundColor: colors.APP_COLOR,
        color: colors.WHITE_OPACITY_8,
      };
    }
    return {
      ...settings,
      iconSize: 42,
      color: colors.BLACK_OPACITY_8,
    };
  };
  const handleChoicePress = (id: string) => {
    const answer = answers.find((answer: Answer) => answer.answer === id);
    if (!answer?.id) {
      add({
        taskId: task.id,
        answer: id,
      });
    }
  };
  const renderChoice = (choice: Choice, index: number) => {
    return (
      <View
        key={index + 1}
        style={{
          padding: 15,
        }}
      >
        <Button
          icon={choice.icon}
          title={choice.text}
          onPress={() => {
            handleChoicePress(choice.id);
          }}
          type={choice.icon ? ButtonType.ICON_ONLY : ButtonType.DEFAULT}
          options={
            {
              backgroundColor: colors.WHITE_OPACITY_2,
              ...options(choice),
            } as ButtonOptions
          }
        />
      </View>
    );
  };
  return (
    <>
      <Text style={{ fontSize: 28, alignSelf: "center", paddingHorizontal: 5 }}>
        {task.desc}
      </Text>
      <View style={{ ...styles.content, flex: 2 }}>
        {task.type === TaskAnswerType.CHOICE && task.choices ? (
          task.choices.map((choice: Choice, index: number) =>
            renderChoice(choice, index)
          )
        ) : (
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              add({
                taskId: task.id,
                answer: text,
              });
            }}
            value={answers.length > 0 ? answers[0]?.answer : ""}
          />
        )}
      </View>
      <View style={{ ...styles.content, justifyContent: "space-between" }}>
        <Button
          type={ButtonType.ICON_ONLY}
          icon={faEarth}
          options={{ iconSize: 42 }}
          onPress={() => {
            navigate("/map");
          }}
        />
        <Button
          type={ButtonType.ICON_ONLY}
          icon={faBroom}
          options={{ iconSize: 42 }}
          onPress={() => {
            dispatch(clearAll({ id: taskId }));
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    borderColor: colors.APP_COLOR,
    borderRadius: 5,
    borderWidth: 2,
    padding: 5,
    width: "80%",
    height: 150,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 24,
  },
});

export default TaskOfTheDay;
