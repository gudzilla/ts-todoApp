import { useAppSelector } from '../shared/lib/redux/hooks';

const todoListSelector = (state: RootState) => state.todoList;
const todoListFilterSelector = (state: RootState) => state.filter;

export const useTodoListSelector = () => useAppSelector(todoListSelector);
export const useTodoListFilterSelector = () => useAppSelector(todoListFilterSelector);
