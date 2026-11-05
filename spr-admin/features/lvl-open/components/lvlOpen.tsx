"use client";

import React, { useState } from "react";
import { Users } from "lucide-react";

export default function OpenLevel() {
  const [userId, setUserId] = useState("");
  const [actionError, setActionError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActionError("Level opening is not connected to an admin API yet.");
  };

  return (
    <div className="w-full bg-[#FAF6EC] p-4 pt-4 pb-24 font-sans flex justify-center items-start">
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full overflow-hidden">
        
        {/* Card Header - */}
        <div className="bg-[#D4AF37] px-6 py-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/30 mb-2">
            <Users className="w-6 h-6 text-gray-900" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Open Level</h1>
          <p className="text-gray-800 text-xs mt-0.5">Enable level for user</p>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            
            {/* Inputs Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                  User ID *
                </label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter User ID"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                  User Name
                </label>
                <input
                  type="text"
                  disabled
                  value=""
                  placeholder="User Name"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Checkbox (Shows only when valid ID is entered) */}
            <p className="mb-6 text-sm text-amber-700" role="status">
              Level opening requires a configured admin API.
            </p>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#D4AF37] text-gray-900 rounded-lg font-bold text-sm hover:bg-[#B89328] transition-colors"
              >
                Submit
              </button>
            </div>
            {actionError && (
              <p className="mt-3 text-center text-sm text-red-600" role="alert">
                {actionError}
              </p>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}