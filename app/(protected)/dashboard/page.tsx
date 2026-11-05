"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SummaryCards } from "@/features/dashboard/components/SummaryCards";
import { Banner } from "@/features/dashboard/components/Banner";
import { QuickActions } from "@/features/dashboard/components/QuickActions";
import { GlobalInfrastructure } from "@/features/dashboard/components/GlobalInfrastructure";
import { RecentActivity } from "@/features/dashboard/components/RecentActivity";

export default function DashboardPage() {
  const router = useRouter();
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    let active = true;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    async function waitForSession() {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
          credentials: "same-origin",
        });

        if (response.ok) {
          if (active) setSessionReady(true);
          return;
        }

        if (response.status === 401) {
          const result: unknown = await response.json();
          const message =
            typeof result === "object" &&
            result !== null &&
            "message" in result &&
            typeof result.message === "string"
              ? result.message
              : "";

          if (message !== "Not authenticated" && message !== "No token in session") {
            router.replace("/login");
            return;
          }
        }
      } catch (error) {
        if (active) {
          console.error("Could not check dashboard session:", error);
        }
      }

      if (active) {
        retryTimer = setTimeout(waitForSession, 1200);
      }
    }

    void waitForSession();

    return () => {
      active = false;
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [router]);

  if (!sessionReady) {
    return (
      <div
        role="status"
        className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center"
      >
        <span className="h-9 w-9 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
        <p className="text-sm text-muted-foreground">
          Connecting your session. Please wait...
        </p>
      </div>
    );
  }

  return (
    <>
      <Banner />
      <SummaryCards />
      <QuickActions />
      <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
        <GlobalInfrastructure />
        <RecentActivity />
      </div>
    </>
  );
}
