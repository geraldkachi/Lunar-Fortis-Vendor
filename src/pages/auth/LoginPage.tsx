import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    navigate("/dashboard");
  };

  return (
    <AuthLayout>
      <AuthCard>
        <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">Welcome Merchant</h1>
        <div className="space-y-4">
          <div>
            <label className="lf-label">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Typing |" className="lf-input" />
          </div>
          <div>
            <label className="lf-label">Label</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]"><Lock size={15} /></span>
              <input type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••" className="lf-input pl-9 pr-10" />
              <button type="button" onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <p className="text-xs text-[#9CA3AF] mt-1.5">
              Password must be at least <strong className="text-[#0D1B2A]">8 Characters</strong> and must contain at least a{" "}
              <strong className="text-[#E8392A]">Capital Letter</strong>, a Number and a Special Character
            </p>
          </div>
          <p className="text-sm">
            Forgot password?{" "}
            <Link to="/forgot-password" className="font-semibold italic text-[#4F7FAF] hover:underline">Reset here</Link>
          </p>
          <button onClick={handle} disabled={loading} className="btn-primary">
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-center text-sm text-[#6B7280]">
            New user? <Link to="/signup" className="font-semibold italic text-[#4F7FAF] hover:underline">Create account</Link>
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
