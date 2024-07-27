import { configureStore } from "@reduxjs/toolkit";

import todoListReducer from "./todoList/todoListSlice";
import filtersSlice from "./filtersSlice/filtersSlice";

export const store = configureStore({
  reducer: {
    todoList: todoListReducer,
    filter: filtersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
