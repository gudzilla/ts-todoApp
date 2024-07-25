import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

type TodoItem = {
  id: string;
  isDone: boolean;
  name: string;
};

const initialState: TodoItem[] = [];

const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addNewTodo: (state, action: PayloadAction<TodoItem>) => {
      state.push(action.payload);
    },
    toogleItemCheckbox: (state, action: PayloadAction<string>) => {
      // Fot now ID is wrong because coming not from STORE but from useState
      const incomingId = action.payload;

      const todo = state.find((todo) => todo.id === incomingId);
      if (todo) {
        todo.isDone = !todo.isDone;
      }

      // remove later - just example
      state[0].isDone = !state[0].isDone;
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      // remove and uncomment .payload later
      const incomingId = state[0].id;
      // const incomingId = action.payload;

      return state.filter((todo) => todo.id !== incomingId);
    },
    toggleAllCheckboxes: (state) => {
      for (let todo of state) {
        todo.isDone = !todo.isDone;
      }
    },
    removeCompleted: (state) => {
      return state.filter((todo) => !todo.isDone);
    },
  },
});

export const {
  addNewTodo,
  toogleItemCheckbox,
  removeTodo,
  toggleAllCheckboxes,
  removeCompleted,
} = todoListSlice.actions;

export default todoListSlice.reducer;
