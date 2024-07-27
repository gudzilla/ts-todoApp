import styles from "./TodoList.module.css";
import cx from "classnames";
import RemoveIcon from "../../assets/icons/RemoveIcon.svg?react";
import { useState, useEffect } from "react";
import { ItemEditMode } from "../itemEditMode";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../states/store";
import {
  editTodoName,
  removeTodo,
  toogleItemCheckbox,
} from "../../states/todoList/todoListSlice";
import { FilterNames, FILTERS_PREDICATE } from "../../constants/filters";
import { TodoItem } from "../../types";

export function TodoList() {
  const [editModeId, setEditModeId] = useState<string | null>(null);
  const [newTodoName, setNewTodoName] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const todoList = useSelector((state: RootState) => state.todoList);
  const todoListFilter = useSelector((state: RootState) => state.filter);

  let renderList = filterTodoListForRender(todoList, todoListFilter);

  function filterTodoListForRender(list: TodoItem[], filter: FilterNames): TodoItem[] {
    return list.filter(FILTERS_PREDICATE[filter]);
  }

  function handleTodoNameChange({ target: { value } }: EventFor<"input", "onChange">) {
    setNewTodoName(value);
  }

  function handleCancelEditChanges() {
    setEditModeId(null);
  }

  function handleAcceptEditChanges(id: string, newName: string) {
    dispatch(
      editTodoName({
        editId: id,
        newName,
      })
    );
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
      const editItem = todoList.find((item) => item.id === editModeId);
      if (editItem) {
        setNewTodoName(editItem.name);
      }
    } else {
      setNewTodoName("");
    }
  }, [editModeId]);

  return (
    <ul className={styles.ul}>
      {renderList.map((item) => {
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
                onChange={(e) => {
                  dispatch(toogleItemCheckbox({ toggleId: item.id }));
                }}
              />
              <label className={styles.todoName}>{item.name}</label>
              <button
                className={styles.removeButton}
                onClick={() => {
                  dispatch(removeTodo({ removeId: item.id }));
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
