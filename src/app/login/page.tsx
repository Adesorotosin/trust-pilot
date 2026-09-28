"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { createClient } from "@/utils/supabase/client";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Moon,
  Sun,
} from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme, setTheme } = useTheme();

  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const authError = searchParams.get("error");

  React.useEffect(() => {
    if (authError === "auth-code-error") {
      setError("Authentication failed. Please try again.");
    }
  }, [authError]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Confirm the session exists before leaving the login page.
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) {
      setError("Your login was successful, but the session could not be established. Please try again.");
      setLoading(false);
      return;
    }

    // Use a full navigation so the dashboard starts with the fresh Supabase session.
    window.location.assign("/dashboard");
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);

    const origin = window.location.origin;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback?next=/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left side */}
        <section className="relative hidden overflow-hidden bg-zinc-950 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.1),transparent_35%)]" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 font-bold text-black">
                  TC
                </div>

                <span className="text-lg font-semibold text-white">
                  Trade Copilot
                </span>
              </div>
            </div>

            <div className="max-w-xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Trade intelligence
              </p>

              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-6xl">
                Make better trade decisions before you ship.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-zinc-400">
                Review documents, understand landed costs, and surface important
                trade information in one place.
              </p>
            </div>

            <p className="text-sm text-zinc-500">
              Trade Copilot
            </p>
          </div>
        </section>

        {/* Right side */}
        <section className="flex min-h-screen flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between p-6 sm:p-8">
            <div className="flex items-center gap-3 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-sm font-bold text-black">
                TC
              </div>

              <span className="font-semibold">Trade Copilot</span>
            </div>

            <div className="ml-auto">
              <button
                type="button"
                onClick={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-1 items-center justify-center px-6 pb-12 sm:px-8">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <p className="mb-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Welcome back
                </p>

                <h2 className="text-3xl font-semibold tracking-tight">
                  Sign in to Trade Copilot
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Continue to your trade intelligence workspace.
                </p>
              </div>

              {error && (
                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading || loading}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-background text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
              >
                {googleLoading ? (
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

                {googleLoading ? "Connecting..." : "Continue with Google"}
              </button>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">OR</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={loading || googleLoading}
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
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
                      className="text-xs font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      disabled={loading || googleLoading}
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 pr-12 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
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

                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-semibold text-black transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="font-medium text-foreground underline underline-offset-4 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Create an account
                </button>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function LoginLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  );
}