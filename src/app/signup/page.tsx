"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Moon,
  ShieldCheck,
  Sun,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function SignupPage() {
  const { theme, setTheme } = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    password: "",
    agreeToTerms: false,
  });

  const handleGoogleSignIn = async () => {
    try {
      setLoadingGoogle(true);
      setErrorMsg(null);
      setSuccessMsg(null);

      const supabase = createClient();
      const origin = window.location.origin;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback?next=/dashboard`,
        },
      });

      if (error) {
        console.error("Google signup error:", error);
        setErrorMsg(error.message);
        setLoadingGoogle(false);
      }
    } catch (err: unknown) {
      console.error("Unexpected Google signup error:", err);

      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred.";

      setErrorMsg(message);
      setLoadingGoogle(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanFullName = formData.fullName.trim();
    const cleanCompanyName = formData.companyName.trim();

    if (!cleanFullName) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    if (!cleanEmail) {
      setErrorMsg("Please enter your email address.");
      return;
    }

    if (!cleanCompanyName) {
      setErrorMsg("Please enter your company name.");
      return;
    }

    // Never trim passwords. Spaces can technically be part of a password.
    if (formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    if (!formData.agreeToTerms) {
      setErrorMsg(
        "You must agree to the Terms of Service and Privacy Policy."
      );
      return;
    }

    try {
      setLoading(true);

      const supabase = createClient();
      const origin = window.location.origin;

      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password: formData.password,
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=/dashboard`,
          data: {
            full_name: cleanFullName,
            company_name: cleanCompanyName,
          },
        },
      });

      if (error) {
        console.error(
          "Supabase signup error:",
          error.status,
          error.message
        );

        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      /*
       * Supabase behaves differently depending on whether
       * email confirmation is enabled.
       *
       * If a session exists, the user can go directly
       * to the dashboard.
       *
       * If there is no session, Supabase is most likely
       * waiting for email confirmation.
       */
      if (data.session) {
        window.location.href = "/dashboard";
        return;
      }

      setSuccessMsg(
        "Account created. Check your email to confirm your account before signing in."
      );

      setLoading(false);
    } catch (err: unknown) {
      console.error("Unexpected signup error:", err);

      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during sign up.";

      setErrorMsg(message);
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* =========================================================
            LEFT SIDE
        ========================================================= */}
        <section className="relative hidden overflow-hidden bg-zinc-950 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.16),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.08),transparent_35%)]" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 font-bold text-black">
                TC
              </div>

              <span className="text-lg font-semibold text-white">
                Trade Copilot
              </span>
            </div>

            {/* Main message */}
            <div className="max-w-xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Trade intelligence
              </p>

              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-6xl">
                Understand your trade before it moves.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-zinc-400">
                Bring your shipment documents, costs, and trade information
                together so you can make clearer decisions before and during
                the import process.
              </p>
            </div>

            {/* Simple product visual */}
            <div className="relative mx-auto w-full max-w-md py-10">
              <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-2xl backdrop-blur-xl">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Trade workspace
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white">
                      Shipment overview
                    </p>
                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                    <ArrowRight className="h-4 w-4 text-emerald-400" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-500">
                        Documents
                      </span>

                      <span className="text-xs font-medium text-emerald-400">
                        Ready for review
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-500">
                        Landed cost
                      </span>

                      <span className="text-xs font-medium text-zinc-300">
                        Visibility
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-500">
                        Trade checks
                      </span>

                      <span className="text-xs font-medium text-zinc-300">
                        Review
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-zinc-500">
              Trade Copilot
            </p>
          </div>
        </section>

        {/* =========================================================
            RIGHT SIDE
        ========================================================= */}
        <section className="flex min-h-screen flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between p-6 sm:p-8">
            {/* Mobile brand */}
            <div className="flex items-center gap-3 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-sm font-bold text-black">
                TC
              </div>

              <span className="font-semibold">Trade Copilot</span>
            </div>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Form area */}
          <div className="flex flex-1 items-center justify-center px-6 pb-12 sm:px-8">
            <div className="w-full max-w-md">
              {/* Heading */}
              <div className="mb-8">
                <p className="mb-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Get started
                </p>

                <h2 className="text-3xl font-semibold tracking-tight">
                  Create your Trade Copilot account
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Set up your workspace and start organizing your trade
                  information.
                </p>
              </div>

              {/* Error */}
              {errorMsg && (
                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                  {errorMsg}
                </div>
              )}

              {/* Success */}
              {successMsg && (
                <div className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
                  {successMsg}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-medium"
                  >
                    Full name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Oluwatosin Adesoro"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullName: e.target.value,
                      })
                    }
                    disabled={loading || loadingGoogle}
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Work email
                  </label>

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    disabled={loading || loadingGoogle}
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                    required
                  />
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="companyName"
                    className="mb-2 block text-sm font-medium"
                  >
                    Company name
                  </label>

                  <input
                    id="companyName"
                    type="text"
                    autoComplete="organization"
                    placeholder="Your company"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyName: e.target.value,
                      })
                    }
                    disabled={loading || loadingGoogle}
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="At least 6 characters"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                      disabled={loading || loadingGoogle}
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 pr-12 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        agreeToTerms: e.target.checked,
                      })
                    }
                    disabled={loading || loadingGoogle}
                    className="mt-0.5 h-4 w-4 rounded border-border accent-emerald-500"
                    required
                  />

                  <label
                    htmlFor="terms"
                    className="text-xs leading-5 text-muted-foreground"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || loadingGoogle}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-semibold text-black transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />

                <span className="text-xs text-muted-foreground">
                  OR
                </span>

                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading || loadingGoogle}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-background text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingGoogle ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="#4285F4"
                      d="M21.35 12.23c0-.79-.07-1.55-.23-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.93-4.18 2.93-7.4Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.74 9.74 0 0 0 12 21.5Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M6.54 13.6A5.85 5.85 0 0 1 6.23 12c0-.56.11-1.1.31-1.6V7.88H3.3A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.12l3.24-2.52Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 6.37c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.42 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.38l3.24 2.52C7.31 8.09 9.46 6.37 12 6.37Z"
                    />
                  </svg>
                )}

                {loadingGoogle
                  ? "Connecting..."
                  : "Continue with Google"}
              </button>

              {/* Login */}
              <p className="mt-8 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-foreground underline underline-offset-4 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Log in
                </Link>
              </p>

              {/* Security note */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                <span>Your account is protected by Supabase Auth.</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}