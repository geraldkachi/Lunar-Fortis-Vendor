import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight, X, AlertTriangle, Info } from "lucide-react";

// ── Logo ──────────────────────────────────────────────────────────────────────
export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <div className={cn("flex items-center gap-2", size === "sm" ? "gap-1.5" : "gap-2")}>
      <div className={cn("bg-[#0D1B2A] rounded-sm", size === "sm" ? "w-4 h-4" : "w-5 h-5")} />
      <span className={cn("font-bold text-[#0D1B2A]", size === "sm" ? "text-base" : "text-lg")}>
        Lunar Fortis
      </span>
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
type BadgeVariant = "success" | "pending" | "failed" | "ongoing" | "declined" | "active" | "inactive" | (string & {});
export function Badge({ variant, label }: { variant: BadgeVariant; label?: string }) {
  // const map: Record<BadgeVariant, { cls: string; dot: string; text: string }> = {
  const map: Record<string, { cls: string; dot: string; text: string }> = {
    success:  { cls: "badge-success", dot: "bg-[#10B981]", text: label ?? "Successful" },
    pending:  { cls: "badge-pending", dot: "bg-[#F59E0B]", text: label ?? "Pending" },
    failed:   { cls: "badge-failed",  dot: "bg-[#EF4444]", text: label ?? "Failed" },
    ongoing:  { cls: "badge-ongoing", dot: "bg-[#3B82F6]", text: label ?? "Ongoing" },
    declined: { cls: "badge-declined",dot: "bg-[#EF4444]", text: label ?? "Declined" },
    active:   { cls: "badge-active",  dot: "bg-[#10B981]", text: label ?? "Active" },
    inactive: { cls: "badge-inactive",dot: "bg-[#6B7280]", text: label ?? "Inactive" },
    disabled: { cls: "badge-disabled",dot: "bg-[#9CA3AF]", text: label ?? "Disabled" }, // Add this
    completed: { cls: "badge-success", dot: "bg-[#10B981]", text: label ?? "Completed" },
    paid: { cls: "badge-success", dot: "bg-[#10B981]", text: label ?? "Paid" },
    refunded: { cls: "badge-failed", dot: "bg-[#EF4444]", text: label ?? "Refunded" },
    cancelled: { cls: "badge-declined", dot: "bg-[#EF4444]", text: label ?? "Cancelled" },
  };
    const fallback = { cls: "badge-inactive", dot: "bg-[#6B7280]", text: label ?? String(variant) };
  const { cls, dot, text } = map[variant] ?? fallback;
  return (
    <span className={cls}>
      <span className={cn("w-1.5 h-1.5 rounded-full inline-block", dot)} />
      {text}
    </span>
  );
}

// ── OTP Input ─────────────────────────────────────────────────────────────────
export function OTPInput({ length = 6, value, onChange }: {
  length?: number; value: string[]; onChange: (v: string[]) => void;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const handle = (i: number, v: string) => {
    if (!/^\d*$/.test(v)) return;
    const next = [...value]; next[i] = v.slice(-1); onChange(next);
    if (v && i < length - 1) refs.current[i + 1]?.focus();
  };
  const onKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[i] && i > 0) refs.current[i - 1]?.focus();
  };
  return (
    <div className="flex gap-2">
      {Array.from({ length }).map((_, i) => (
        <input key={i} ref={el => { refs.current[i] = el; }} type="text"
          inputMode="numeric" maxLength={1} value={value[i] || ""}
          onChange={e => handle(i, e.target.value)}
          onKeyDown={e => onKey(i, e)}
          className="otp-box" />
      ))}
    </div>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────
export function Pagination({ page, totalPages, total, perPage = 10, onChange }: {
  page: number; totalPages: number; total: number; perPage?: number; onChange: (p: number) => void;
}) {
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);
  const pages = Array.from({ length: Math.min(totalPages, 4) }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <span className="text-xs text-[#6B7280]">{start} - {end} of {total}</span>
      <div className="flex items-center gap-1">
        <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#E5E7EB] disabled:opacity-40 hover:bg-gray-50">
          <ChevronLeft size={14} />
        </button>
        {pages.map(p => (
          <button key={p} onClick={() => onChange(p)}
            className={cn("w-7 h-7 text-xs font-medium rounded-lg transition-colors",
              p === page ? "bg-[#0D1B2A] text-white" : "border border-[#E5E7EB] hover:bg-gray-50 text-[#0D1B2A]")}>
            {p}
          </button>
        ))}
        {totalPages > 5 && <span className="text-xs text-[#6B7280]">...</span>}
        {totalPages > 4 && (
          <button onClick={() => onChange(totalPages)}
            className={cn("w-7 h-7 text-xs font-medium rounded-lg border border-[#E5E7EB] hover:bg-gray-50",
              page === totalPages ? "bg-[#0D1B2A] text-white border-[#0D1B2A]" : "text-[#0D1B2A]")}>
            {totalPages}
          </button>
        )}
        <button onClick={() => onChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#E5E7EB] disabled:opacity-40 hover:bg-gray-50">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ── Toggle ────────────────────────────────────────────────────────────────────
export function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)}
      className={cn("w-10 h-5.5 rounded-full relative transition-colors duration-200 focus:outline-none",
        checked ? "bg-[#0D1B2A]" : "bg-[#D1D5DB]"
      )}
      style={{ height: "22px", width: "40px" }}>
      <span className={cn("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200",
        checked ? "translate-x-5" : "translate-x-0.5")} />
    </button>
  );
}

// ── Modal ────────────────────────────────────────────────────────────────────
export function Modal({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-modal">{children}</div>
    </div>
  );
}

export function ConfirmModal({ icon = "info", title, message, onCancel, onConfirm, cancelLabel = "Cancel", confirmLabel = "Accept" }: {
  icon?: "info" | "warning"; title: string; message: string;
  onCancel: () => void; onConfirm: () => void; cancelLabel?: string; confirmLabel?: string;
}) {
  return (
    <Modal>
      <div className="p-6">
        <div className="flex justify-center mb-4">
          <div className={cn("w-16 h-16 rounded-full flex items-center justify-center",
            icon === "warning" ? "bg-[#FEE2E2]" : "bg-[#EEF3F8]")}>
            {icon === "warning"
              ? <AlertTriangle size={28} className="text-[#EF4444]" />
              : <Info size={28} className="text-[#0D1B2A]" />}
          </div>
        </div>
        <h3 className="text-base font-bold text-[#0D1B2A] text-center mb-2">{title}</h3>
        <p className="text-xs text-[#6B7280] text-center mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 border border-[#E5E7EB] text-[#0D1B2A] font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors">{cancelLabel}</button>
          <button onClick={onConfirm} className="flex-1 bg-[#0D1B2A] text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-[#1a2d40] transition-colors">{confirmLabel}</button>
        </div>
      </div>
    </Modal>
  );
}

export function SuccessModal({ icon = "info", title, message, onClose, closeLabel = "Close" }: {
  icon?: "info" | "warning"; title: string; message: string; onClose: () => void; closeLabel?: string;
}) {
  return (
    <Modal>
      <div className="p-6">
        <div className="flex justify-center mb-4">
          <div className={cn("w-16 h-16 rounded-full flex items-center justify-center",
            icon === "warning" ? "bg-[#FEE2E2]" : "bg-[#EEF3F8]")}>
            {icon === "warning"
              ? <AlertTriangle size={28} className="text-[#EF4444]" />
              : <Info size={28} className="text-[#0D1B2A]" />}
          </div>
        </div>
        <h3 className="text-base font-bold text-[#0D1B2A] text-center mb-2">{title}</h3>
        <p className="text-xs text-[#6B7280] text-center mb-6">{message}</p>
        <button onClick={onClose} className="btn-primary">{closeLabel}</button>
      </div>
    </Modal>
  );
}

// ── Select ────────────────────────────────────────────────────────────────────
export function Select({ label, value, onChange, options, placeholder = "Select Option" }: {
  label?: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string;
}) {
  return (
    <div>
      {label && <label className="lf-label">{label}</label>}
      <div className="relative">
        <select value={value} onChange={e => onChange(e.target.value)}
          className="lf-input appearance-none pr-8 cursor-pointer">
          <option value="">{placeholder}</option>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </div>
    </div>
  );
}
