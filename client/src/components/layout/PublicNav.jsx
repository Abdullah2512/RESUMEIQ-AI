import { Link } from "react-router-dom";
import { Moon, Sparkles, Sun } from "lucide-react";
import { Button } from "../ui/Button";
import { useTheme } from "../../context/ThemeContext";

export function PublicNav() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-line bg-panel/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-text">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-white dark:bg-white dark:text-ink">
            <Sparkles className="h-4 w-4" />
          </span>
          ResumeIQ AI
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="w-10 px-0" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Link to="/login">
            <Button variant="secondary">Sign in</Button>
          </Link>
          <Link to="/register" className="hidden sm:block">
            <Button>Start free</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
