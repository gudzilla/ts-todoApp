import styles from './TodoFooter.module.css';
import cx from 'classnames';
import { TodoItemsLeft } from '../todoItemsLeft';
import { TodoFilters } from '../todoFilters';
import { TodoClearButton } from '../todoClearButton';
import { removeCompleted } from '../../state/todoList/todoListSlice';
import { useAppDispatch } from '../../shared/lib/redux/hooks';

export function TodoFooter() {
  const dispatch = useAppDispatch();

  function handleRemoveCompleted() {
    dispatch(removeCompleted());
  }

  return (
    <footer className={styles.todoFooter}>
      <TodoItemsLeft className={styles.item} />
      <TodoFilters className={cx(styles.item, styles.filters)} />
      <TodoClearButton onClearCompleted={handleRemoveCompleted} className={styles.item} />
    </footer>
  );
}
