import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/ui";
import { Select } from "@/components/ui";
import { ArrowLeft, CalendarDays, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = ["Business Details", "Address Information", "Documents", "Director Details"];

// ── Step progress bar ─────────────────────────────────────────────────────────
function StepTabs({ current }: { current: number }) {
  return (
    <div className="flex border-b border-[#E5E7EB] mb-6">
      {TABS.map((tab, i) => (
        <button key={tab} className={cn(
          "text-xs font-medium pb-2.5 px-3 transition-colors border-b-2 -mb-px",
          i === current
            ? "border-[#0D1B2A] text-[#0D1B2A]"
            : i < current
            ? "border-transparent text-[#10B981]"
            : "border-transparent text-[#9CA3AF]"
        )}>{tab}</button>
      ))}
    </div>
  );
}

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full border-2 border-[#0D1B2A] flex items-center justify-center">
        <svg viewBox="0 0 36 36" width="28" height="28">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E5E7EB" strokeWidth="3" />
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#0D1B2A" strokeWidth="3"
            strokeDasharray={`${(step / total) * 100} 100`} strokeLinecap="round"
            transform="rotate(-90 18 18)" />
        </svg>
      </div>
      <span className="text-xs text-[#6B7280]">{step}/{total}</span>
    </div>
  );
}

// ── Step 1: Business Registration Details ─────────────────────────────────────
function Step1({ onNext }: { onNext: () => void }) {
  const [form, setForm] = useState({
    businessName: "Adekay Houses",
    rcNumber: "123456890",
    taxId: "TIN-123456890",
    rcNumber2: "123456890",
    dateOfReg: "12/12/2020",
    businessAge: "",
    businessType: "",
    sourceOfFunds: "",
    monthlyVolume: "",
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#0D1B2A]">Business Registration Details</h2>
          <p className="text-xs text-[#6B7280] mt-1">Provide details about your business registration to continue KYB process.</p>
        </div>
        <StepIndicator step={1} total={4} />
      </div>

      <div className="space-y-4">
        <div>
          <label className="lf-label">Registered Business Name *</label>
          <input value={form.businessName} onChange={e => set("businessName", e.target.value)} className="lf-input" />
          <p className="flex items-center gap-1 text-xs text-[#6B7280] mt-1">
            <Info size={11} /> As stated in your CAC document
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="lf-label">RC Number *</label>
            <input value={form.rcNumber} onChange={e => set("rcNumber", e.target.value)} className="lf-input" />
          </div>
          <div>
            <label className="lf-label">Tax ID *</label>
            <input value={form.taxId} onChange={e => set("taxId", e.target.value)} className="lf-input" />
          </div>
          <div>
            <label className="lf-label">RC Number *</label>
            <input value={form.rcNumber2} onChange={e => set("rcNumber2", e.target.value)} className="lf-input" />
          </div>
          <div>
            <label className="lf-label">Date of Registration/Incorporation</label>
            <div className="relative">
              <input type="date" value={form.dateOfReg} onChange={e => set("dateOfReg", e.target.value)} className="lf-input pr-9" />
              <CalendarDays size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
            </div>
          </div>
        </div>

        <Select label="Business Age *" value={form.businessAge} onChange={v => set("businessAge", v)}
          placeholder="Select Age Range"
          options={["0-1 year","1-3 years","3-5 years","5+ years"].map(o => ({ value: o, label: o }))} />
        <p className="flex items-center gap-1 text-xs text-[#6B7280] -mt-2">
          <Info size={11} /> Requires supporting evidence – to be uploaded in the next section
        </p>

        <Select label="Business Type *" value={form.businessType} onChange={v => set("businessType", v)}
          placeholder="Select Type"
          options={["Sole Proprietorship","Partnership","Limited Liability"].map(o => ({ value: o, label: o }))} />

        <Select label="Source of Funds / Business Revenue *" value={form.sourceOfFunds} onChange={v => set("sourceOfFunds", v)}
          placeholder="Select Option"
          options={["Salary","Business Revenue","Investment","Others"].map(o => ({ value: o, label: o }))} />

        <Select label="Expected Monthly Transaction Volume *" value={form.monthlyVolume} onChange={v => set("monthlyVolume", v)}
          placeholder="Select Option"
          options={["Below ₦1M","₦1M - ₦10M","₦10M - ₦50M","Above ₦50M"].map(o => ({ value: o, label: o }))} />

        <button onClick={onNext} className="btn-primary mt-2">Continue</button>
      </div>
    </div>
  );
}

// ── Step 2: Address Information ───────────────────────────────────────────────
function Step2({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [form, setForm] = useState({
    address: "30, Victoria Island Lekki",
    state: "",
    city: "",
    website: "www.addyhomes.net",
    email: "addyhomes@workpl.net",
    phone: "8023456789",
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#0D1B2A] mb-4">
        <ArrowLeft size={15} /> Back
      </button>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#0D1B2A]">Address Information</h2>
          <p className="text-xs text-[#6B7280] mt-1">Provide details about your business contact and address</p>
        </div>
        <StepIndicator step={2} total={4} />
      </div>

      <div className="space-y-4">
        <div>
          <label className="lf-label">Business Address *</label>
          <input value={form.address} onChange={e => set("address", e.target.value)} className="lf-input" />
          <p className="flex items-center gap-1 text-xs text-[#6B7280] mt-1">
            <Info size={11} /> Requires supporting evidence – to be uploaded in the next section
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Select label="State *" value={form.state} onChange={v => set("state", v)} placeholder="Select Item"
            options={["Lagos","Abuja","Rivers","Kano"].map(o => ({ value: o, label: o }))} />
          <Select label="City *" value={form.city} onChange={v => set("city", v)} placeholder="Select Item"
            options={["Lekki","Ikeja","VI","Yaba"].map(o => ({ value: o, label: o }))} />
        </div>
        <div>
          <label className="lf-label">Company Website</label>
          <input value={form.website} onChange={e => set("website", e.target.value)} className="lf-input" />
        </div>
        <div>
          <label className="lf-label">Email Address *</label>
          <input type="email" value={form.email} onChange={e => set("email", e.target.value)} className="lf-input" />
        </div>
        <div>
          <label className="lf-label">Phone Number</label>
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm">
              🇳🇬 +234
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
            <input value={form.phone} onChange={e => set("phone", e.target.value)} className="lf-input flex-1" />
          </div>
        </div>
        <button onClick={onNext} className="btn-primary mt-2">Continue</button>
      </div>
    </div>
  );
}

// ── Step 3: Documents ─────────────────────────────────────────────────────────
function Step3({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const docs = [
    { label: "Certificate of Incorporation", file: "Doc_1234.PDF", size: "CAC Certificate · 2 KB" },
    { label: "Proof of Business Address (Utility Bill or Tenancy Agreement)", file: "Doc_1234.PDF", size: "Utility Bill · 3 KB" },
    { label: "MEMART", file: "Doc_1234.PDF", size: "Utility Bill · 3 KB" },
  ];

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#0D1B2A] mb-4">
        <ArrowLeft size={15} /> Back
      </button>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#0D1B2A]">Documents</h2>
          <p className="text-xs text-[#6B7280] mt-1">Upload required business documents</p>
        </div>
        <StepIndicator step={3} total={4} />
      </div>

      <div className="space-y-4">
        {docs.map((doc, i) => (
          <div key={i}>
            <label className="lf-label">{doc.label}</label>
            <div className="flex items-center justify-between bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4 py-3">
              <div>
                <p className="text-sm font-medium text-[#0D1B2A]">{doc.file}</p>
                <p className="text-xs text-[#6B7280]">{doc.size}</p>
              </div>
              <button className="text-xs text-[#4F7FAF] font-medium hover:underline">Replace</button>
            </div>
          </div>
        ))}
        <button onClick={onNext} className="btn-primary mt-2">Continue</button>
      </div>
    </div>
  );
}

// ── Step 4: Director Details ──────────────────────────────────────────────────
function Step4({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [form, setForm] = useState({
    firstName: "Tolulope", lastName: "Afolayan",
    bvn: "123456890", nin: "123456890",
    phone: "8023456789", dob: "12/12/2020",
    percentage: "2", sourceOfFunds: "Professional Service",
    pep: "No", bio: "This is the details of the politically exposed person...",
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#0D1B2A] mb-4">
        <ArrowLeft size={15} /> Back
      </button>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-[#0D1B2A]">Director Details</h2>
          <p className="text-xs font-semibold text-[#6B7280] mt-1">Director 1</p>
        </div>
        <StepIndicator step={4} total={4} />
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="lf-label">First Name</label><input value={form.firstName} onChange={e => set("firstName", e.target.value)} className="lf-input" /></div>
          <div><label className="lf-label">Last Name</label><input value={form.lastName} onChange={e => set("lastName", e.target.value)} className="lf-input" /></div>
          <div><label className="lf-label">BVN</label><input value={form.bvn} onChange={e => set("bvn", e.target.value)} className="lf-input" /></div>
          <div><label className="lf-label">NIN</label><input value={form.nin} onChange={e => set("nin", e.target.value)} className="lf-input" /></div>
        </div>
        <div>
          <label className="lf-label">NIN Document</label>
          <div className="flex items-center justify-between bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4 py-3">
            <div><p className="text-sm font-medium text-[#0D1B2A]">Doc_1234.PDF</p><p className="text-xs text-[#6B7280]">NIN Document · 2 KB</p></div>
            <button className="text-xs text-[#4F7FAF] font-medium hover:underline">Replace</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="lf-label">Phone Number</label>
            <div className="flex gap-2">
              <span className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm">🇳🇬 +234</span>
              <input value={form.phone} onChange={e => set("phone", e.target.value)} className="lf-input flex-1" />
            </div>
          </div>
          <div><label className="lf-label">Date of Birth</label><div className="relative"><input type="date" value={form.dob} onChange={e => set("dob", e.target.value)} className="lf-input pr-9" /><CalendarDays size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" /></div></div>
          <div><label className="lf-label">Percentage Ownership (%)</label><input value={form.percentage} onChange={e => set("percentage", e.target.value)} className="lf-input" /></div>
        </div>
        <Select label="Source of Funds / Business Revenue *" value={form.sourceOfFunds} onChange={v => set("sourceOfFunds", v)}
          options={["Professional Service","Business Revenue","Investment","Others"].map(o => ({ value: o, label: o }))} />
        <Select label="Politically Exposed Person (PEP)?" value={form.pep} onChange={v => set("pep", v)}
          options={[{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }]} />
        <div><label className="lf-label">Details</label><textarea value={form.bio} onChange={e => set("bio", e.target.value)} rows={3} className="lf-input resize-none" /></div>
        <button onClick={onNext} className="btn-primary mt-2">Submit</button>
      </div>
    </div>
  );
}

// ── Main KYB Page ─────────────────────────────────────────────────────────────
export default function KYBPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const handleComplete = () => navigate("/dashboard");

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
      <header className="bg-white border-b border-[#E5E7EB] h-14 flex items-center justify-between px-6">
        <Logo />
        <span className="text-sm text-[#6B7280]">Having an issue? <strong className="text-[#0D1B2A]">Support</strong></span>
      </header>

      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-[560px] bg-white rounded-2xl shadow-modal p-8">
          <StepTabs current={step} />

          {step === 0 && <Step1 onNext={() => setStep(1)} />}
          {step === 1 && <Step2 onBack={() => setStep(0)} onNext={() => setStep(2)} />}
          {step === 2 && <Step3 onBack={() => setStep(1)} onNext={() => setStep(3)} />}
          {step === 3 && <Step4 onBack={() => setStep(2)} onNext={handleComplete} />}

          <p className="text-center text-xs text-[#6B7280] mt-6">
            Privacy Policy | Terms of service · <span className="text-[#4F7FAF]">© Luna Fortis 2026</span>
          </p>
        </div>
      </div>
    </div>
  );
}
