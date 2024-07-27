import styles from "./TodoFooter.module.css";
import cx from "classnames";
import { TodoItemsLeft } from "../todoItemsLeft";
import { TodoFilters } from "../todoFilters";
import { TodoClearButton } from "../todoClearButton";
// ---
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../states/store";
import { removeCompleted } from "../../states/todoList/todoListSlice";
import { FILTERS, FILTERS_PREDICATE } from "../../constants/filters";

// type TodoFooterProps = {
//   undoneCounter: number;
//   onClearCompleted: () => void;
//   filter: string;
//   setFilter: (filterName: string) => void;
// };

export function TodoFooter() {
  const todoList = useSelector((state: RootState) => state.todoList);
  const dispatch = useDispatch<AppDispatch>();

  function handleRemoveCompleted() {
    dispatch(removeCompleted());
  }

  return (
    <footer className={styles.todoFooter}>
      <TodoItemsLeft className={styles.item} />
      <TodoFilters
        // filter={filter}
        // setFilter={setFilter}
        className={cx(styles.item, styles.filters)}
      />
      <TodoClearButton onClearCompleted={handleRemoveCompleted} className={styles.item} />
    </footer>
  );
}
