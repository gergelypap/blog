import { useEffect, useState } from "react";

export default function useWindowFocused(): boolean {
  const [focused, setFocused] = useState<boolean>(true);

  useEffect(() => {
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return focused;
}
