import { IconProp } from "@fortawesome/fontawesome-svg-core";

export enum TaskAnswerType {
  TEXT,
  CHOICE,
}
export type Choice = {
  id: string;
  text: string;
  icon?: IconProp;
};
export type Task = {
  id: string;
  desc: string;
  type: TaskAnswerType;
  choices?: Choice[];
};
export type Answer = {
  id?: string;
  taskId: string;
  answer?: any;
};
