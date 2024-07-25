import { activeTodosCountSelector } from '../../state/todoList/todoListSlice';
import { useAppSelector } from '../../shared/lib/redux/hooks';

type TodoItemsLeftProps = {
  className: string;
};
export function TodoItemsLeft({ className }: TodoItemsLeftProps) {
  const undoneTodosCount = useAppSelector(activeTodosCountSelector);

  return <span className={className}>{undoneTodosCount} items left!</span>;
}
