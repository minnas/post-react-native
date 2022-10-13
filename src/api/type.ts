import { IconProp } from "@fortawesome/fontawesome-svg-core";

export enum ApiType {
  POSTS,
  TODOS,
}

export enum TaskAnswerType {
  TEXT,
  CHOICE,
  SLIDER,
}
export type Choice = {
  id: string;
  text: string;
  icon?: IconProp;
};
export type SliderValue = {
  text: string;
  icon?: IconProp;
  color?: string;
};
export type SliderValues = {
  min: SliderValue;
  max: SliderValue;
};
export type Task = {
  id: string;
  desc: string;
  type: TaskAnswerType;
  choices?: Choice[];
  range?: SliderValues;
};
export type Answer = {
  id?: string;
  taskId: string;
  answer?: any;
};
