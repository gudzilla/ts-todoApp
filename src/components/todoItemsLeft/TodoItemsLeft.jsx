import cx from "classnames";

export function TodoItemsLeft({ undoneCounter, className }) {
  return <span className={className}>{undoneCounter} items left!</span>;
}
