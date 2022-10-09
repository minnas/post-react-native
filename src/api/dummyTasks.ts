import {
  faFaceAngry,
  faFaceMeh,
  faFaceSadTear,
} from "@fortawesome/free-solid-svg-icons";
import { Choice, Task, TaskAnswerType } from "./type";

export const dummyTask: Task[] = [
  {
    id: "1",
    desc: "Select emoji wich describes today feeling",
    type: TaskAnswerType.CHOICE,
    choices: [
      { id: "1-1", text: "angry", icon: faFaceAngry },
      { id: "1-2", text: "sad", icon: faFaceSadTear },
      { id: "1-3", text: "neutral", icon: faFaceMeh },
    ] as Choice[],
  },
  {
    id: "2",
    desc: "Which fruit taste better?",
    type: TaskAnswerType.CHOICE,
    choices: [
      { id: "2-1", text: "Apple" },
      { id: "2-2", text: "Banana" },
    ] as Choice[],
  },
  {
    id: "3",
    desc: "Write here something",
    type: TaskAnswerType.TEXT,
  },
  {
    id: "4",
    desc: "Write here something else",
    type: TaskAnswerType.TEXT,
  },
  {
    id: "5",
    desc: "Which season you like most?",
    type: TaskAnswerType.CHOICE,
    choices: [
      { id: "5-1", text: "Spring" },
      { id: "5-2", text: "Summer" },
      { id: "5-3", text: "Autum" },
      { id: "5-4", text: "Winter" },
    ] as Choice[],
  },
  {
    id: "6",
    desc: "Choose your mood",
    type: TaskAnswerType.CHOICE,
    choices: [
      { id: "6-1", text: "angry", icon: faFaceAngry },
      { id: "6-2", text: "sad", icon: faFaceSadTear },
      { id: "6-3", text: "neutral", icon: faFaceMeh },
    ] as Choice[],
  },
];
