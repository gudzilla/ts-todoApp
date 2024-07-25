import { configureStore } from '@reduxjs/toolkit';

import todoListReducer from './todoList/todoListSlice';
import filtersSlice from './todoFilters/filtersSlice';

export const store = configureStore({
  reducer: {
    todoList: todoListReducer,
    filter: filtersSlice,
  },
});
