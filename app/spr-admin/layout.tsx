import type { Metadata } from "next";
import { Providers } from "@/spr-admin/providers/Providers";
import { AdminThemeProvider } from "@/spr-admin/providers/AdminThemeProvider";
import "./admin.css";

export const metadata: Metadata = {
  title: "SPR Admin | NEXORAX",
};

export default function SprAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminThemeProvider>
      <Providers>{children}</Providers>
    </AdminThemeProvider>
  );
}
