import {
  faFaceAngry,
  faFaceMeh,
  faFaceSadTear,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";
import { Choice, Task, TaskAnswerType } from "./type";

export const dummyTask: Task[] = [
  {
    id: "1",
    desc: "Millainen olo tänään?",
    type: TaskAnswerType.CHOICE,
    choices: [
      { id: "1-1", text: "vihainen", icon: faFaceAngry },
      { id: "1-2", text: "surullinen", icon: faFaceSadTear },
      { id: "1-3", text: "iloinen", icon: faFaceSmile },
      { id: "1-4", text: "neutraali", icon: faFaceMeh },
    ] as Choice[],
  },
  {
    id: "2",
    desc: "Kuka minä olen?",
    type: TaskAnswerType.TEXT,
  },
  {
    id: "3",
    desc: "Luotanko itseeni??",
    type: TaskAnswerType.CHOICE,
    choices: [
      { id: "3-1", text: "Kyllä" },
      { id: "3-2", text: "En" },
      { id: "3-3", text: "En osaa sanoa" },
    ] as Choice[],
  },
  {
    id: "4",
    desc: "Mistä olen kiitollinen?",
    type: TaskAnswerType.TEXT,
  },
  {
    id: "5",
    desc: "Mistä vuodenajasta pidän eniten??",
    type: TaskAnswerType.CHOICE,
    choices: [
      { id: "5-1", text: "Kevät" },
      { id: "5-2", text: "Kesä" },
      { id: "5-3", text: "Syksy" },
      { id: "5-4", text: "Talvi" },
    ] as Choice[],
  },
  {
    id: "6",
    desc: "Miksi vuodenaika on paras?",
    type: TaskAnswerType.TEXT,
  },
  {
    id: "7",
    desc: "Olenko tarpeeksi hyvä?",
    type: TaskAnswerType.CHOICE,
    choices: [
      { id: "7-1", text: "Kyllä" },
      { id: "7-2", text: "En" },
      { id: "7-3", text: "En ole varma" },
    ] as Choice[],
  },
  {
    id: "8",
    desc: "Miten koulussa meni tänään?",
    type: TaskAnswerType.TEXT,
  },
  {
    id: "9",
    desc: "Mistä pidän eniten?",
    type: TaskAnswerType.CHOICE,
    choices: [
      { id: "9-1", text: "Musiikki" },
      { id: "9-2", text: "Juoku/Kävely" },
      { id: "9-3", text: "Uinti" },
      { id: "9-4", text: "Lukeminen" },
    ] as Choice[],
  },
];
