import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isLight = resolvedTheme === "light";

  return (
    <button
      className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center  hover:ring-2 ring-gray-400  transition-all"
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
      title={`Switch to ${isLight ? "dark" : "light"} theme`}
      onClick={() => setTheme(isLight ? "dark" : "light")}
    >
      {isLight ? "🌛" : "🌞"}
    </button>
  );
}
