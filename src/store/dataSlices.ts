import { createSlice } from "@reduxjs/toolkit";
import { Bookmark, MyProfile, MyTodo } from "@Types/types";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Answer } from "@Api/type";

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
        (t) => t.id == (action.payload as Bookmark).id
      );
      if (index > -1) {
        state.splice(index, 1, action.payload as Bookmark);
      }
    },
  },
});

const myProfileSlice = createSlice({
  name: "myProfile",
  initialState: {} as MyProfile,
  reducers: {
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

const starSlice = createSlice({
  name: "star",
  initialState: 0 as number,
  reducers: {
    more: (state) => state + 1,
    less: (state) => state - 1,
    reset: (state) => (state = 0),
  },
});
const answerSlice = createSlice({
  name: "myAnswers",
  initialState: [] as Answer[],
  reducers: {
    addAnswer: (state, action) => {
      state.push({ ...action.payload, id: uuidv4() } as Answer);
    },
    removeAnswer: (state, action) => {
      return state.filter((t) => t.id != (action.payload.id as string));
    },
    updateAnswer: (state, action) => {
      const index = state.findIndex(
        (t) => t.id == (action.payload as Answer).id
      );
      if (index > -1) {
        state.splice(index, 1, action.payload as Answer);
      } else {
        state.push({ ...action.payload, id: uuidv4() } as Answer);
      }
    },
    clearAll: (state, action) => {
      if (action.payload.id) {
        return state.filter((t) => t.taskId != (action.payload.id as string));
      }
    },
  },
});

/**reducers */
export const todoReducer = myTodoSlice.reducer;
export const bookmarReducer = myBookmarkSlice.reducer;
export const profileReducer = myProfileSlice.reducer;
export const starReducer = starSlice.reducer;
export const answerReducer = answerSlice.reducer;

/**actions */
export const { add, update, remove } = myTodoSlice.actions;
export const { updateProfile } = myProfileSlice.actions;
export const { addBookmark, updateBookmark, removeBookmark } =
  myBookmarkSlice.actions;
export const { less, more, reset } = starSlice.actions;
export const { addAnswer, updateAnswer, removeAnswer, clearAll } =
  answerSlice.actions;
