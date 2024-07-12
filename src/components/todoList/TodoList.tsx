import styles from "./TodoList.module.css";
import cx from "classnames";
import RemoveIcon from "../../assets/icons/RemoveIcon.svg?react";
import { useState, useEffect } from "react";
import { ItemEditMode } from "../itemEditMode";

type TodoItem = {
  id: number;
  isDone: boolean;
  name: string;
};
type TodoListProps = {
  list: TodoItem[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onNameChange: (id: number, newName: string) => void;
};

export function TodoList({ list = [], onToggle, onRemove, onNameChange }: TodoListProps) {
  const [editModeId, setEditModeId] = useState<number | null>(null);
  const [newTodoName, setNewTodoName] = useState("");

  function handleTodoNameChange({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) {
    setNewTodoName(value);
  }

  function handleCancelEditChanges() {
    setEditModeId(null);
  }

  function handleAcceptEditChanges(id: number, newName: string) {
    onNameChange(id, newName);
    setEditModeId(null);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const { value } = event.target as HTMLInputElement;
    const { key } = event;

    if (key === "Enter" && value.trim().length > 1) {
      if (editModeId !== null) {
        handleAcceptEditChanges(editModeId, value.trim());
      }
    } else if (key === "Escape") {
      handleCancelEditChanges();
    }
  }

  useEffect(() => {
    if (editModeId) {
      const editItem = list.find((item) => item.id === editModeId);
      if (editItem) {
        setNewTodoName(editItem.name);
      }
    } else {
      setNewTodoName("");
    }
  }, [editModeId]);

  return (
    <ul className={styles.ul}>
      {list.map((item) => {
        return (
          <li key={item.id} className={styles.item}>
            <div
              className={cx(
                { [styles.done]: item.isDone },
                { [styles.hidden]: item.id === editModeId }
              )}
              onDoubleClick={() => {
                setEditModeId(item.id);
              }}
            >
              <input
                type="checkbox"
                className={styles.itemCheckbox}
                checked={item.isDone}
                onChange={() => {
                  onToggle(item.id);
                }}
              />
              <label className={styles.todoName}>{item.name}</label>
              <button
                className={styles.removeButton}
                onClick={() => {
                  onRemove(item.id);
                }}
              >
                <RemoveIcon className={styles.removeIcon} />
              </button>
            </div>

            {/* EDIT MODE FOR TODO ITEM */}
            {item.id === editModeId && (
              <ItemEditMode
                value={newTodoName}
                onChange={handleTodoNameChange}
                onKeyDown={handleKeyDown}
                onCancel={handleCancelEditChanges}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
