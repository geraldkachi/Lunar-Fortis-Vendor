import { ReactNode } from "react";

export default function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-modal overflow-hidden">
      <div className="h-1.5 bg-[#0D1B2A]" />
      <div className="p-8">{children}</div>
    </div>
  );
}
