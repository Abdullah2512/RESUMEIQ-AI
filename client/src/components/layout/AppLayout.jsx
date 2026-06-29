import { NavLink, Outlet } from "react-router-dom";
import { BarChart3, Bot, FileText, LogOut, Moon, Search, Settings, Sparkles, Sun, Upload } from "lucide-react";
import { Button } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { cn } from "../../lib/cn";

const nav = [
  { to: "/app", label: "Dashboard", icon: BarChart3 },
  { to: "/app/analyze", label: "Analyze", icon: Upload },
  { to: "/app/history", label: "History", icon: FileText },
  { to: "/app/coach", label: "Coach", icon: Bot },
  { to: "/app/profile", label: "Profile", icon: Settings }
];

export function AppLayout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-shell min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-line bg-panel/70 p-4 backdrop-blur-xl lg:block">
        <div className="flex items-center gap-2 px-2 text-lg font-bold text-text">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-white dark:bg-white dark:text-ink">
            <Sparkles className="h-4 w-4" />
          </span>
          ResumeIQ AI
        </div>
        <nav className="mt-8 space-y-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/app"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-zinc-100 hover:text-text dark:hover:bg-zinc-900",
                  isActive && "bg-zinc-100 text-text dark:bg-zinc-900"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute inset-x-4 bottom-4 space-y-3">
          <div className="rounded-lg border border-line p-3">
            <p className="truncate text-sm font-semibold text-text">{user?.name}</p>
            <p className="truncate text-xs text-muted">{user?.email}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="w-10 px-0" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" className="flex-1" onClick={logout}>
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </aside>

      <main className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-line bg-panel/80 px-4 py-3 backdrop-blur-xl lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div className="relative hidden flex-1 md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input className="focus-ring h-10 w-full rounded-lg border border-line bg-panel pl-10 pr-3 text-sm" placeholder="Search resumes, roles, and keywords" />
            </div>
            <div className="flex w-full items-center justify-between lg:w-auto">
              <div className="lg:hidden">
                <span className="font-bold text-text">ResumeIQ AI</span>
              </div>
              <LinkSet />
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function LinkSet() {
  return (
    <div className="flex items-center gap-1 lg:hidden">
      {nav.slice(0, 4).map((item) => (
        <NavLink key={item.to} to={item.to} end={item.to === "/app"} className="rounded-lg p-2 text-muted hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <item.icon className="h-5 w-5" />
        </NavLink>
      ))}
    </div>
  );
}
