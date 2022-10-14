import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import Button from "@Tools/Button";
import { ButtonOptions } from "@Tools/settings";
import { useNavigate } from "react-router-native";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { MyProfile } from "@Types/types";
import { colors } from "@Styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@Store/store";
import { updateProfile } from "@Store/dataSlices";
import { Answer, Task } from "@Api/type";
import { fetchTask } from "@Api/api";
const bgImage = require("@Assets/bird-map-rotated.png");

const TasksStatus = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const [page, setPage] = useState(profile?.page);
  const [path, setPath] = useState("");
  const answers = useSelector((state: RootState) => state.answers);
  const [tasks, setTasks] = useState([] as Task[]);

  useEffect(() => {
    setTasks(fetchTask() as Task[]);
  }, []);

  const setProfile = () => {
    dispatch(
      updateProfile({
        page,
      } as MyProfile)
    );
  };

  useEffect(() => {
    setProfile();
  }, [page]);

  useEffect(() => {
    navigate(path);
  }, [path]);

  const options = (id: string) => {
    if (answers.find((answer: Answer) => answer.taskId === id)) {
      return {
        color: colors.YELLOW_PASTEL,
        backgroundColor: colors.BLACK_OPACITY_4,
      };
    }
    return {
      color: colors.BLACK_OPACITY_8,
    };
  };

  return (
    <>
      <ImageBackground source={bgImage} style={styles.imageBg}>
        <View style={styles.mapIcons}>
          {tasks.map((task: Task, index: number) => (
            <View
              key={index + 1}
              style={{
                padding: 15,
              }}
            >
              <Button
                icon={faAward}
                onPress={() => {
                  setPage(index + 1);
                  setPath("/day");
                }}
                title={(index + 1)?.toString() || ""}
                options={
                  {
                    backgroundColor: colors.WHITE_OPACITY_2,
                    iconSize: 42,
                    ...options(task.id),
                  } as ButtonOptions
                }
              />
            </View>
          ))}
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  mapIcons: {
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default TasksStatus;
