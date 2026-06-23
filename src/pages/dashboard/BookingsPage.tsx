import { useState } from "react";
import { Badge, Pagination, ConfirmModal, SuccessModal } from "@/components/ui";
import { BOOKINGS, formatPrice } from "@/lib/mockData";
import { paginate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { ArrowLeft, Check, Phone, X } from "lucide-react";
import type { Booking, BookingStatus } from "@/types";

const TABS = ["All Bookings", "Requests", "Ongoing Requests", "Declined Requests"] as const;
type Tab = typeof TABS[number];

const STATS = [
  { label: "TOTAL BOOKINGS", value: "1259" },
  { label: "ACTIVE BOOKINGS", value: "25" },
  { label: "SUCCESSFUL BOOKINGS", value: "98" },
  { label: "FAILED BOOKINGS", value: "2" },
];

function statusFromTab(tab: Tab): BookingStatus | undefined {
  if (tab === "Requests") return "pending";
  if (tab === "Ongoing Requests") return "ongoing";
  if (tab === "Declined Requests") return "declined";
  return undefined;
}
interface TrackingStep {
  key: string;
  label: string;
  time?: string;
  completed: boolean;
}

interface TrackingProgressProps {
  steps: TrackingStep[];
  className?: string;
}

export function TrackingProgress({ steps, className }: TrackingProgressProps) {
  return (
    <div className={cn("", className)}>
      <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-4">
        TRACKING PROGRESS
      </p>
      <div className="space-y-0">
        {steps.map((step, i, arr) => {
          const isCompleted = step.completed;
          const isDeclined = step.key === "declined";
          const isLast = i === arr.length - 1;
          
          return (
            <div key={step.key} className="flex gap-3">
              {/* Left - Circle + Line */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200",
                    isCompleted
                      ? isDeclined
                        ? "bg-[#EF4444]"
                        : "bg-[#0D1B2A]"
                      : "bg-[#E5E7EB]"
                  )}
                >
                  {isCompleted ? (
                    isDeclined ? (
                      <X size={12} className="text-white" strokeWidth={2.5} />
                    ) : (
                      <Check size={12} className="text-white" strokeWidth={2.5} />
                    )
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF]" />
                  )}
                </div>
                {/* Connecting Line */}
                {!isLast && (
                  <div
                    className={cn(
                      "w-0.5 h-5 transition-colors duration-200",
                      isCompleted ? "bg-[#0D1B2A]" : "bg-[#E5E7EB]"
                    )}
                  />
                )}
              </div>

              {/* Right - Label + Time */}
              <div className="pb-3.5">
                <p
                  className={cn(
                    "text-xs font-medium transition-colors duration-200",
                    isCompleted ? "text-[#0D1B2A]" : "text-[#9CA3AF]"
                  )}
                >
                  {step.label}
                </p>
                {step.time && (
                  <p
                    className={cn(
                      "text-[10px] transition-colors duration-200",
                      isCompleted ? "text-[#6B7280]" : "text-[#C4C4C4]"
                    )}
                  >
                    {step.time}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// function TrackingProgress({ booking }: { booking: Booking }) {
//   return (
//     <div>
//       <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">TRACKING PROGRESS</p>
//       {booking.trackingProgress?.map((step, i, arr) => (
//         <div key={step.key} className="flex gap-2">
//           <div className="flex flex-col items-center">
//             <div className={cn("w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0",
//               step.completed ? "bg-[#0D1B2A]" : step.key === "declined" ? "bg-[#EF4444]" : "bg-[#E5E7EB]")}>
//               {step.completed
//                 ? step.key === "declined"
//                   ? <X size={12} className="text-white" />
//                   : <Check size={12} className="text-white" strokeWidth={2.5} />
//                 : <div className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF]" />}
//             </div>
//             {i < arr.length - 1 && <div className={cn("w-0.5 h-6", step.completed ? "bg-[#0D1B2A]" : "bg-[#E5E7EB]")} />}
//           </div>
//           <div className="pb-3">
//             <p className={cn("text-xs font-semibold", step.completed ? "text-[#0D1B2A]" : "text-[#9CA3AF]")}>{step.label}</p>
//             {step.time && <p className={cn("text-[10px]", step.completed ? "text-[#6B7280]" : "text-[#C4C4C4]")}>{step.time}</p>}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

function BookingDetailView({ booking, onBack }: { booking: Booking; onBack: () => void }) {
  const [modal, setModal] = useState<"accept"|"accepted"|"reject"|"rejected"|"receipt"|null>(null);
  const isCompleted = booking.status === "completed";
  const isDeclined = booking.status === "declined";
  const [countdown] = useState("01:59:58");

  return (
    <div>
      {/* Breadcrumb */}
      <p className="text-xs text-[#6B7280] mb-4">
        Bookings › All Bookings ›{" "}
        <span className="text-[#0D1B2A] font-medium">Booking Details</span>
      </p>

      {/* <div className="grid grid-cols-[1fr_300px] gap-6"> */}
      <div className="grid md:grid-cols-5 gap-6">
        {/* Left */}
        <div className="col-span-3 border border-[#E5E7EB] rounded-xl p-5">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-[#0D1B2A]">Booking Details</h2>
              <p className="text-xs text-[#6B7280]">Order information</p>
            </div>
            <div className="flex items-center gap-2">
              {isCompleted && (
                <button onClick={() => setModal("receipt")} className="text-xs text-[#4F7FAF] font-semibold hover:underline border border-[#E5E7EB] px-3 py-1.5 rounded-lg">
                  View Receipt
                </button>
              )}
              <span className={cn("text-xs font-semibold px-3 py-1.5 rounded-lg",
                isCompleted ? "border border-[#E5E7EB] text-[#0D1B2A]" : isDeclined ? "text-[#EF4444] bg-[#FEE2E2]" : "")}>
                {isCompleted ? "Completed" : isDeclined ? "Declined" : ""}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 mb-5 text-sm">
            <div><p className="text-xs text-[#6B7280] mb-0.5">Order ID</p><p className="font-bold">{booking.orderId}</p></div>
            <div><p className="text-xs text-[#6B7280] mb-0.5">Created Date</p><p>{booking.createdDate}</p></div>
          </div>

          <div className="border border-[#E5E7EB] rounded-xl p-4">
            <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">BOOKING INFORMATION</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-10 rounded-lg bg-[#F3F4F6] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&q=80" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#0D1B2A]">2 Bedroom Apartment</p>
                <p className="text-xs text-[#6B7280]">2 Guests • Wifi • 24hr Light • Air Condition</p>
              </div>
              <p className="text-sm font-bold">{formatPrice(97000)}/day</p>
            </div>
            <div className="space-y-1.5">
              {[["Location","Lekki Peninsula"],["Check In Date","09 April 2026"],["Check Out Date","10 April 2026"],
                ["Check In Time","12:00 PM"],["Number of Days","2"]].map(([l,v]) => (
                <div key={l} className="flex justify-between text-xs">
                  <span className="text-[#6B7280]">{l}</span>
                  <span className="text-[#0D1B2A] font-medium">{v}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#E5E7EB] mt-3 pt-2.5 flex justify-between">
              <span className="text-sm font-semibold text-[#0D1B2A]">Total Billing</span>
              <span className="text-sm font-bold text-[#0D1B2A]">{formatPrice(194000)}</span>
            </div>
          </div>
        </div>

        {/* Right — Tracking */}
        <div className="col-span-2 space-y-4">
          {!isCompleted && !isDeclined && (
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-[#E8392A] font-mono">{countdown}</span>
              <span className={cn("text-xs font-semibold px-3 py-1 rounded-full", "text-[#3B82F6] bg-[#DBEAFE]")}>
                Ongoing
              </span>
            </div>
          )}

          {/* <TrackingProgress booking={booking} /> */}
           <TrackingProgress steps={booking.trackingProgress || []} />

          {/* CTA */}
          {!isCompleted && !isDeclined && (
            <div className="flex gap-2">
              <button onClick={() => setModal("reject")}
                className="flex-1 border border-[#E5E7EB] text-[#0D1B2A] text-xs font-semibold py-2.5 rounded-xl hover:bg-gray-50">
                Decline
              </button>
              <button onClick={() => setModal("accept")}
                className="flex-1 bg-[#0D1B2A] text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-[#1a2d40]">
                Accept
              </button>
            </div>
          )}

          {isCompleted && (
            <button disabled className="w-full bg-[#0D1B2A] text-white font-semibold py-3 rounded-xl text-sm">
              Booking Completed
            </button>
          )}
          {isDeclined && (
            <button disabled className="w-full bg-[#F3F4F6] text-[#9CA3AF] font-semibold py-3 rounded-xl text-sm">
              Booking Declined
            </button>
          )}
        </div>
      </div>

      {/* Modals */}
      {modal === "accept" && (
        <ConfirmModal icon="info" title="Accept Booking"
          message='Are you certain you want to proceed with the booking. Click on the "Accept" button to continue.'
          onCancel={() => setModal(null)} onConfirm={() => setModal("accepted")}
          cancelLabel="Cancel" confirmLabel="Accept" />
      )}
      {modal === "accepted" && (
        <SuccessModal icon="info" title="Booking Accepted" message="You have accepted this request."
          onClose={() => setModal(null)} closeLabel="Close" />
      )}
      {modal === "reject" && (
        <ConfirmModal icon="warning" title="Reject Booking"
          message='Are you sure you want to decline this booking. Click on the "Proceed" button to continue.'
          onCancel={() => setModal(null)} onConfirm={() => setModal("rejected")}
          cancelLabel="Back" confirmLabel="Proceed" />
      )}
      {modal === "rejected" && (
        <SuccessModal icon="warning" title="Booking Rejected" message="This booking has been successfully declined."
          onClose={() => setModal(null)} closeLabel="Done" />
      )}
      {modal === "receipt" && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-end z-50 pr-8">
          <div className="bg-white rounded-2xl w-80 shadow-modal p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#0D1B2A]">Transaction Receipt</h3>
              <button onClick={() => setModal(null)} className="text-[#6B7280] hover:text-[#0D1B2A]">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">TRANSACTION DETAILS</p>
              {[["Amount","₦ 250,000,000"],["Recipient","Tolulope Afolayan"],["Recipient Bank","Paycom/OPAY"],
                ["Account Number","8123235569"],["Description","Tolulope Afolayan to Flutterwave/LunaFORTIS"],
                ["Date","09 April 2026, 10:45 AM"]].map(([l,v]) => (
                <div key={l} className="flex justify-between text-xs">
                  <span className="text-[#6B7280]">{l}</span>
                  <span className="text-[#0D1B2A] font-medium text-right max-w-[60%]">{v}</span>
                </div>
              ))}
              <div className="flex justify-between text-xs">
                <span className="text-[#6B7280]">Transaction Status</span>
                <span className="text-[#10B981] font-semibold">Successful</span>
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
      )}
    </div>
  );
}

export default function BookingsPage() {
  const [tab, setTab] = useState<Tab>("All Bookings");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Booking | null>(null);

  const statusFilter = statusFromTab(tab);
  const filtered = statusFilter ? BOOKINGS.filter(b => b.status === statusFilter) : BOOKINGS;
  const { items, total, totalPages } = paginate(filtered, page);

  if (selected) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A] mb-4">Bookings</h1>
        <button onClick={() => setSelected(null)}
          className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#0D1B2A] mb-4">
          <ArrowLeft size={15} /> Back
        </button>
        <BookingDetailView booking={selected} onBack={() => setSelected(null)} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">Bookings</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {STATS.map(s => (
          <div key={s.label} className="stat-card">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">{s.label}</p>
            <p className="text-2xl font-bold text-[#0D1B2A]">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs + Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-[#E5E7EB] px-5">
          {TABS.map(t => (
            <button key={t} onClick={() => { setTab(t); setPage(1); }}
              className={cn("py-3.5 px-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                t === tab ? "border-[#0D1B2A] text-[#0D1B2A]" : "border-transparent text-[#6B7280] hover:text-[#0D1B2A]")}>
              {t}
              {t === "Requests" && <span className="ml-1.5 w-4 h-4 bg-[#E8392A] text-white text-[10px] font-bold rounded-full inline-flex items-center justify-center">8</span>}
            </button>
          ))}
        </div>

        <table className="w-full">
          <thead>
            <tr>{["BOOKING ID","PRODUCT","AMOUNT","STATUS","DATE"].map(h => <th key={h} className="table-th">{h}</th>)}</tr>
          </thead>
          <tbody>
            {items.map(b => (
              <tr key={b.id} onClick={() => setSelected(b)}
                className="hover:bg-[#F9FAFB] transition-colors cursor-pointer">
                <td className="table-td font-medium">{b.bookingId}</td>
                <td className="table-td">{b.product}</td>
                <td className="table-td font-semibold">{formatPrice(b.amount)}</td>
                <td className="table-td">
                  <Badge variant={b.status === "pending" ? "pending" : b.status === "ongoing" ? "ongoing" : b.status === "declined" ? "declined" : "success"} />
                </td>
                <td className="table-td text-[#6B7280]">{b.date}</td>
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
