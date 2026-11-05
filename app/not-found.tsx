import Link from "next/link";
import { APP_ROUTES } from "@/lib/constants";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
      <ThemeToggle className="fixed right-4 top-4" />
      <h1 className="text-2xl font-semibold text-foreground">Page not found</h1>
      <p className="text-sm text-muted-foreground">
        The page you are looking for does not exist or has moved.
      </p>
      <Link href={APP_ROUTES.dashboard} className="text-sm font-medium text-primary underline">
        Go back home
      </Link>
    </div>
  );
}
