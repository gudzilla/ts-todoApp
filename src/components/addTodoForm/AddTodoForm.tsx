import styles from "./AddTodoForm.module.css";
import { useState, useRef } from "react";
import cx from "classnames";
//  -----------
import { addNewTodo, toggleAllCheckboxes } from "../../states/todoList/todoListSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../states/store";
import { FILTERS, FILTERS_PREDICATE } from "../../constants/filters";

export function AddTodoForm() {
  const [newTodoValue, setNewTodoValue] = useState("");
  const newTodoInput = useRef(null);

  const todoList = useSelector((state: RootState) => state.todoList);
  const dispatch = useDispatch<AppDispatch>();

  const hasItems = todoList.length > 0;
  const isListCompleted = todoList.every(FILTERS_PREDICATE[FILTERS.completed]);

  const handleKeyDown = (event: EventFor<"input", "onKeyDown">) => {
    const trimmedValue = newTodoValue.trim();
    if (event.key === "Enter") {
      if (trimmedValue.length > 1) {
        dispatch(addNewTodo({ todoName: trimmedValue }));
        setNewTodoValue("");
      }
    }
  };

  function CompleteAllButton() {
    return (
      <button
        className={cx(styles.completeButton, { [styles.onAllDone]: isListCompleted })}
        onClick={() => {
          dispatch(toggleAllCheckboxes());
        }}
      >
        <span className={styles.completeButtonIcon}>❯</span>
      </button>
    );
  }

  return (
    <div className={styles.newTodo}>
      <input
        autoFocus={true}
        ref={newTodoInput}
        type="text"
        placeholder="What needs to be done?"
        className={styles.inputNewTodo}
        value={newTodoValue}
        onChange={({ target: { value } }) => {
          setNewTodoValue(value);
        }}
        onKeyDown={handleKeyDown}
      />
      {hasItems && <CompleteAllButton />}
    </div>
  );
}
