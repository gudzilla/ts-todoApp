import styles from "./TodoFooter.module.css";
import cx from "classnames";
import { TodoItemsLeft } from "../todoItemsLeft";
import { TodoFilters } from "../todoFilters";
import { TodoClearButton } from "../todoClearButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/store";
import { removeCompleted } from "../../states/todoList/todoListSlice";

export function TodoFooter() {
  const dispatch = useDispatch<AppDispatch>();

  function handleRemoveCompleted() {
    dispatch(removeCompleted());
  }

  return (
    <footer className={styles.todoFooter}>
      <TodoItemsLeft className={styles.item} />
      <TodoFilters className={cx(styles.item, styles.filters)} />
      <TodoClearButton onClearCompleted={handleRemoveCompleted} className={styles.item} />
    </footer>
  );
}
