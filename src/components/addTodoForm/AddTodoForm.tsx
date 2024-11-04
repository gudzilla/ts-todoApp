import styles from './AddTodoForm.module.css';
import { useState, useRef } from 'react';
import cx from 'classnames';
import { addNewTodo, toggleAllDone } from '../../state/todoList/todoListSlice';
import { FILTERS, FILTERS_PREDICATE } from '../../constants/filters';
import { useTodoListSelector } from '../../state/selectors';
import { useAppDispatch } from '../../shared/lib/redux/hooks';

export function AddTodoForm() {
  const [newTodoValue, setNewTodoValue] = useState('');
  const newTodoInput = useRef(null);

  const todoList = useTodoListSelector();
  const dispatch = useAppDispatch();

  const hasItems = todoList.length > 0;
  const isListCompleted = todoList.every(FILTERS_PREDICATE[FILTERS.completed]);

  const handleKeyDown = (event: EventFor<'input', 'onKeyDown'>) => {
    const trimmedValue = newTodoValue.trim();
    if (event.key === 'Enter') {
      if (trimmedValue.length > 1) {
        dispatch(addNewTodo({ todoName: trimmedValue }));
        setNewTodoValue('');
      }
    }
  };

  return (
    <div className={styles.newTodo}>
      <input
        autoFocus={true}
        ref={newTodoInput}
        type='text'
        placeholder='What needs to be done?'
        className={styles.inputNewTodo}
        value={newTodoValue}
        onChange={({ target: { value } }) => {
          setNewTodoValue(value);
        }}
        onKeyDown={handleKeyDown}
      />
      {hasItems && (
        <button
          className={cx(styles.completeButton, { [styles.onAllDone]: isListCompleted })}
          onClick={() => {
            dispatch(toggleAllDone());
          }}
        >
          <span className={styles.completeButtonIcon}>❯</span>
        </button>
      )}
    </div>
  );
}
