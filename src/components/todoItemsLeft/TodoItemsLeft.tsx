import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { selectActiveTodoCount } from "../../states/todoList/todoListSlice";

type TodoItemsLeftProps = {
  className: string;
};
export function TodoItemsLeft({ className }: TodoItemsLeftProps) {
  const undoneTodosCount = useSelector((state: RootState) =>
    selectActiveTodoCount(state)
  );

  return <span className={className}>{undoneTodosCount} items left!</span>;
}
