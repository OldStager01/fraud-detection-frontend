import { Menu, Bell } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setSidebarOpen } from "@/store/slices/uiSlice";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ThemeToggle from "@/components/common/ThemeToggle";
import UserMenu from "@/components/common/UserMenu";

export default function Header() {
  const dispatch = useAppDispatch();
  const sidebarCollapsed = useAppSelector((state) => state.ui.sidebarCollapsed);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-200 bg-white/80 backdrop-blur-sm px-4 dark:border-neutral-800 dark:bg-neutral-900/80">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => dispatch(setSidebarOpen(true))}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>

        {/* Breadcrumbs */}
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-danger-500 text-[10px] font-medium text-white flex items-center justify-center">
                3
              </span>
              <span className="sr-only">Notifications</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Notifications</p>
          </TooltipContent>
        </Tooltip>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  );
}
