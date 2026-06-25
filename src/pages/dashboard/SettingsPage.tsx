import { useState } from "react";
import { ArrowLeft, Building2, Settings, CreditCard, Palette, Bell, Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { OTPInput, ConfirmModal, SuccessModal, Toggle, Select } from "@/components/ui";

type Section = "main" | "business" | "account" | "payout" | "branding" | "notification";
type AccountSub = "main" | "2fa_phone" | "2fa_email" | "2fa_updated" | "2fa_disable_confirm" | "2fa_disabled" | "change_pw";

const SETTINGS_ITEMS = [
  { id: "business", icon: Building2, label: "Business Information", desc: "Manage your company details, contact information, and operational profile across the platform." },
  { id: "account",  icon: Settings,  label: "Account Settings",     desc: "Update your account preferences, login credentials, and security settings for safer access." },
  { id: "payout",   icon: CreditCard, label: "Payout",             desc: "Manage your banking details and payout preferences for smooth and secure payment processing." },
  { id: "branding", icon: Palette,   label: "Branding",             desc: "Customize your business identity with logos, visuals, and brand assets for a professional presence." },
];

// ── Business Info ─────────────────────────────────────────────────────────────
function BusinessInfoPage({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState(0);
  const TABS = ["Business Info", "Address Information", "Documents", "Director Details"];
  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#0D1B2A] mb-5">
        <ArrowLeft size={15} /> Back
      </button>
      <div className="flex border-b border-[#E5E7EB] mb-6">
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)}
            className={cn("py-2.5 px-3 text-sm font-medium border-b-2 -mb-px transition-colors",
              i === tab ? "border-[#0D1B2A] text-[#0D1B2A]" : "border-transparent text-[#9CA3AF] hover:text-[#6B7280]")}>
            {t}
          </button>
        ))}
      </div>

      {tab === 0 && (
        <div className="max-w-3xl space-y-4">
          <div><label className="lf-label">Registered Business Name *</label><input defaultValue="Adekay Houses" className="lf-input" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="lf-label">RC Number *</label><input defaultValue="123456890" className="lf-input" /></div>
            <div><label className="lf-label">Tax ID *</label><input defaultValue="TIN-123456890" className="lf-input" /></div>
            <div><label className="lf-label">RC Number *</label><input defaultValue="123456890" className="lf-input" /></div>
            <div><label className="lf-label">Date of Registration</label><input type="date" defaultValue="2020-12-12" className="lf-input" /></div>
          </div>
          <Select label="Business Type *" value="Accomodation" onChange={() => {}}
            options={[{ value: "Accomodation", label: "Accomodation" }, { value: "Car", label: "Car Rental" }]} />
          <div><label className="lf-label">Business Type</label><input defaultValue="Accomodation" className="lf-input" /></div>
          <button className="btn-primary">Save Changes</button>
        </div>
      )}
      {tab !== 0 && (
        <p className="text-sm text-[#6B7280]">Section {TABS[tab]} — same pattern as KYB form.</p>
      )}
    </div>
  );
}

// ── Account Settings ──────────────────────────────────────────────────────────
function AccountSettingsPage({ onBack }: { onBack: () => void }) {
  const [sub, setSub] = useState<AccountSub>("main");
  const [otp, setOtp] = useState(["","","","","",""]);
  const [showPw, setShowPw] = useState({ current: false, new: false, confirm: false });

  if (sub === "main") {
    return (
      <div>
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#0D1B2A] mb-5">
          <ArrowLeft size={15} /> Back
        </button>
        <div className="max-w-3xl space-y-3">
          <button onClick={() => setSub("2fa_phone")}
            className="w-full flex items-center gap-3 p-4 border border-[#E5E7EB] rounded-xl hover:border-[#0D1B2A] transition-colors text-left">
            <ShieldCheck size={18} className="text-[#4F7FAF]" />
            <div><p className="text-sm font-semibold text-[#0D1B2A]">2-Factor Authentication</p>
              <p className="text-xs text-[#6B7280]">Add an extra layer of security to your account</p></div>
          </button>
          <button onClick={() => setSub("change_pw")}
            className="w-full flex items-center gap-3 p-4 border border-[#E5E7EB] rounded-xl hover:border-[#0D1B2A] transition-colors text-left">
            <Lock size={18} className="text-[#E8392A]" />
            <div><p className="text-sm font-semibold text-[#0D1B2A]">Change Password</p>
              <p className="text-xs text-[#6B7280]">Update your password regularly to keep your account</p></div>
          </button>
        </div>
      </div>
    );
  }

  if (sub === "2fa_phone" || sub === "2fa_email") {
    const isPhone = sub === "2fa_phone";
    return (
      <div className="max-w-lg">
        <button onClick={() => setSub("main")} className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#0D1B2A] mb-5">
          <ArrowLeft size={15} /> Back
        </button>
        <h2 className="text-base font-bold text-[#0D1B2A] mb-1">
          Enable 2FA via <span className={isPhone ? "text-[#4F7FAF]" : "text-[#E8392A]"}>{isPhone ? "Phone" : "Email"}</span>
        </h2>
        <p className="text-xs text-[#6B7280] mb-4">
          Please provide the 6-digit OTP code send we sent to {isPhone ? "+234 80*****99" : "f****2@gmail.com"}
        </p>
        <OTPInput value={otp} onChange={setOtp} />
        <button onClick={() => setSub("2fa_updated")} className="btn-primary mt-4">Setup 2FA</button>
      </div>
    );
  }

  if (sub === "2fa_updated") {
    return (
      <div className="max-w-lg">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#EEF3F8] rounded-full flex items-center justify-center">
              <ShieldCheck size={28} className="text-[#0D1B2A]" />
            </div>
          </div>
          <h3 className="text-base font-bold text-[#0D1B2A] text-center mb-2">Two-Factor Authentication Updated</h3>
          <p className="text-xs text-[#6B7280] text-center mb-5">Your 2FA settings have been successfully updated. Your account is now protected based on your selected preference.</p>
          <button onClick={() => setSub("main")} className="btn-primary">Close</button>
        </div>
      </div>
    );
  }

  if (sub === "2fa_disable_confirm") {
    return (
      <ConfirmModal icon="warning" title="Disable Two-Factor Authentication?"
        message='Are you sure you want to disable Two-Factor Authentication. Click on the "Proceed" button to continue.'
        onCancel={() => setSub("main")} onConfirm={() => setSub("2fa_disabled")}
        cancelLabel="Back" confirmLabel="Proceed" />
    );
  }

  if (sub === "2fa_disabled") {
    return (
      <SuccessModal icon="warning" title="Two-Factor Authentication Disabled"
        message="This product has been successfully deleted."
        onClose={() => setSub("main")} closeLabel="Done" />
    );
  }

  if (sub === "change_pw") {
    return (
      <div>
        <button onClick={() => setSub("main")} className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#0D1B2A] mb-5">
          <ArrowLeft size={15} /> Back
        </button>
        <h2 className="text-base font-bold text-[#0D1B2A] mb-1">Change Password</h2>
        <p className="text-xs text-[#6B7280] mb-5">Select an option to further secure your account.</p>
        <div className="max-w-lg space-y-4">
          {(["Current Password","New Password","Confirm Password"] as const).map((label, i) => {
            const key = (["current","new","confirm"] as const)[i];
            return (
              <div key={label}>
                <p className="lf-label">{label}</p>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]"><Lock size={14}/></span>
                  <input type={showPw[key] ? "text" : "password"} defaultValue="••••••••" className="lf-input pl-9 pr-10" />
                  <button type="button" onClick={() => setShowPw(p => ({ ...p, [key]: !p[key] }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
                    {showPw[key] ? <EyeOff size={14}/> : <Eye size={14}/>}
                  </button>
                </div>
                {label === "New Password" && <p className="text-xs text-[#9CA3AF] mt-1">8 Characters · Capital Letter · Number · Special Character</p>}
              </div>
            );
          })}
          <button className="bg-[#0D1B2A] text-white font-semibold py-3 px-8 rounded-xl text-sm hover:bg-[#1a2d40] transition-colors">
            Update Password
          </button>
        </div>
      </div>
    );
  }

  return null;
}

// ── Payout ────────────────────────────────────────────────────────────────────
function PayoutPage({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#0D1B2A] mb-5">
        <ArrowLeft size={15} /> Back
      </button>
      <h2 className="text-base font-bold text-[#0D1B2A] mb-1">Payout Account Details</h2>
      <p className="text-xs text-[#6B7280] mb-5">Can only be changed once</p>
      <div className="max-w-lg space-y-4">
        <Select label="Bank Name *" value="First Bank" onChange={() => {}}
          options={[{ value: "First Bank", label: "First Bank" }, { value: "GTBank", label: "GTBank" }, { value: "UBA", label: "UBA" }]} />
        <div><label className="lf-label">Account Number</label><input defaultValue="0123456789" className="lf-input" /></div>
        <div><label className="lf-label">Account Name</label><input defaultValue="Addey Homes LTD" className="lf-input" /></div>
        <button className="btn-primary">Save</button>
      </div>
    </div>
  );
}

// ── Branding ──────────────────────────────────────────────────────────────────
function BrandingPage({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#0D1B2A] mb-5">
        <ArrowLeft size={15} /> Back
      </button>
      <h2 className="text-base font-bold text-[#0D1B2A] mb-1">Branding</h2>
      <p className="text-xs text-[#6B7280] mb-5">Customize your business identity with logos, visuals, and brand assets for a professional presence.</p>
      <div className="max-w-lg space-y-4">
        <div>
          <label className="lf-label">Brand Logo</label>
          <div className="flex gap-2">
            <input placeholder="Select Item" className="lf-input flex-1" readOnly />
            <button className="bg-[#0D1B2A] text-white font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-[#1a2d40]">Browse</button>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-1">Supported formats are *jpg and *png</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-[#0D1B2A] mb-2">PREVIEW</p>
          <div className="w-12 h-12 bg-[#E8392A] rounded-full flex items-center justify-center text-white font-bold text-lg">A</div>
        </div>
      </div>
    </div>
  );
}

// ── Email Notification ────────────────────────────────────────────────────────
function NotificationPage({ onBack }: { onBack: () => void }) {
  const [toggles, setToggles] = useState({
    login: true, newBooking: true, bookingCanceled: true, activity: true, transaction: true,
  });
  const toggle = (k: keyof typeof toggles) => setToggles(t => ({ ...t, [k]: !t[k] }));

  const ITEMS = [
    { key: "login", label: "Login" },
    { key: "newBooking", label: "New booking is created" },
    { key: "bookingCanceled", label: "Booking Canceled" },
    { key: "activity", label: "An activity occurs on my account" },
    { key: "transaction", label: "Transaction Alerts" },
  ] as const;

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#0D1B2A] mb-5">
        <ArrowLeft size={15} /> Back
      </button>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-[#0D1B2A] mb-0.5">Email Notification</h2>
          <p className="text-xs text-[#6B7280]">Notify me when:</p>
        </div>
        <button className="text-xs text-[#4F7FAF] font-semibold hover:underline">Un-toggle all</button>
      </div>
      <div className="max-w-lg space-y-4">
        {ITEMS.map(item => (
          <div key={item.key} className="flex items-center justify-between">
            <span className="text-sm text-[#0D1B2A]">{item.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6B7280]">{toggles[item.key] ? "Yes" : "No"}</span>
              <Toggle checked={toggles[item.key]} onChange={() => toggle(item.key)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Settings Page ────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [section, setSection] = useState<Section>("main");

  const render = () => {
    if (section === "business") return <BusinessInfoPage onBack={() => setSection("main")} />;
    if (section === "account") return <AccountSettingsPage onBack={() => setSection("main")} />;
    if (section === "payout") return <PayoutPage onBack={() => setSection("main")} />;
    if (section === "branding") return <BrandingPage onBack={() => setSection("main")} />;
    if (section === "notification") return <NotificationPage onBack={() => setSection("main")} />;

    return (
      <div className="max-w-3xl">
        <h2 className="text-base font-bold text-[#0D1B2A] mb-5">Settings</h2>
        <div className="space-y-3">
          {SETTINGS_ITEMS.map(item => (
            <button key={item.id} onClick={() => setSection(item.id as Section)}
              className="w-full flex items-start gap-3 p-4 border border-[#E5E7EB] rounded-xl hover:border-[#0D1B2A] transition-colors text-left group">
              <div className="w-9 h-9 bg-[#F3F4F6] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#EEF3F8]">
                <item.icon size={18} className="text-[#0D1B2A]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0D1B2A]">{item.label}</p>
                <p className="text-xs text-[#6B7280] mt-0.5">{item.desc}</p>
              </div>
            </button>
          ))}
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider pt-2">Others</p>
          <button onClick={() => setSection("notification")}
            className="w-full flex items-start gap-3 p-4 border border-[#E5E7EB] rounded-xl hover:border-[#0D1B2A] transition-colors text-left group">
            <div className="w-9 h-9 bg-[#F3F4F6] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#EEF3F8]">
              <Bell size={18} className="text-[#0D1B2A]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0D1B2A]">Notification</p>
              <p className="text-xs text-[#6B7280] mt-0.5">Manage booking alerts, platform updates, and important notifications to stay informed at all times.</p>
            </div>
          </button>
        </div>
        <p className="text-center text-xs text-[#6B7280] mt-8">
          Privacy Policy | Terms of service · <span className="text-[#4F7FAF]">© Luna Fortis 2026</span>
        </p>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">Settings</h1>
      {render()}
    </div>
  );
}
