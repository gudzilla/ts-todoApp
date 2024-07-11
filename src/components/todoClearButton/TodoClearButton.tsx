import styles from "./TodoClearButton.module.css";
import cx from "classnames";

type TodoClearButtonProps = {
  onClearCompleted: () => void;
  className: string;
};

export function TodoClearButton({ onClearCompleted, className }: TodoClearButtonProps) {
  return (
    <div className={className}>
      <button className={cx(styles.clearCompletedButton)} onClick={onClearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}
