import styles from "./TodoApp.module.css";
import cx from "classnames";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { AddTodoForm } from "../addTodoForm";
import { TodoList } from "../todoList";
import { TodoFooter } from "../todoFooter";
import { FILTERS, FILTERS_PREDICATE } from "../../constants/filters";
// ----------
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";

// type TodoItem = {
//   id: string;
//   isDone: boolean;
//   name: string;
// };

export function TodoApp() {
  // const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const todoList = useSelector((state: RootState) => state.todoList);
  const hasItems = todoList.length > 0;

  // FILTER RELATED STUFF
  const [todoListFilter, setTodoListFilter] = useState(FILTERS.all);
  // MOVE IT LOWER
  const undoneItemsCount = todoList.filter(FILTERS_PREDICATE[FILTERS.active]).length;

  // DELETE
  // function handleCheckItem(id: string) {
  //   const newList = todoList.map((item) => {
  //     if (item.id !== id) {
  //       return item;
  //     }
  //     return {
  //       ...item,
  //       isDone: !item.isDone,
  //     };
  //   });

  //   setTodoList(newList);
  // }

  // DELETE
  // function handleRemoveItem(id: string) {
  //   setTodoList(todoList.filter((item) => item.id !== id));
  // }

  // DELETE
  // function handleAddNewTodo(name: string) {
  //   const newList: TodoItem[] = [
  //     ...todoList,
  //     {
  //       id: uuidv4(),
  //       isDone: false,
  //       name,
  //     },
  //   ];
  //   setTodoList(newList);
  // }

  // DELETE
  // function toogleAllTodos() {
  // const haveUndoneItems = todoList.some((todoItem) => !todoItem.isDone);
  // const newList = todoList.map((todoItem) => ({
  //   ...todoItem,
  //   isDone: haveUndoneItems,
  // }));

  // setTodoList(newList);
  // }

  // DELETE
  // function handleRemoveCompletedItems() {
  //   const newList = todoList.filter((todoItem) => !todoItem.isDone);
  //   setTodoList(newList);
  // }

  // DELETE
  // function handleItemNameChange(id: string, newName: string) {
  //   const newList = todoList.map((todoItem) => {
  //     if (todoItem.id === id) {
  //       return {
  //         ...todoItem,
  //         name: newName,
  //       };
  //     } else {
  //       return todoItem;
  //     }
  //   });
  //   setTodoList(newList);
  // }

  // function CompleteAllButton() {
  //   return (
  //     <button
  //       className={cx(styles.completeButton, { [styles.onAllDone]: isListCompleted })}
  //       onClick={()=> {
  //         dispatch(toggleAllCheckboxes());
  //       }}
  //     >
  //       <span className={styles.completeButtonIcon}>❯</span>
  //     </button>
  //   );
  // }

  return (
    <section className={styles.todoSection}>
      <h1 className={styles.todoHeader}>todos:</h1>
      <div className={styles.todo}>
        <AddTodoForm />
        <TodoList />
        {hasItems && (
          <TodoFooter
          // undoneCounter={undoneItemsCount}
          // onClearCompleted={handleRemoveCompletedItems}
          // filter={todoListFilter}
          // setFilter={setTodoListFilter}
          />
        )}
      </div>
    </section>
  );
}
