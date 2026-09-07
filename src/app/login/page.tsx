"use client";

import { useState } from "react";
import Link from "link";
import { Eye, EyeOff, Shield, ArrowUpRight, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const supabase = createClient();

  const handleGoogleSignIn = async () => {
    try {
      setLoadingGoogle(true);
      setErrorMsg(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) setErrorMsg(error.message);
    } catch (err) {
      console.error("Unexpected error during Google sign in:", err);
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg(null);

      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error("Unexpected error during login:", err);
      setErrorMsg("An unexpected error occurred during log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 font-sans">
      
      {/* LEFT SIDE: GRAPHIC VISUAL (HIDDEN ON MOBILE) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#080D1A] text-white p-8 lg:p-16 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#10B981] flex items-center justify-center font-bold text-white shadow-lg shadow-[#10B981]/20">
              <ArrowUpRight className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              TradePilot
            </span>
          </div>

          <div className="mt-12 lg:mt-20 max-w-lg">
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              Welcome back to your trade hub.
            </h1>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Monitor active shipments, review customs declarations, and manage compliance seamlessly.
            </p>
          </div>
        </div>

        <div className="relative z-10 border-t border-slate-800/80 pt-6">
          <p className="text-xs text-slate-400">
            Trusted by 500+ SME importers across Nigeria, Kenya, & Ghana
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: FULL WIDTH ON MOBILE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md bg-white dark:bg-[#0E1320] p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
          
          {/* Mobile Logo Brand Badge */}
          <div className="flex lg:hidden items-center gap-2 mb-2">
            <div className="h-7 w-7 rounded-lg bg-[#10B981] flex items-center justify-center font-bold text-white shadow-md shadow-[#10B981]/20">
              <ArrowUpRight className="h-4 w-4" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              TradePilot
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Log in to TradePilot
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Work Email
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#10B981] transition-all"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <Link href="/forgot-password" className="text-[11px] text-[#10B981] hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#10B981] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#10B981] hover:bg-[#0D9668] text-white font-semibold text-xs shadow-md shadow-[#10B981]/20 transition-all mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Log In"}
            </button>
          </form>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full"></div>
            <span className="bg-white dark:bg-[#0E1320] px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider relative z-10">
              OR
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loadingGoogle}
            className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {loadingGoogle ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#10B981]" />
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.1 0-5.74-2.09-6.68-4.91H1.36v3.15C3.33 21.32 7.37 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.32 14.29c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.56H1.36C.49 8.29 0 10.09 0 12s.49 3.71 1.36 5.44l3.96-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.33 2.68 1.36 6.56l3.96 3.15c.94-2.82 3.58-4.96 6.68-4.96z"
                />
              </svg>
            )}
            {loadingGoogle ? "Connecting..." : "Continue with Google"}
          </button>

          <p className="text-center text-xs text-slate-500 dark:text-slate-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#10B981] hover:underline font-bold">
              Sign up
            </Link>
          </p>

          <div className="pt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <Shield className="h-3.5 w-3.5 text-slate-400" />
            Bank-grade data encryption and compliance auditing standards
          </div>

        </div>
      </div>

    </div>
  );
}