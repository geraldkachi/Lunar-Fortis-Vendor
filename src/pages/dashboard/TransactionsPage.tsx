import { useState } from "react";
import { Badge, Pagination, SuccessModal } from "@/components/ui";
import { TRANSACTIONS, formatPrice } from "@/lib/mockData";
import { paginate } from "@/lib/utils";
import { X } from "lucide-react";
import type { Transaction, TransactionStatus } from "@/types";

const STATS = [
  { label: "REVENUE", value: "₦ 50,000,000" },
  { label: "TOTAL TRANSACTIONS", value: "1289" },
  { label: "SUCCESSFUL TRANSACTIONS", value: "1277" },
  { label: "FAILED TRANSACTIONS", value: "12" },
];

function ReceiptModal({ tx, onClose }: { tx: Transaction; onClose: () => void }) {
  const isSuccess = tx.status === "successful";
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-end z-50 pr-8">
      <div className="bg-white rounded-2xl w-80 shadow-modal p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[#0D1B2A]">Transaction Receipt</h3>
          <button onClick={onClose} className="text-[#6B7280] hover:text-[#0D1B2A]"><X size={16} /></button>
        </div>
        <div className="space-y-2 mb-4">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">TRANSACTION DETAILS</p>
          {[["Amount", formatPrice(tx.amount)], ["Recipient", tx.user], ["Recipient Bank","Paycom/OPAY"],
            ["Account Number","8123235569"], ["Description",`${tx.user} to Flutterwave/LunaFORTIS`],
            ["Date","09 April 2026, 10:45 AM"]].map(([l,v]) => (
            <div key={l} className="flex justify-between text-xs">
              <span className="text-[#6B7280]">{l}</span>
              <span className="text-[#0D1B2A] font-medium text-right max-w-[55%]">{v}</span>
            </div>
          ))}
          <div className="flex justify-between text-xs">
            <span className="text-[#6B7280]">Transaction Status</span>
            <span className={isSuccess ? "text-[#10B981] font-semibold" : "text-[#EF4444] font-semibold"}>
              {isSuccess ? "Successful" : "Failed"}
            </span>
          </div>
        </div>
        <div className="border-t border-[#E5E7EB] pt-3 space-y-2 mb-4">
          <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">OTHER DETAILS</p>
          {[["Transaction Reference","pocket_disburse_1155470048562623"],
            ["Session ID","090405280430150036372237066022"]].map(([l,v]) => (
            <div key={l} className="flex flex-col gap-0.5 text-xs">
              <span className="text-[#6B7280]">{l}</span>
              <span className="text-[#0D1B2A] font-medium break-all">{v}</span>
            </div>
          ))}
        </div>
        <button className="w-full border border-[#E5E7EB] text-[#0D1B2A] text-xs font-semibold py-2.5 rounded-xl hover:bg-gray-50">
          Share Receipt
        </button>
      </div>
    </div>
  );
}

function WithdrawModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [amount, setAmount] = useState("250,000");
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-modal p-6">
        <h3 className="text-base font-bold text-[#0D1B2A] mb-1">Withdraw to Bank</h3>
        <p className="text-xs text-[#6B7280] mb-5">Transfer your available earnings securely to your registered bank account.</p>
        <div className="mb-5">
          <label className="lf-label">Amount</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#6B7280]">₦</span>
            <input value={amount} onChange={e => setAmount(e.target.value)} className="lf-input pl-7" />
          </div>
        </div>
        <button onClick={onSuccess} className="btn-primary">Withdraw</button>
      </div>
    </div>
  );
}

export default function TransactionsPage() {
  const [page, setPage] = useState(1);
  const [receipt, setReceipt] = useState<Transaction | null>(null);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showWithdrawSuccess, setShowWithdrawSuccess] = useState(false);
  const { items, total, totalPages } = paginate(TRANSACTIONS, page);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">Transactions</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {STATS.map(s => (
          <div key={s.label} className="stat-card">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">{s.label}</p>
            <p className="text-xl font-bold text-[#0D1B2A]">{s.value}</p>
            {s.label === "REVENUE" && (
              <button onClick={() => setShowWithdraw(true)} className="mt-2 text-xs text-[#4F7FAF] font-semibold hover:underline">
                ↑ Withdraw
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E5E7EB]">
          <h2 className="text-sm font-semibold text-[#0D1B2A] uppercase tracking-wider">RECENT TRANSACTIONS</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr>{["BOOKING ID","USER","AMOUNT","TYPE","STATUS","DATE"].map(h => <th key={h} className="table-th">{h}</th>)}</tr>
          </thead>
          <tbody>
            {items.map(tx => (
              <tr key={tx.id} onClick={() => setReceipt(tx)}
                className="hover:bg-[#F9FAFB] transition-colors cursor-pointer">
                <td className="table-td font-medium">{tx.bookingId}</td>
                <td className="table-td">{tx.user}</td>
                <td className="table-td font-semibold">{formatPrice(tx.amount)}</td>
                <td className="table-td text-[#6B7280]">{tx.type}</td>
                <td className="table-td"><Badge variant={tx.status as TransactionStatus} /></td>
                <td className="table-td text-[#6B7280]">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-[#E5E7EB]">
          <Pagination page={page} totalPages={totalPages} total={total} onChange={setPage} />
        </div>
      </div>

      {receipt && <ReceiptModal tx={receipt} onClose={() => setReceipt(null)} />}
      {showWithdraw && (
        <WithdrawModal onClose={() => setShowWithdraw(false)}
          onSuccess={() => { setShowWithdraw(false); setShowWithdrawSuccess(true); }} />
      )}
      {showWithdrawSuccess && (
        <SuccessModal icon="info" title="Withdrawal Successful"
          message="You have successfully withdrawn ₦ 250,000"
          onClose={() => setShowWithdrawSuccess(false)} closeLabel="Close" />
      )}
    </div>
  );
}
