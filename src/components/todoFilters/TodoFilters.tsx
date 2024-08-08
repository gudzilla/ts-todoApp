import { useSelector } from "react-redux";
import styles from "./TodoFilters.module.css";
import cx from "classnames";
import { AppDispatch, RootState } from "../../states/store";
import { FILTERS } from "../../constants/filters";
import { useDispatch } from "react-redux";
import { setFilter } from "../../states/todoFilters/filtersSlice";

type TodoFiltersProps = {
  className: string;
};

export function TodoFilters({ className }: TodoFiltersProps) {
  const filter = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={cx(className, styles.filtersContent)}>
      <button
        className={cx(styles.filter, { [styles.filterSelected]: filter === FILTERS.all })}
        onClick={() => {
          dispatch(setFilter({ filter: FILTERS.all }));
        }}
      >
        All
      </button>
      <button
        className={cx(styles.filter, {
          [styles.filterSelected]: filter === FILTERS.active,
        })}
        onClick={() => {
          dispatch(setFilter({ filter: FILTERS.active }));
        }}
      >
        Active
      </button>
      <button
        className={cx(styles.filter, {
          [styles.filterSelected]: filter === FILTERS.completed,
        })}
        onClick={() => {
          dispatch(setFilter({ filter: FILTERS.completed }));
        }}
      >
        Completed
      </button>
    </div>
  );
}
