import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import { OTPInput } from "@/components/ui";

type Step = "email" | "otp" | "change" | "success";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["","","","","",""]);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [loading, setLoading] = useState(false);

  const next = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    if (step === "email") setStep("otp");
    else if (step === "otp") setStep("change");
    else if (step === "change") setStep("success");
    else navigate("/login");
  };

  return (
    <AuthLayout>
      <AuthCard>
        {step === "email" && (
          <>
            <h2 className="text-xl font-bold text-[#0D1B2A] mb-6">Forgot Password</h2>
            <div className="space-y-4">
              <div>
                <label className="lf-label">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="E.g johndoe@gmail.com" className="lf-input" />
              </div>
              <button onClick={next} disabled={loading} className="btn-primary">{loading ? "Sending..." : "Verify Email"}</button>
              <p className="text-center text-sm text-[#6B7280]">
                Remember password? <Link to="/login" className="font-semibold text-[#0D1B2A]">Login</Link>
              </p>
            </div>
          </>
        )}

        {step === "otp" && (
          <>
            <h2 className="text-xl font-bold text-[#0D1B2A] mb-2">Enter OTP</h2>
            <p className="text-xs text-[#6B7280] mb-4">
              Please provide the 6-digit OTP code send we sent to f***2@gmail.com
            </p>
            <OTPInput value={otp} onChange={setOtp} />
            <p className="text-xs text-[#6B7280] mt-3 mb-5">
              Didn't receive code?{" "}
              <button className="text-[#4F7FAF] font-semibold italic hover:underline">Resend code in (1:17)</button>
            </p>
            <button onClick={next} disabled={loading} className="btn-primary">{loading ? "Verifying..." : "Confirm OTP"}</button>
          </>
        )}

        {step === "change" && (
          <>
            <h2 className="text-xl font-bold text-[#0D1B2A] mb-2">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="lf-label">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Typing |" className="lf-input" />
              </div>
              <div>
                <label className="lf-label">New Password</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]"><Lock size={15}/></span>
                  <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••" className="lf-input pl-9 pr-10" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
                    {showPw ? <EyeOff size={15}/> : <Eye size={15}/>}
                  </button>
                </div>
                <p className="text-xs text-[#9CA3AF] mt-1">8 Characters min · Capital Letter · Number · Special Character</p>
              </div>
              <div>
                <label className="lf-label">Confirm New Password</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]"><Lock size={15}/></span>
                  <input type={showCf ? "text" : "password"} value={confirm} onChange={e => setConfirm(e.target.value)}
                    placeholder="••••••••" className="lf-input pl-9 pr-10" />
                  <button type="button" onClick={() => setShowCf(!showCf)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
                    {showCf ? <EyeOff size={15}/> : <Eye size={15}/>}
                  </button>
                </div>
              </div>
              <button onClick={next} disabled={loading} className="btn-primary">{loading ? "Resetting..." : "Reset Password"}</button>
            </div>
          </>
        )}

        {step === "success" && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-[#D1FAE5] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#0D1B2A] mb-2">Password Reset</h2>
            <p className="text-xs text-[#6B7280] mb-6">Your password has been successfully reset. You can now access your account.</p>
            <button onClick={next} className="btn-primary">Login</button>
          </div>
        )}
      </AuthCard>
    </AuthLayout>
  );
}
