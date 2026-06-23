import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui";
import {
  LayoutDashboard, BookOpen, ArrowLeftRight, Package,
  ClipboardList, Users, Settings, ChevronDown, Bell
} from "lucide-react";

const NAV = [
  { icon: LayoutDashboard, label: "Home",            to: "/dashboard" },
  { icon: BookOpen,        label: "Bookings",        to: "/dashboard/bookings",     badge: 1 },
  { icon: ArrowLeftRight,  label: "Transactions",    to: "/dashboard/transactions" },
  { icon: Package,         label: "Products",        to: "/dashboard/products" },
  { icon: ClipboardList,   label: "Audit Trail",     to: "/dashboard/audit" },
  { icon: Users,           label: "User Management", to: "/dashboard/users" },
  { icon: Settings,        label: "Settings",        to: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[220px] flex-shrink-0 border-r border-[#E5E7EB] flex flex-col bg-white">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#E5E7EB]">
          <Logo />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(({ icon: Icon, label, to, badge }) => (
            <NavLink key={to} to={to} end={to === "/dashboard"}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#F3F4F6] text-[#0D1B2A] border-l-2 border-[#0D1B2A] rounded-l-none"
                  : "text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#0D1B2A]"
              )}>
              <Icon size={17} />
              <span className="flex-1">{label}</span>
              {badge != null && (
                <span className="w-5 h-5 bg-[#E8392A] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Business card */}
        <div className="p-3 border-t border-[#E5E7EB]">
          <div className="bg-[#0D1B2A] rounded-xl p-3 text-white">
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-semibold">BS-123450</span>
            <p className="text-xs font-semibold mt-2">Business Name</p>
            <p className="text-[10px] text-white/60">re***m@gmail.com · <span className="text-white/80">Merchant</span></p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-14 border-b border-[#E5E7EB] flex items-center justify-end px-6 gap-3 bg-white flex-shrink-0">
          <span className="text-sm font-semibold text-[#0D1B2A]">MERCHANT ADMIN</span>
          <div className="w-9 h-9 rounded-full bg-[#E8392A] flex items-center justify-center text-white text-sm font-bold">
            TM
          </div>
          <button className="text-[#6B7280] hover:text-[#0D1B2A]">
            <ChevronDown size={16} />
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-white p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
