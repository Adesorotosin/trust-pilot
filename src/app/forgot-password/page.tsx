"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useTheme } from "next-themes";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  Moon,
  Sun,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const supabase = createClient();
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/auth/callback?next=/auth/reset-password`;

      const { error } = await supabase.auth.resetPasswordForEmail(
        cleanEmail,
        {
          redirectTo: redirectUrl,
        }
      );

      if (error) {
  console.error("Password reset error:", error);
  setErrorMessage(error.message);
  setLoading(false);
  return;
}

      setSuccess(true);
    } catch {
      setErrorMessage(
        "Something went wrong. Please check your connection and try again."
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
        {/* Left panel */}
        <section className="relative hidden overflow-hidden bg-slate-950 lg:flex">
          <div className="absolute inset-0">
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-sm font-bold text-slate-950">
                TC
              </div>

              <span className="text-lg font-semibold tracking-tight text-white">
                Trade Copilot
              </span>
            </div>

            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                TRADE INTELLIGENCE
              </div>

              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-5xl">
                Get back to making better trade decisions.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
                Reset your password and return to your Trade Copilot
                workspace.
              </p>
            </div>

            <p className="text-xs text-slate-600">
              Trade Copilot · Trade intelligence for modern importers
            </p>
          </div>
        </section>

        {/* Main content */}
        <section className="relative flex min-h-screen flex-col bg-background">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 sm:px-10">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </button>

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

          {/* Content */}
          <div className="flex flex-1 items-center justify-center px-6 pb-12 sm:px-10 lg:px-16">
            <div className="w-full max-w-md">
              {!success ? (
                <>
                  <div className="mb-8">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Mail className="h-5 w-5" />
                    </div>

                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                      Forgot your password?
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      Enter the email address connected to your Trade Copilot
                      account and we&apos;ll send you a password reset link.
                    </p>
                  </div>

                  {errorMessage && (
                    <div
                      role="alert"
                      className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-600 dark:text-red-400"
                    >
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
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
                        autoFocus
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        disabled={loading}
                        className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-foreground px-5 text-sm font-semibold text-background transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending reset link...
                        </>
                      ) : (
                        <>
                          Send reset link
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="mt-8 text-center text-sm text-muted-foreground">
                    Remember your password?{" "}
                    <button
                      type="button"
                      onClick={() => router.push("/login")}
                      className="font-semibold text-foreground underline-offset-4 transition-colors hover:text-emerald-600 hover:underline dark:hover:text-emerald-400"
                    >
                      Sign in
                    </button>
                  </p>
                </>
              ) : (
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>

                  <h2 className="text-3xl font-semibold tracking-tight">
                    Check your email
                  </h2>

                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    If an account exists for{" "}
                    <span className="font-medium text-foreground">
                      {email}
                    </span>
                    , we&apos;ve sent a password reset link.
                  </p>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Check your inbox and spam folder. The link will take you
                    back to Trade Copilot to choose a new password.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSuccess(false);
                      setErrorMessage("");
                    }}
                    className="mt-8 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-500 dark:text-emerald-400"
                  >
                    Try another email
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}