import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/ui";

interface AuthLayoutProps {
  children: ReactNode;
  showSupportInNav?: boolean;
}

export default function AuthLayout({ children, showSupportInNav = true }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
      {/* Nav */}
      <header className="bg-white border-b border-[#E5E7EB] h-14 flex items-center justify-between px-6">
        <Logo />
        {showSupportInNav && (
          <span className="text-sm text-[#6B7280]">
            Having an issue?{" "}
            <Link to="#" className="font-bold text-[#0D1B2A] hover:underline">Support</Link>
          </span>
        )}
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </div>

      {/* Footer */}
      <div className="py-4 px-6 flex justify-between items-center text-sm">
        <span className="text-[#6B7280]">
          Any trouble?{" "}
          <Link to="#" className="font-bold text-[#0D1B2A]">Contact support</Link>
        </span>
        <div className="flex gap-4 text-[#6B7280]">
          <Link to="#" className="hover:text-[#0D1B2A]">Privacy</Link>
          <span>|</span>
          <Link to="#" className="hover:text-[#0D1B2A]">Terms</Link>
        </div>
      </div>
    </div>
  );
}
