import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import Button from "../tools/Button";
import { ButtonOptions, ButtonType } from "../tools/settings";
import { useNavigate } from "react-router-native";
import {
  faEarth,
  faBroom,
  faCheck,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addAnswer, clearAll, removeAnswer } from "../../store/dataSlices";
import { fetchTask } from "../../api/api";
import {
  Answer,
  Choice,
  SliderValue,
  SliderValues,
  Task,
  TaskAnswerType,
} from "../../api/type";
import TextField from "../tools/TextField";
import { Slider } from "@miblanchard/react-native-slider";
import { slider, styles as defaultStyles } from "../../styles/views";
import Ghost from "./../../assets/ghost.svg";
import { View as AnimatableView } from "react-native-animatable";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

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
  const inputRef = useRef<TextInput | null>(null);
  const [changed, setChanged] = useState(false);
  const [value, setValue] = useState(0);
  const sliderRef = useRef<TextInput | null>(null);

  useEffect(() => {
    setTask(fetchTask(taskId?.toString()) as Task);
  }, []);

  useEffect(() => {
    if (answers.length > 0) {
      setSelected(answers[0].answer);
      if (
        task.type == TaskAnswerType.SLIDER &&
        !isNaN(answers[0].answer as number)
      )
        setValue(answers[0].answer as number);
    } else {
      setSelected("");
    }
  }, [answers]);

  const remove = (id: string) => {
    dispatch(removeAnswer({ id }));
  };

  const add = (answer: Answer) => {
    dispatch(addAnswer(answer));
    setChanged(true);
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
      color: choice.color || colors.BLACK_OPACITY_8,
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

  const renderSliderValue = (value: SliderValue, styles: object) => {
    if (value.icon) {
      return (
        <FontAwesomeIcon
          style={styles}
          icon={value.icon}
          size={42}
          color={value?.color || colors.BLACK_OPACITY_8}
        />
      );
    }
    return <Text style={styles}>{value.text}</Text>;
  };

  const renderSlider = (range: SliderValues) => {
    return (
      <View style={slider.container}>
        <View style={{ flex: 1 }}>
          {renderSliderValue(range.min, slider.minField)}
        </View>
        <View style={{ flex: 3, marginHorizontal: 5 }}>
          <Slider
            animateTransitions
            value={value}
            minimumValue={-5}
            maximumValue={5}
            minimumTrackTintColor={colors.BLACK_OPACITY_4}
            thumbTintColor={colors.LIGHT_VIOLET_8}
            onValueChange={(value) => {
              add({
                taskId: task.id,
                answer: value,
              });
            }}
            thumbStyle={slider.thumb}
            trackStyle={slider.track}
          />
        </View>
        <View style={{ flex: 1 }}>
          {renderSliderValue(range.max, slider.maxField)}
        </View>
      </View>
    );
  };

  const renderTask = (task: Task) => {
    if (TaskAnswerType.CHOICE && task.choices) {
      return task.choices.map((choice: Choice, index: number) =>
        renderChoice(choice, index)
      );
    }
    if (TaskAnswerType.SLIDER && task.range) {
      return renderSlider(task.range);
    }
    return (
      <View
        style={{
          flexWrap: "wrap",
          alignContent: "flex-start",
          justifyContent: "space-between",
          flexDirection: "row",
          flex: 1,
        }}
      >
        <TextField
          ref={inputRef}
          value={answers.length > 0 ? answers[0]?.answer : ""}
          placeholder="Type here..."
          multiline={true}
          onChangeValue={(text: string) => {
            add({
              taskId: task.id,
              answer: text,
            });
          }}
        />
        <Button
          icon={faCheck}
          onPress={() => {
            inputRef?.current?.blur();
            setChanged(false);
          }}
          options={{
            iconSize: 36,
            noBorder: true,
            color: changed ? colors.BLACK_OPACITY_6 : colors.APP_COLOR,
          }}
        />
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          ...styles.desc,
          ...defaultStyles.bottomShadowLine,
          borderBottomWidth: 2,
          paddingHorizontal: 15,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            textAlign: "center",
          }}
        >
          {task.desc}
        </Text>
        <AnimatableView animation="fadeInRight" duration={1000} delay={0}>
          <Ghost height={52} width={52} fill={colors.LIGHT_VIOLET_8} />
        </AnimatableView>
        <AnimatableView animation="fadeInRight" duration={1000} delay={1000}>
          <Button
            icon={faInfo}
            onPress={() => {
              navigate("/info");
            }}
            type={ButtonType.ICON_ONLY}
          />
        </AnimatableView>
      </View>
      <View
        style={{
          ...styles.content,
          flex: 3,
          alignContent: "flex-start",
          paddingHorizontal: 10,
        }}
      >
        {renderTask(task)}
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
  desc: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    flexWrap: "wrap",
    borderBottomColor: colors.LIGHT_VIOLET_8,
    borderBottomWidth: 2,
  },
});

export default TaskOfTheDay;
