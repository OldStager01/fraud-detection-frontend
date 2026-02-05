import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { breadcrumbNameMap } from "@/config";
import { cn } from "@/utils";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumbs on dashboard
  if (pathnames.length <= 1 && pathnames[0] === "dashboard") {
    return null;
  }

  const breadcrumbs = pathnames.map((_, index) => {
    const href = `/${pathnames.slice(0, index + 1).join("/")}`;
    const isLast = index === pathnames.length - 1;
    const name = breadcrumbNameMap[href] || pathnames[index];

    return { href, name, isLast };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center space-x-1 text-sm"
    >
      <Link
        to="/dashboard"
        className="flex items-center text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>

      {breadcrumbs.map(({ href, name, isLast }) => (
        <div key={href} className="flex items-center">
          <ChevronRight className="h-4 w-4 text-neutral-400 dark:text-neutral-600 mx-1" />
          {isLast ? (
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {name}
            </span>
          ) : (
            <Link
              to={href}
              className={cn(
                "text-neutral-500 hover:text-neutral-700",
                "dark:text-neutral-400 dark:hover:text-neutral-200",
                "transition-colors",
              )}
            >
              {name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
