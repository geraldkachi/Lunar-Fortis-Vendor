import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/ui";
import { CheckCircle } from "lucide-react";

const REQUIREMENTS = [
  "Business information like RC Number, Tax Identification Number (TIN), Business Address e.t.c.",
  "Business documents like CAC, MEMART, Form A and Business proof of Address.",
  "Directors & beneficial owner details like first name, last name, BVN and Means of ID.",
  "Business contact person details like, first name, last name, phone number.",
];

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
      <header className="bg-white border-b border-[#E5E7EB] h-14 flex items-center justify-between px-6">
        <Logo />
        <span className="text-sm text-[#6B7280]">Having an issue? <strong className="text-[#0D1B2A]">Support</strong></span>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[560px] bg-white rounded-2xl shadow-modal overflow-hidden">
          {/* KYB Banner */}
          <div className="bg-[#0D1B2A] text-white p-4 flex items-start gap-3">
            <div className="flex-1">
              <p className="text-xs font-semibold text-white/70 mb-0.5">Complete your KYB</p>
              <p className="text-xs text-white/60">Click here to complete your account setup to get the most of your OneFunnel account.</p>
            </div>
            <div className="bg-white/10 rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap">
              Business Registration Details →
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-2xl font-bold text-[#0D1B2A] mb-3">Welcome to Luna Fortis</h1>
            <p className="text-sm text-[#6B7280] mb-5">
              To kickstart your KYB process, we will be needing the following details from you:
            </p>

            <ul className="space-y-3 mb-8">
              {REQUIREMENTS.map((req, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#6B7280]">
                  <CheckCircle size={16} className="text-[#0D1B2A] mt-0.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>

            <button onClick={() => navigate("/onboarding/kyb")} className="btn-primary mb-3">
              Get Started
            </button>
            <p className="text-center text-xs text-[#6B7280]">
              By clicking the button above, I understand and I agree to OneFunnels{" "}
              <span className="text-[#4F7FAF] hover:underline cursor-pointer">Privacy Policy</span> and{" "}
              <span className="text-[#4F7FAF] hover:underline cursor-pointer">Terms and conditions.</span>
            </p>
          </div>

          <div className="border-t border-[#E5E7EB] px-8 py-4 text-center">
            <p className="text-xs text-[#6B7280]">
              Privacy Policy | Terms of service · <span className="text-[#4F7FAF]">© Luna Fortis 2026</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
