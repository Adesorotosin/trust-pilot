"use client";

import { useState } from "react";
import NewUserDashboard from "@/components/dashboard/new-user-dashboard";
import ExistingUserDashboard from "@/components/dashboard/existing-user-dashboard";

export default function DashboardPage() {
  // Set to true to view existing user layout, or false for new user layout
  const [hasShipments, setHasShipments] = useState(true);

  return (
    <div className="relative">
      {/* Dev Switcher - Toggle between New and Existing User states */}
      <div className="fixed bottom-5 right-5 z-50 bg-slate-900/90 backdrop-blur-md text-white p-2.5 rounded-xl text-xs shadow-2xl border border-slate-800 flex items-center gap-3">
        <span className="text-slate-400 font-medium">Switch State:</span>
        <button
          onClick={() => setHasShipments(!hasShipments)}
          className="px-3 py-1.5 bg-[#10B981] hover:bg-[#0D9668] text-white rounded-lg font-bold transition-all shadow-sm"
        >
          {hasShipments ? "Existing User (Data)" : "New User (Empty)"}
        </button>
      </div>

      {/* Render the appropriate view */}
      {hasShipments ? <ExistingUserDashboard /> : <NewUserDashboard />}
    </div>
  );
}