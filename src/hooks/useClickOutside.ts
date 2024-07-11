import { useEffect } from "react";

export function useClickOutside(
  node: React.MutableRefObject<HTMLElement | null>,
  fn: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (node.current && !node.current.contains(event.target as Node)) {
        fn();
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
}
