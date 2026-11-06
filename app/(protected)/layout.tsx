import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProtectedContent } from "@/components/layout/ProtectedContent";
import { WelcomeBanner } from "@/components/common/WelcomeBanner";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="portal-shell flex min-h-screen flex-col bg-background">
      <Navbar />
      <main
        className="flex-1 p-6 
          bg-[#F4F2FF] 
          bg-[linear-gradient(to_right,rgba(124,58,237,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(124,58,237,0.08)_1px,transparent_1px)] 
          bg-[size:120px_120px] 
          dark:bg-[#0B0B0E] 
          dark:bg-[linear-gradient(to_right,rgba(168,85,247,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.12)_1px,transparent_1px)] 
          dark:bg-[size:120px_120px]"
      >
        <WelcomeBanner />
        <ProtectedContent>{children}</ProtectedContent>
      </main>
      <Footer />
    </div>
  );
}