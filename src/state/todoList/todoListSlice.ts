import { createSelector, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { FILTERS, FILTERS_PREDICATE } from '../../constants/filters';

export type TodoItem = {
  id: string;
  isDone: boolean;
  name: string;
};

export type TodoListType = TodoItem[];

const initialState: TodoListType = [];

const todoListSlice = createSlice({
  name: 'todoList',
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
    toggleTodoDone: (state, action: PayloadAction<{ toggleId: string }>) => {
      const { toggleId } = action.payload;
      const todo = state.find((todo) => todo.id === toggleId);
      if (todo) {
        todo.isDone = !todo.isDone;
      }
    },
    removeTodo: (state, action: PayloadAction<{ removeId: string }>) => {
      const { removeId } = action.payload;
      return state.filter((todo) => todo.id !== removeId);
    },
    toggleAllDone: (state) => {
      const haveUndoneTodos = state.some((todo) => !todo.isDone);
      for (let todo of state) {
        todo.isDone = haveUndoneTodos;
      }
    },
    removeCompleted: (state) => {
      return state.filter((todo) => !todo.isDone);
    },
    changeTodo: (
      state,
      action: PayloadAction<{
        editId: string;
        newName: string;
      }>
    ) => {
      const { editId, newName } = action.payload;
      const todo = state.find((todo) => todo.id === editId);
      if (todo) {
        todo.name = newName;
      }
    },
  },
});

// Selector for number of active todos
const todoList = (state: RootState) => state.todoList;

const getNumberOfActiveTodoItems = (todoList: TodoListType) =>
  todoList.filter(FILTERS_PREDICATE[FILTERS.active]).length;

export const activeTodosCountSelector = createSelector(
  [todoList],
  getNumberOfActiveTodoItems
);

export const {
  addNewTodo,
  toggleTodoDone,
  removeTodo,
  toggleAllDone,
  removeCompleted,
  changeTodo,
} = todoListSlice.actions;

export default todoListSlice.reducer;
