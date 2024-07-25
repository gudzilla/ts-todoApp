import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

type TodoItem = {
  id: string;
  isDone: boolean;
  name: string;
};

type NewTodoName = {
  editId: string;
  newName: string;
};

const initialState: TodoItem[] = [];

const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addNewTodo: (state, action: PayloadAction<{ todoName: string }>) => {
      const { todoName } = action.payload;

      state.push({
        id: nanoid(),
        isDone: false,
        name: todoName,
      });
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
      const haveUndoneTodos = state.some((todo) => !todo.isDone);
      for (let todo of state) {
        todo.isDone = haveUndoneTodos;
      }
    },
    removeCompleted: (state) => {
      return state.filter((todo) => !todo.isDone);
    },
    editTodoName: (state, action: PayloadAction<NewTodoName>) => {
      const { editId, newName } = action.payload;
      const todo = state.find((todo) => todo.id === editId);
      if (todo) {
        todo.name = newName;
      }
    },
  },
});

export const {
  addNewTodo,
  toogleItemCheckbox,
  removeTodo,
  toggleAllCheckboxes,
  removeCompleted,
  editTodoName,
} = todoListSlice.actions;

export default todoListSlice.reducer;
