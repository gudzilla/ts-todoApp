import styles from './TodoFilters.module.css';
import cx from 'classnames';
import { FILTERS } from '../../constants/filters';
import { setFilter } from '../../state/todoFilters/filtersSlice';
import { useTodoListFilterSelector } from '../../state/selectors';
import { useAppDispatch } from '../../shared/lib/redux/hooks';

type TodoFiltersProps = {
  className: string;
};

export function TodoFilters({ className }: TodoFiltersProps) {
  const filter = useTodoListFilterSelector();
  const dispatch = useAppDispatch();

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
