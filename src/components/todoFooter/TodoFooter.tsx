import styles from "./TodoFooter.module.css";
import cx from "classnames";
import { TodoItemsLeft } from "../todoItemsLeft";
import { TodoFilters } from "../todoFilters";
import { TodoClearButton } from "../todoClearButton";
// ---
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { removeCompleted } from "../../state/todoList/todoListSlice";

type TodoFooterProps = {
  undoneCounter: number;
  onClearCompleted: () => void;
  filter: string;
  setFilter: (filterName: string) => void;
};

export function TodoFooter({
  undoneCounter,
  onClearCompleted,
  filter,
  setFilter,
}: TodoFooterProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <footer className={styles.todoFooter}>
      <TodoItemsLeft undoneCounter={undoneCounter} className={styles.item} />
      <TodoFilters
        filter={filter}
        setFilter={setFilter}
        className={cx(styles.item, styles.filters)}
      />
      <TodoClearButton
        onClearCompleted={() => {
          onClearCompleted();
          // redux
          dispatch(removeCompleted());
        }}
        className={styles.item}
      />
    </footer>
  );
}
