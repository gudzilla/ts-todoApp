import styles from "./TodoList.module.css";
import cx from "classnames";
import RemoveIcon from "../../assets/icons/RemoveIcon.svg?react";
import { useState, useEffect } from "react";
import { ItemEditMode } from "../itemEditMode";
// ---
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { removeTodo, toogleItemCheckbox } from "../../state/todoList/todoListSlice";

type TodoItem = {
  id: string;
  isDone: boolean;
  name: string;
};
type TodoListProps = {
  list: TodoItem[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onNameChange: (id: string, newName: string) => void;
};

export function TodoList({ list = [], onToggle, onRemove, onNameChange }: TodoListProps) {
  const [editModeId, setEditModeId] = useState<string | null>(null);
  const [newTodoName, setNewTodoName] = useState("");
  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const reduxList = useSelector((state: RootState) => state.todoList);

  function handleTodoNameChange({ target: { value } }: EventFor<"input", "onChange">) {
    setNewTodoName(value);
  }

  function handleCancelEditChanges() {
    setEditModeId(null);
  }

  function handleAcceptEditChanges(id: string, newName: string) {
    onNameChange(id, newName);
    setEditModeId(null);
  }

  function handleKeyDown(event: EventFor<"input", "onKeyDown">) {
    const { value } = event.target as HTMLInputElement;
    const { key } = event;
    const trimmedValue = value.trim();

    if (key === "Enter" && trimmedValue.length > 1 && editModeId !== null) {
      handleAcceptEditChanges(editModeId, trimmedValue);
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
              // onDoubleClick={() => {
              //   setEditModeId(item.id);
              // }}
            >
              <input
                type="checkbox"
                className={styles.itemCheckbox}
                checked={item.isDone}
                onChange={() => {
                  onToggle(item.id);
                  // REDUX
                  dispatch(toogleItemCheckbox(item.id));
                }}
              />
              <label className={styles.todoName}>{item.name}</label>
              <button
                className={styles.removeButton}
                onClick={() => {
                  onRemove(item.id);
                  dispatch(removeTodo(item.id));
                }}
              >
                <RemoveIcon className={styles.removeIcon} />
              </button>
            </div>

            {/* EDIT MODE FOR TODO ITEM */}
            {/* {item.id === editModeId && (
              <ItemEditMode
                value={newTodoName}
                onChange={handleTodoNameChange}
                onKeyDown={handleKeyDown}
                onCancel={handleCancelEditChanges}
              />
            )} */}
          </li>
        );
      })}
    </ul>
  );
}
