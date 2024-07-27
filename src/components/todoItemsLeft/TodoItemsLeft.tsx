import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { FILTERS, FILTERS_PREDICATE } from "../../constants/filters";

type TodoItemsLeftProps = {
  className: string;
};
export function TodoItemsLeft({ className }: TodoItemsLeftProps) {
  const todoList = useSelector((state: RootState) => state.todoList);

  const undoneItemsCount = todoList.filter(FILTERS_PREDICATE[FILTERS.active]).length;

  return <span className={className}>{undoneItemsCount} items left!</span>;
}
