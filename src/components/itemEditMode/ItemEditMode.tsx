import { useRef, useEffect } from "react";
import styles from "./ItemEditMode.module.css";
import { useClickOutside } from "../../hooks/useClickOutside";

type ItemEditModeProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onCancel: () => void;
};

export function ItemEditMode({
  value,
  onChange,
  onKeyDown,
  onCancel,
}: ItemEditModeProps) {
  const inputRef = useRef(null);

  useClickOutside(inputRef, onCancel);

  return (
    <div className={styles.itemEdit}>
      <input
        ref={inputRef}
        autoFocus={true}
        type="text"
        value={value}
        className={styles.itemEditInput}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onCancel}
      />
    </div>
  );
}
