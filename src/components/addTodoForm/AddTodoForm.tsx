import styles from "./AddTodoForm.module.css";
import { useState, useRef } from "react";
//  -----------
import { addNewTodo } from "../../state/todoList/todoListSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";

type AddTodoFormProps = {
  onSubmit: (name: string) => void;
  hasItems: boolean;
  completeButtonNode: JSX.Element;
};

export function AddTodoForm({
  onSubmit,
  hasItems,
  completeButtonNode,
}: AddTodoFormProps) {
  // local state
  const [newTodoValue, setNewTodoValue] = useState("");
  const newTodoInput = useRef(null);

  // --- REDUX

  const dispatch = useDispatch<AppDispatch>();

  // -------------
  const handleKeyDown = (event: EventFor<"input", "onKeyDown">) => {
    const trimmedValue = newTodoValue.trim();
    if (event.key === "Enter") {
      if (trimmedValue.length > 1) {
        onSubmit(newTodoValue.trim());
        // ------
        dispatch(addNewTodo(trimmedValue));
        setNewTodoValue("");
      }
    }
  };

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
      {hasItems && completeButtonNode}
    </div>
  );
}
