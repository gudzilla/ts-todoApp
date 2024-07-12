import styles from "./TodoApp.module.css";
import cx from "classnames";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { AddTodoForm } from "../addTodoForm";
import { TodoList } from "../todoList";
import { TodoFooter } from "../todoFooter";
import { FILTERS, FILTERS_PREDICATE } from "../../constants/filters";

type TodoItem = {
  id: string;
  isDone: boolean;
  name: string;
};

export function TodoApp() {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [todoListFilter, setTodoListFilter] = useState(FILTERS.all);
  const undoneItemsCount = todoList.filter(FILTERS_PREDICATE[FILTERS.active]).length;
  const hasItems = todoList.length > 0;
  const isListCompleted = todoList.every(FILTERS_PREDICATE[FILTERS.completed]);

  let renderList = todoList.filter(FILTERS_PREDICATE[todoListFilter]);

  function handleCheckItem(id: string) {
    const newList = todoList.map((item) => {
      if (item.id !== id) {
        return item;
      }
      return {
        ...item,
        isDone: !item.isDone,
      };
    });

    setTodoList(newList);
  }

  function handleRemoveItem(id: string) {
    setTodoList(todoList.filter((item) => item.id !== id));
  }

  function handleAddNewTodo(name: string) {
    const newList: TodoItem[] = [
      ...todoList,
      {
        id: uuidv4(),
        isDone: false,
        name,
      },
    ];
    setTodoList(newList);
  }

  function handleCheckAllOrUncheckAll() {
    const haveUndoneItems = todoList.some((todoItem) => !todoItem.isDone);
    const newList = todoList.map((todoItem) => ({
      ...todoItem,
      isDone: haveUndoneItems,
    }));

    setTodoList(newList);
  }

  function handleRemoveCompletedItems() {
    const newList = todoList.filter((todoItem) => !todoItem.isDone);
    setTodoList(newList);
  }

  function handleItemNameChange(id: string, newName: string) {
    const newList = todoList.map((todoItem) => {
      if (todoItem.id === id) {
        return {
          ...todoItem,
          name: newName,
        };
      } else {
        return todoItem;
      }
    });
    setTodoList(newList);
  }

  function CompleteAllButton() {
    return (
      <button
        className={cx(styles.completeButton, { [styles.onAllDone]: isListCompleted })}
        onClick={handleCheckAllOrUncheckAll}
      >
        <span className={styles.completeButtonIcon}>❯</span>
      </button>
    );
  }

  return (
    <section className={styles.todoSection}>
      <h1 className={styles.todoHeader}>todos:</h1>
      <div className={styles.todo}>
        <AddTodoForm
          onSubmit={handleAddNewTodo}
          hasItems={hasItems}
          completeButtonNode={<CompleteAllButton />}
        />
        <TodoList
          list={renderList}
          onToggle={handleCheckItem}
          onRemove={handleRemoveItem}
          onNameChange={handleItemNameChange}
        />
        {hasItems && (
          <TodoFooter
            undoneCounter={undoneItemsCount}
            onClearCompleted={handleRemoveCompletedItems}
            filter={todoListFilter}
            setFilter={setTodoListFilter}
          />
        )}
      </div>
    </section>
  );
}
