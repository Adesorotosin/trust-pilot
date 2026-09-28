"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Globe2,
  Lock,
  Moon,
  ShieldCheck,
  Sun,
  UserPlus,
} from "lucide-react";

import { createClient } from "@/utils/supabase/client";

function SignupLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-sm text-muted-foreground">Loading...</div>
    </main>
  );
}

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resolvedTheme, setTheme } = useTheme();

  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const redirectPath = searchParams.get("next") || "/dashboard";

  const safeRedirect =
    redirectPath.startsWith("/") && !redirectPath.startsWith("//")
      ? redirectPath
      : "/dashboard";

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleGoogleSignup = async () => {
    try {
      setGoogleLoading(true);
      setError("");

      const origin = window.location.origin;

      const { error: googleError } =
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(
              safeRedirect
            )}`,
          },
        });

      if (googleError) {
        setError(googleError.message);
        setGoogleLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setGoogleLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanName = fullName.trim();
    const cleanCompany = companyName.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      setError("Please enter your full name.");
      return;
    }

    if (!cleanCompany) {
      setError("Please enter your company name.");
      return;
    }

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 6) {
      setError("Your password must be at least 6 characters.");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the terms to continue.");
      return;
    }

    try {
      setLoading(true);

      const origin = window.location.origin;

      const { data, error: signupError } =
        await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(
              safeRedirect
            )}`,
            data: {
              full_name: cleanName,
              company_name: cleanCompany,
            },
          },
        });

      if (signupError) {
        setError(signupError.message);
        return;
      }

      if (data.session) {
        router.push(safeRedirect);
        router.refresh();
        return;
      }

      setSuccess(
        "Account created. Check your email to confirm your account before signing in."
      );
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left panel */}
        <section className="relative hidden overflow-hidden bg-muted/30 lg:flex">
          <div className="absolute inset-0">
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2 text-lg font-semibold tracking-tight"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white">
                <Globe2 className="h-5 w-5" />
              </span>
              Trade Copilot
            </Link>

            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                Built for modern importers
              </div>

              <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
                Make smarter trade decisions before your shipment moves.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground xl:text-lg">
                Trade Copilot helps you understand your shipment documents,
                costs, trade requirements, and potential issues in one place.
              </p>

              <div className="mt-10 grid gap-4">
                {[
                  "Understand your landed cost",
                  "Review trade documents faster",
                  "Spot potential issues earlier",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Trade Copilot · Trade intelligence for modern businesses
            </p>
          </div>
        </section>

        {/* Right panel */}
        <section className="flex min-h-screen flex-col">
          <div className="flex items-center justify-between px-6 py-6 lg:justify-end lg:px-10">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold lg:hidden"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
                <Globe2 className="h-4 w-4" />
              </span>
              Trade Copilot
            </Link>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center px-6 pb-12">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                  <UserPlus className="h-5 w-5" />
                </div>

                <h2 className="text-3xl font-semibold tracking-tight">
                  Create your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Start using Trade Copilot to make better-informed trade
                  decisions.
                </p>
              </div>

              {error && (
                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
                  {success}
                </div>
              )}

              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={googleLoading || loading}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-background text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M21.35 12.23c0-.79-.07-1.55-.22-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.93-4.18 2.93-7.4Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.74 9.74 0 0 0 12 21.5Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M6.54 13.59A5.85 5.85 0 0 1 6.23 12c0-.55.11-1.08.31-1.59V7.89H3.3A9.5 9.5 0 0 0 2.25 12c0 1.53.37 2.97 1.05 4.11l3.24-2.52Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 6.38c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.48 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.39l3.24 2.52C7.31 8.1 9.46 6.38 12 6.38Z"
                  />
                </svg>

                {googleLoading ? "Connecting..." : "Continue with Google"}
              </button>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">
                  OR CONTINUE WITH EMAIL
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <form onSubmit={handleSignup} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
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
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Oluwatosin Adesoro"
                      autoComplete="name"
                      disabled={loading}
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="companyName"
                      className="mb-2 block text-sm font-medium"
                    >
                      Company
                    </label>

                    <input
                      id="companyName"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Your company"
                      autoComplete="organization"
                      disabled={loading}
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    disabled={loading}
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      autoComplete="new-password"
                      disabled={loading}
                      className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-12 text-sm outline-none transition placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    disabled={loading}
                    className="mt-0.5 h-4 w-4 rounded border-border accent-emerald-500"
                  />

                  <span>
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="font-medium text-foreground underline underline-offset-4 hover:text-emerald-500"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-medium text-foreground underline underline-offset-4 hover:text-emerald-500"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                >
                  {loading ? "Creating account..." : "Create account"}

                  {!loading && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
              </form>

              <div className="mt-8 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                <span>Already have an account?</span>

                <Link
                  href="/login"
                  className="font-semibold text-foreground hover:text-emerald-500"
                >
                  Sign in
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" />
                Your account is protected by Supabase Auth.
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupLoading />}>
      <SignupContent />
    </Suspense>
  );
}