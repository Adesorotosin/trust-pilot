"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Moon,
  ShieldCheck,
  Sun,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setMounted(true);

    const error = searchParams.get("error");

    if (error === "auth-code-error") {
      setErrorMessage(
        "We couldn't complete your Google sign-in. Please try again."
      );
    }
  }, [searchParams]);

  const getAuthErrorMessage = (message: string) => {
    const normalizedMessage = message.toLowerCase();

    if (
      normalizedMessage.includes("invalid login credentials") ||
      normalizedMessage.includes("invalid credentials")
    ) {
      return "The email or password is incorrect.";
    }

    if (normalizedMessage.includes("email not confirmed")) {
      return "Please confirm your email address before signing in.";
    }

    if (normalizedMessage.includes("too many requests")) {
      return "Too many attempts. Please wait a moment and try again.";
    }

    if (normalizedMessage.includes("network")) {
      return "Network error. Please check your connection and try again.";
    }

    return "Something went wrong while signing you in. Please try again.";
  };

  const handleGoogleLogin = async () => {
    if (googleLoading || loading) return;

    setErrorMessage("");
    setSuccessMessage("");
    setGoogleLoading(true);

    try {
      const origin = window.location.origin;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback?next=/dashboard`,
        },
      });

      if (error) {
        setErrorMessage(getAuthErrorMessage(error.message));
        setGoogleLoading(false);
      }
    } catch {
      setErrorMessage(
        "Unable to connect to Google right now. Please try again."
      );
      setGoogleLoading(false);
    }
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading || googleLoading) return;

    setErrorMessage("");
    setSuccessMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        setErrorMessage(getAuthErrorMessage(error.message));
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setErrorMessage(
        "Something went wrong while signing you in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left visual panel */}
        <section className="relative hidden overflow-hidden bg-slate-950 lg:flex">
          <div className="absolute inset-0">
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/5 blur-3xl" />
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-sm font-bold text-slate-950">
                  TC
                </div>

                <span className="text-lg font-semibold tracking-tight text-white">
                  Trade Copilot
                </span>
              </div>
            </div>

            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                AI TRADE INTELLIGENCE
              </div>

              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-5xl">
                Make better trade decisions before you ship.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
                Review trade documents, understand landed costs, and identify
                potential issues before they become expensive surprises.
              </p>

              <div className="mt-10 grid max-w-md gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                  <LockKeyhole className="mb-3 h-5 w-5 text-emerald-400" />

                  <p className="text-sm font-medium text-white">
                    Secure workspace
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Keep your trade workflow in one place.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                  <ShieldCheck className="mb-3 h-5 w-5 text-emerald-400" />

                  <p className="text-sm font-medium text-white">
                    Decision support
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Surface important information before you act.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              Trade Copilot · Trade intelligence for modern importers
            </p>
          </div>
        </section>

        {/* Login panel */}
        <section className="relative flex min-h-screen flex-col bg-background transition-colors duration-300">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-5 sm:px-10">
            {/* Mobile logo */}
            <div className="flex items-center gap-2.5 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-xs font-bold text-background">
                TC
              </div>

              <span className="font-semibold tracking-tight">
                Trade Copilot
              </span>
            </div>

            <div className="ml-auto">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={
                  mounted
                    ? `Switch to ${
                        resolvedTheme === "dark" ? "light" : "dark"
                      } mode`
                    : "Toggle theme"
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                {mounted ? (
                  resolvedTheme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )
                ) : (
                  <span className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Form area */}
          <div className="flex flex-1 items-center justify-center px-6 pb-12 pt-6 sm:px-10 lg:px-16">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <p className="mb-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Welcome back
                </p>

                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Sign in to Trade Copilot
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Continue to your trade intelligence workspace.
                </p>
              </div>

              {/* Error */}
              {errorMessage && (
                <div
                  role="alert"
                  className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-600 dark:text-red-400"
                >
                  {errorMessage}
                </div>
              )}

              {/* Success */}
              {successMessage && (
                <div
                  role="status"
                  className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm leading-5 text-emerald-600 dark:text-emerald-400"
                >
                  {successMessage}
                </div>
              )}

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading || loading}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                {googleLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      fill="#4285F4"
                      d="M21.35 12.23c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.5Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M6.53 13.59A5.86 5.86 0 0 1 6.22 12c0-.55.1-1.09.31-1.59V7.88H3.29A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.12l3.24-2.53Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 6.38c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.47 14.63 2.5 12 2.5a9.75 9.75 0 0 0-8.71 5.38l3.24 2.53C7.3 8.1 9.46 6.38 12 6.38Z"
                    />
                  </svg>
                )}

                {googleLoading ? "Connecting..." : "Continue with Google"}
              </button>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />

                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  or
                </span>

                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Email form */}
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    disabled={loading || googleLoading}
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={() => router.push("/forgot-password")}
                      className="text-xs font-medium text-emerald-600 transition-colors hover:text-emerald-500 dark:text-emerald-400"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      disabled={loading || googleLoading}
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 pr-12 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-foreground px-5 text-sm font-semibold text-background transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Sign up */}
              <p className="mt-8 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="font-semibold text-foreground underline-offset-4 transition-colors hover:text-emerald-600 hover:underline dark:hover:text-emerald-400"
                >
                  Create an account
                </button>
              </p>

              <p className="mt-8 text-center text-xs leading-5 text-muted-foreground">
                By continuing, you agree to use Trade Copilot responsibly and
                in accordance with its terms and policies.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}