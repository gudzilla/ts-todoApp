import styles from './TodoApp.module.css';
import { AddTodoForm } from '../addTodoForm';
import { TodoList } from '../todoList';
import { TodoFooter } from '../todoFooter';
import { useSelector } from 'react-redux';

export function TodoApp() {
  const todoList = useSelector((state: RootState) => state.todoList);
  const hasItems = todoList.length > 0;

  return (
    <section className={styles.todoSection}>
      <h1 className={styles.todoHeader}>todos:</h1>
      <div className={styles.todo}>
        <AddTodoForm />
        <TodoList />
        {hasItems && <TodoFooter />}
      </div>
    </section>
  );
}
