const filterAll = (item) => item;
const filterActive = (item) => !item.isDone;
const filterCompleted = (item) => item.isDone;

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
