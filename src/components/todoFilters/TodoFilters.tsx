import styles from "./TodoFilters.module.css";
import cx from "classnames";

type TodoFiltersProps = {
  filter: "all" | "active" | "completed";
  setFilter: (filterName: string) => void;
  className: string;
};

export function TodoFilters({ filter, setFilter, className }: TodoFiltersProps) {
  return (
    <div className={cx(className, styles.filtersContent)}>
      <button
        className={cx(styles.filter, { [styles.filterSelected]: filter === "all" })}
        onClick={() => {
          setFilter("all");
        }}
      >
        All
      </button>
      <button
        className={cx(styles.filter, { [styles.filterSelected]: filter === "active" })}
        onClick={() => {
          setFilter("active");
        }}
      >
        Active
      </button>
      <button
        className={cx(styles.filter, { [styles.filterSelected]: filter === "completed" })}
        onClick={() => {
          setFilter("completed");
        }}
      >
        Completed
      </button>
    </div>
  );
}
