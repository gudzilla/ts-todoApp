import { TodoItem } from '../state/todoList/todoListSlice';

export type FilterNames = 'all' | 'active' | 'completed';

type FiltersConst = Record<FilterNames, FilterNames>;

const filterAll = (item: TodoItem) => item;
const filterActive = (item: TodoItem) => !item.isDone;
const filterCompleted = (item: TodoItem) => item.isDone;

export const FILTERS: FiltersConst = {
  all: 'all',
  active: 'active',
  completed: 'completed',
};

export const FILTERS_PREDICATE = {
  [FILTERS.all]: filterAll,
  [FILTERS.active]: filterActive,
  [FILTERS.completed]: filterCompleted,
};
