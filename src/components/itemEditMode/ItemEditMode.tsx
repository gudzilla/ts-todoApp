import { useRef, useEffect } from "react";
import styles from "./ItemEditMode.module.css";
import { useClickOutside } from "../../hooks/useClickOutside";

type ItemEditModeProps = {
  value: string;
  onChange: (event: EventFor<"input", "onChange">) => void;
  onKeyDown: (event: EventFor<"input", "onKeyDown">) => void;
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
