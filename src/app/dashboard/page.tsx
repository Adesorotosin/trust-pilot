"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";

import NewUserDashboard from "@/components/dashboard/new-user-dashboard";
import ExistingUserDashboard from "@/components/dashboard/existing-user-dashboard";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [hasActivity, setHasActivity] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkUserStatus() {
      try {
        const supabase = createClient();

        // 1. Get current logged in user (with fallback session check)
        let { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          const { data: sessionData } = await supabase.auth.getSession();
          user = sessionData?.session?.user ?? null;
        }

        if (!user) {
          router.push("/login");
          return;
        }

        // 2. Query shipments using verified user.id
        const { count, error: countError } = await supabase
          .from("shipments")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);

        if (countError) {
          // Log complete error details to catch RLS or schema issues
          console.error("Error checking activity count:", {
            message: countError.message,
            details: countError.details,
            hint: countError.hint,
            code: countError.code,
          });
          setHasActivity(false);
        } else {
          setHasActivity((count ?? 0) > 0);
        }
      } catch (err) {
        console.error("Unexpected error in dashboard router:", err);
        setHasActivity(false);
      } finally {
        setLoading(false);
      }
    }

    checkUserStatus();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0B0F19]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#10B981]" />
          <p className="text-xs text-slate-500 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return hasActivity ? <ExistingUserDashboard /> : <NewUserDashboard />;
}