import styles from "./TodoList.module.css";
import cx from "classnames";
import RemoveIcon from "../../assets/icons/RemoveIcon.svg?react";
import { useState, useRef, useEffect } from "react";
import { ItemEditMode } from "../itemEditMode";

export function TodoList({ list, onToggle, onRemove, onNameChange }) {
  const [editModeId, setEditModeId] = useState(null);
  const [newTodoName, setNewTodoName] = useState("");

  function handleTodoNameChange({ target: { value } }) {
    setNewTodoName(value);
  }

  function handleCancelEditChanges() {
    setEditModeId(null);
  }

  function handleAcceptEditChanges(id, newName) {
    onNameChange(id, newName);
    setEditModeId(null);
  }

  function handleKeyDown({ target: { value }, key, keyCode }) {
    if ((key === "Enter" || keyCode === 13) && value.trim().length > 1) {
      handleAcceptEditChanges(editModeId, value.trim());
    } else if (key === "Escape" || keyCode === 27) {
      handleCancelEditChanges();
    }
  }

  useEffect(() => {
    if (editModeId) {
      const editItemName = list.find((item) => item.id === editModeId).name;
      setNewTodoName(editItemName);
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
