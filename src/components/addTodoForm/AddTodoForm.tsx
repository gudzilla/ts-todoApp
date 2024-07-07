import styles from "./AddTodoForm.module.css";
import { useState, useRef } from "react";

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
  const [newTodoValue, setNewTodoValue] = useState("");
  const newTodoInput = useRef(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const target = event.target as HTMLInputElement;
      if (target.value.trim().length > 1) {
        onSubmit(newTodoValue.trim());
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
        onChange={(e) => {
          setNewTodoValue(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      {hasItems && completeButtonNode}
    </div>
  );
}
