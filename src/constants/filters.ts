type TodoItem = {
  id: string;
  isDone: boolean;
  name: string;
};

const filterAll = (item: TodoItem) => item;
const filterActive = (item: TodoItem) => !item.isDone;
const filterCompleted = (item: TodoItem) => item.isDone;

export const FILTERS = {
  all: "all",
  active: "active",
  completed: "completed",
};

export const FILTERS_PREDICATE = {
  [FILTERS.all]: filterAll,
  [FILTERS.active]: filterActive,
  [FILTERS.completed]: filterCompleted,
};
