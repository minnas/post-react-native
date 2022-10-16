import {
  faAppleWhole,
  faCat,
  faDog,
  faFaceAngry,
  faFaceDizzy,
  faFaceFrownOpen,
  faFaceMeh,
  faFaceSadTear,
  faFishFins,
  faLemon,
  faSadCry,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import { Choice, SliderValues, Task, TaskAnswerType } from "./type";
import { colors } from "@Styles/colors";

export const dummyTask: Task[] = [
  {
    id: "1",
    desc: "Select emoji which describes today feeling",
    type: TaskAnswerType.CHOICE,
    shuffle: true,
    choices: [
      {
        id: "1-1",
        text: "angry",
        icon: faFaceAngry,
        color: colors.BLACK_OPACITY_4,
      },
      {
        id: "1-2",
        text: "sad",
        icon: faFaceSadTear,
        color: colors.BLACK_OPACITY_6,
      },
      {
        id: "1-3",
        text: "neutral",
        icon: faFaceMeh,
        color: colors.LIGHT_VIOLET,
      },
      {
        id: "1-4",
        text: "dizzy",
        icon: faFaceDizzy,
        color: colors.LIGHT_VIOLET_8,
      },
      {
        id: "1-5",
        text: "neutral",
        icon: faFaceFrownOpen,
        color: colors.LIGHT_VIOLET_6,
      },
    ] as Choice[],
    background: "home.png",
  },
  {
    id: "2",
    desc: "Which fruit taste better?",
    type: TaskAnswerType.SLIDER,
    range: {
      min: {
        text: "lemon",
        icon: faLemon,
        color: colors.YELLOW_PASTEL,
      },
      max: {
        text: "apple",
        icon: faAppleWhole,
        color: colors.LIGHT_VIOLET_8,
      },
    } as SliderValues,
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
    shuffle: true,
    choices: [
      { id: "6-1", text: "angry", icon: faFaceAngry },
      { id: "6-2", text: "sad", icon: faFaceSadTear },
      { id: "6-3", text: "neutral", icon: faFaceMeh },
    ] as Choice[],
  },
  {
    id: "7",
    desc: "How are you feeling?",
    type: TaskAnswerType.SLIDER,
    range: {
      min: {
        text: "sad",
        icon: faSadCry,
        color: colors.LIGHT_VIOLET_8,
      },
      max: {
        text: "happy",
        icon: faSmile,
        color: colors.APP_COLOR,
      },
    } as SliderValues,
  },
  {
    id: "8",
    desc: "Which Animal you like most?",
    type: TaskAnswerType.CHOICE,
    shuffle: true,
    choices: [
      { id: "9-1", text: "Dog", icon: faDog, color: colors.LIGHT_VIOLET },
      { id: "9-2", text: "Cat", icon: faCat, color: colors.BLACK_OPACITY_8 },
      {
        id: "9-3",
        text: "Fish",
        icon: faFishFins,
        color: colors.BLACK_OPACITY_6,
      },
    ] as Choice[],
  },
];
