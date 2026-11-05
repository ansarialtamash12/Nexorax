"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/ErrorState";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <ThemeToggle className="fixed right-4 top-4" />
      <ErrorState
        title="Unexpected error"
        description="An unexpected error occurred. You can try again."
        onRetry={reset}
      />
    </div>
  );
}
