import styles from "./AddTodoForm.module.css";
import { useState, useRef } from "react";

export function AddTodoForm({ onSubmit, hasItems, completeButtonNode }) {
  const [newTodoValue, setNewTodoValue] = useState("");

  function handleKeyDown(e) {
    if (e.key === "Enter" && e.target.value.trim().length > 1) {
      onSubmit(newTodoValue.trim());
      setNewTodoValue("");
    }
  }

  return (
    <div className={styles.newTodo}>
      <input
        autoFocus={true}
        type="text"
        placeholder="What needs to be done?"
        className={styles.inputNewTodo}
        value={newTodoValue}
        onChange={(e) => {
          setNewTodoValue(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      {hasItems && completeButtonNode}
    </div>
  );
}
