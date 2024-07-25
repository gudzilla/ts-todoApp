import styles from './TodoApp.module.css';
import { AddTodoForm } from '../addTodoForm';
import { TodoList } from '../todoList';
import { TodoFooter } from '../todoFooter';
import { useTodoListSelector } from '../../state/selectors';

export function TodoApp() {
  const todoList = useTodoListSelector();
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
