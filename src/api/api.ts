import {
  faCat,
  faDove,
  faDragon,
  faHippo,
  faSpider,
} from "@fortawesome/free-solid-svg-icons";
import { FaIcon } from "@Types/types";
import { dummyTask } from "./dummyTasks";
import { ApiType } from "./type";

const randomApi = "https://jsonplaceholder.typicode.com";

export const search = async (type?: ApiType) => {
  let prefix = "posts";

  if (type && type == ApiType.TODOS) {
    prefix = "todos";
  }
  return await fetch(`${randomApi}/${prefix}`, {
    headers: { "Access-Control-Allow-Origin": "*" },
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      throw new Error(`Failed to fetch ${prefix} from api`);
    });
};

export const avatars = [
  {
    icon: faHippo,
    label: "Hippo",
  } as FaIcon,
  {
    icon: faDove,
    label: "Dove",
  } as FaIcon,
  {
    icon: faDragon,
    label: "Dragon",
  } as FaIcon,
  {
    icon: faCat,
    label: "Cat",
  } as FaIcon,
  {
    icon: faSpider,
    label: "Spider",
  } as FaIcon,
];

export const fetchTask = (id?: string) => {
  if (id) return dummyTask.find((t) => t.id == id);
  return dummyTask;
};
