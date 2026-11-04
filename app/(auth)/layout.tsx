import { ThemeToggle } from "@/components/common/ThemeToggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeToggle className="fixed right-4 top-4 z-[70]" />
      {children}
    </>
  );
}
