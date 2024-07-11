type TodoItemsLeftProps = {
  undoneCounter: number;
  className: string;
};
export function TodoItemsLeft({ undoneCounter, className }: TodoItemsLeftProps) {
  return <span className={className}>{undoneCounter} items left!</span>;
}
