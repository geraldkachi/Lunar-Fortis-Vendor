import { useState } from "react";
import { Badge, Pagination } from "@/components/ui";
import { TRANSACTIONS, formatPrice } from "@/lib/mockData";
import { paginate } from "@/lib/utils";
import type { TransactionStatus } from "@/types";

const STATS = [
  { label: "TOTAL BOOKINGS", value: "1259" },
  { label: "ACTIVE BOOKINGS", value: "25" },
  { label: "REVENUE", value: "₦ 50,000,000" },
  { label: "PENDING REQUEST", value: "12" },
];

export default function HomePage() {
  const [page, setPage] = useState(1);
  const { items, total, totalPages } = paginate(TRANSACTIONS, page);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">Home</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {STATS.map(s => (
          <div key={s.label} className="stat-card">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">{s.label}</p>
            <p className="text-2xl font-bold text-[#0D1B2A]">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E5E7EB]">
          <h2 className="text-sm font-semibold text-[#0D1B2A] uppercase tracking-wider">RECENT TRANSACTIONS</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              {["BOOKING ID","PRODUCT","AMOUNT","STATUS","DATE"].map(h => (
                <th key={h} className="table-th">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(tx => (
              <tr key={tx.id} className="hover:bg-[#F9FAFB] transition-colors cursor-pointer">
                <td className="table-td font-medium">{tx.bookingId}</td>
                <td className="table-td">{tx.user}</td>
                <td className="table-td font-semibold">{formatPrice(tx.amount)}</td>
                <td className="table-td">
                  <Badge variant={tx?.status as TransactionStatus} />
                </td>
                <td className="table-td text-[#6B7280]">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-[#E5E7EB]">
          <Pagination page={page} totalPages={totalPages} total={total} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}
