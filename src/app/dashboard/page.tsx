"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";

// Import your dashboard components
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

        

        // 1. Get current logged in user
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          router.push("/login");
          return;
        }
       
        // 2. Check if user has existing activity in your database (e.g., shipments)
        // Replace 'shipments' with your actual table name if different (e.g., 'activities', 'declarations')
        const { count, error: countError } = await supabase
          .from("shipments")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);

        if (countError) {
          console.error("Error checking activity count:", countError.message);
          // Fallback to new user dashboard if table query fails or isn't set up yet
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

  // Loading state while checking authentication and activity count
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

  // Render appropriate dashboard component based on user activity state
  return hasActivity ? <ExistingUserDashboard /> : <NewUserDashboard />;
}