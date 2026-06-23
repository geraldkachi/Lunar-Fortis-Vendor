// pages/audit.tsx or app/audit/page.tsx

import { useState } from "react";
import { Badge, Pagination } from "@/components/ui";
import { paginate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { ArrowLeft, ClipboardList, Search, Filter, Download } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

type AuditAction = 
  | "Product Updated"
  | "Logged into dashboard"
  | "New Product Added"
  | "Approved Booking"
  | "New Business Name"
  | "Business Name Updated"
  | "Booking Created"
  | "Booking Cancelled"
  | "User Added"
  | "User Removed"
  | "Settings Updated";

type AuditStatus = "success" | "pending" | "failed";

interface AuditLog {
  id: string;
  typeOfAction: AuditAction;
  category: "Bookings" | "Transactions" | "Products" | "Audit Trail" | "User Management" | "Settings" | "Business Name";
  status: AuditStatus;
  date: string;
  user?: string;
  description?: string;
}

// ── Mock Data ───────────────────────────────────────────────────────────────

const AUDIT_LOGS: AuditLog[] = [
  {
    id: "1",
    typeOfAction: "Product Updated",
    category: "Bookings",
    status: "success",
    date: "Jan 18, 2026 · 14:32",
    user: "Admin",
    description: "Updated product: 2 Bedroom Apartment"
  },
  {
    id: "2",
    typeOfAction: "Logged into dashboard",
    category: "Transactions",
    status: "success",
    date: "Jan 18, 2026 · 14:32",
    user: "Gerald Kachi",
    description: "Login from IP 192.168.1.1"
  },
  {
    id: "3",
    typeOfAction: "New Product Added",
    category: "Products",
    status: "success",
    date: "Jan 18, 2026 · 14:32",
    user: "Admin",
    description: "Added: Luxury 3 Bedroom Suite"
  },
  {
    id: "4",
    typeOfAction: "New Product Added",
    category: "Audit Trail",
    status: "success",
    date: "Jan 18, 2026 · 13:32",
    user: "Manager",
    description: "Added: Executive Studio"
  },
  {
    id: "5",
    typeOfAction: "Logged into dashboard",
    category: "User Management",
    status: "success",
    date: "Jan 18, 2026 · 14:32",
    user: "Tolulope Afolayan",
    description: "Login from IP 192.168.1.2"
  },
  {
    id: "6",
    typeOfAction: "New Product Added",
    category: "Settings",
    status: "success",
    date: "Jan 18, 2026 · 14:32",
    user: "Admin",
    description: "Added: Deluxe Ocean View"
  },
  {
    id: "7",
    typeOfAction: "Approved Booking",
    category: "Bookings",
    status: "success",
    date: "Jan 18, 2026 · 14:32",
    user: "Admin",
    description: "Booking #BK-2026-001 approved"
  },
  {
    id: "8",
    typeOfAction: "New Product Added",
    category: "Business Name",
    status: "success",
    date: "Jan 18, 2026 · 14:32",
    user: "Business Owner",
    description: "Added: Lagos Luxury Suites"
  },
  {
    id: "9",
    typeOfAction: "New Product Added",
    category: "Business Name",
    status: "success",
    date: "Jan 18, 2026 · 13:32",
    user: "Business Owner",
    description: "Added: Abuja Premium Homes"
  },
  {
    id: "10",
    typeOfAction: "New Product Added",
    category: "Business Name",
    status: "success",
    date: "Jan 18, 2026 · 14:32",
    user: "Admin",
    description: "Added: Port Harcourt Suites"
  },
  {
    id: "11",
    typeOfAction: "New Business Name",
    category: "Business Name",
    status: "success",
    date: "Jan 18, 2026 · 14:32",
    user: "Business Owner",
    description: "Created business: Enchantress Massage"
  },
  {
    id: "12",
    typeOfAction: "Business Name Updated",
    category: "Business Name",
    status: "success",
    date: "Jan 18, 2026 · 14:32",
    user: "Business Owner",
    description: "Updated business name from 'Duchess' to 'Enchantress Duchess'"
  },
  {
    id: "13",
    typeOfAction: "New Product Added",
    category: "Business Name",
    status: "success",
    date: "Jan 18, 2026 · 14:32",
    user: "Admin",
    description: "Added: VIP Lounge Package"
  },
  {
    id: "14",
    typeOfAction: "New Product Added",
    category: "Business Name",
    status: "success",
    date: "Jan 18, 2026 · 14:32",
    user: "Admin", 
    description: "Added: Spa Wellness Package"
  },
  {
    id: "15",
    typeOfAction: "New Business Name",
    category: "Business Name",
    status: "failed",
    date: "Jan 18, 2026 · 14:32",
    user: "Guest",
    description: "Failed business creation attempt"
  }
];

// ── Helper ─────────────────────────────────────────────────────────────────

const statusMap: Record<AuditStatus, "success" | "pending" | "failed"> = {
  success: "success",
  pending: "pending",
  failed: "failed"
};

// ── Component ──────────────────────────────────────────────────────────────

export default function AuditPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  // ── Filters ──────────────────────────────────────────────────────────────

  const categories = ["All", ...new Set(AUDIT_LOGS.map(log => log.category))];
  const statuses = ["All", "success", "pending", "failed"];

  const filtered = AUDIT_LOGS.filter(log => {
    const matchesSearch = 
      log.typeOfAction.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || log.category === categoryFilter;
    const matchesStatus = statusFilter === "All" || log.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const { items, total, totalPages } = paginate(filtered, page);

  // ── Detail View ──────────────────────────────────────────────────────────

  if (selectedLog) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A] mb-4">Audit Trail</h1>
        <button 
          onClick={() => setSelectedLog(null)}
          className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#0D1B2A] mb-4"
        >
          <ArrowLeft size={15} /> Back
        </button>
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-[#0D1B2A]">Audit Log Details</h2>
              <p className="text-xs text-[#6B7280]">Detailed information about this activity</p>
            </div>
            <Badge variant={statusMap[selectedLog.status]} />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-xs text-[#6B7280]">Action</p><p className="font-bold">{selectedLog.typeOfAction}</p></div>
            <div><p className="text-xs text-[#6B7280]">Category</p><p>{selectedLog.category}</p></div>
            <div><p className="text-xs text-[#6B7280]">Date & Time</p><p>{selectedLog.date}</p></div>
            <div><p className="text-xs text-[#6B7280]">User</p><p>{selectedLog.user || "N/A"}</p></div>
            <div className="col-span-2"><p className="text-xs text-[#6B7280]">Description</p><p>{selectedLog.description || "No description"}</p></div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main List View ──────────────────────────────────────────────────────

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">Audit Trail</h1>

      {/* ── Stats ──────────────────────────────────────────────────────── */}
      {/* <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "TOTAL ACTIVITIES", value: AUDIT_LOGS.length },
          { label: "SUCCESSFUL", value: AUDIT_LOGS.filter(l => l.status === "success").length },
          { label: "PENDING", value: AUDIT_LOGS.filter(l => l.status === "pending").length },
          { label: "FAILED", value: AUDIT_LOGS.filter(l => l.status === "failed").length },
        ].map(stat => (
          <div key={stat.label} className="stat-card">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">{stat.label}</p>
            <p className="text-2xl font-bold text-[#0D1B2A]">{stat.value}</p>
          </div>
        ))}
      </div> */}

      {/* ── Filters ────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search actions, users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]/10"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-[#E5E7EB] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]/10"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-[#E5E7EB] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]/10"
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
          ))}
        </select>

        <button className="flex items-center gap-1.5 px-4 py-2 text-sm text-[#6B7280] border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors">
          <Download size={16} /> Export
        </button>
      </div>

      {/* ── Table ──────────────────────────────────────────────────────── */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {["TYPE OF ACTION", "CATEGORY", "STATUS", "DATE"].map(h => (
                <th key={h} className="table-th text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <div className="py-16 flex flex-col items-center">
                    <ClipboardList size={40} className="text-[#9CA3AF] mb-3" />
                    <p className="text-sm font-semibold text-[#0D1B2A]">No Audit Logs Found</p>
                    <p className="text-xs text-[#6B7280] mt-1">Try adjusting your filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              items.map((log) => (
                <tr 
                  key={log.id} 
                  onClick={() => setSelectedLog(log)}
                  className="hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                >
                  <td className="table-td">
                    <div>
                      <p className="font-medium text-[#0D1B2A]">{log.typeOfAction}</p>
                      {log.user && <p className="text-[10px] text-[#6B7280]">by {log.user}</p>}
                    </div>
                  </td>
                  <td className="table-td">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#F3F4F6] text-[#0D1B2A]">
                      {log.category}
                    </span>
                  </td>
                  <td className="table-td">
                    <Badge variant={statusMap[log.status]} />
                  </td>
                  <td className="table-td text-[#6B7280] text-sm">{log.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {items.length > 0 && (
          <div className="px-5 py-3 border-t border-[#E5E7EB]">
            <Pagination 
              page={page} 
              totalPages={totalPages} 
              total={total} 
              onChange={setPage} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

// import { ClipboardList } from "lucide-react";

// export default function AuditPage() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">Audit Trail</h1>
//       <div className="bg-white border border-[#E5E7EB] rounded-xl p-16 flex flex-col items-center">
//         <ClipboardList size={40} className="text-[#9CA3AF] mb-3" />
//         <p className="text-sm font-semibold text-[#0D1B2A]">No Audit Logs Yet</p>
//         <p className="text-xs text-[#6B7280] mt-1">All account activity will be tracked and displayed here.</p>
//       </div>
//     </div>
//   );
// }
