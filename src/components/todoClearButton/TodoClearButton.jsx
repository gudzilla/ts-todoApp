import styles from "./TodoClearButton.module.css";
import cx from "classnames";

export function TodoClearButton({ onClearCompleted, className }) {
  return (
    <div className={className}>
      <button className={cx(styles.clearCompletedButton)} onClick={onClearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}
