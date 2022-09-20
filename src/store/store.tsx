import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Bookmark, MyTodo } from "../components/types/types";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const myTodoSlice = createSlice({
  name: "myTodos",
  initialState: [] as MyTodo[],
  reducers: {
    add: (state, action) => {
      state.push({ ...action.payload, id: uuidv4() } as MyTodo);
    },
    remove: (state, action) => {
      return state.filter((t) => t.id != (action.payload.id as string));
    },
    update: (state, action) => {
      const index = state.findIndex(
        (t) => t.id == (action.payload as MyTodo).id
      );
      if (index > -1) {
        state.splice(index, 1, action.payload as MyTodo);
      }
    },
  },
});

const myBookmarkSlice = createSlice({
  name: "myBookmarks",
  initialState: [] as Bookmark[],
  reducers: {
    addBookmark: (state, action) => {
      state.push({ ...action.payload, id: uuidv4() } as Bookmark);
    },
    removeBookmark: (state, action) => {
      return state.filter((t) => t.id != (action.payload.id as string));
    },
    updateBookmark: (state, action) => {
      const index = state.findIndex(
        (t) => t.id == (action.payload as MyTodo).id
      );
      if (index > -1) {
        state.splice(index, 1, action.payload as Bookmark);
      }
    },
  },
});

const counterSlice = createSlice({
  name: "counter",
  initialState: 0 as number,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    reset: (state) => (state = 0),
  },
});

export const { add, update, remove } = myTodoSlice.actions;
export const { addBookmark, updateBookmark, removeBookmark } =
  myBookmarkSlice.actions;
export const { increment, decrement, reset } = counterSlice.actions;

const store = configureStore({
  reducer: {
    todos: myTodoSlice.reducer,
    bookmarks: myBookmarkSlice.reducer,
    count: counterSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
