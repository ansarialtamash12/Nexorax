"use client";

import { useState, type FormEvent } from "react";

export default function UserLoginSearch() {
  const [userId, setUserId] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginId = userId.trim();
    if (!loginId) {
      setError("Enter a user ID.");
      return;
    }

    setError("");
    setIsPending(true);
    try {
      const response = await fetch("/api/spr-admin/admin/user-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ LoginID: loginId }),
      });
      const payload: unknown = await response.json();
      if (
        !response.ok ||
        typeof payload !== "object" ||
        payload === null ||
        !("success" in payload && payload.success === true) ||
        !("redirect" in payload && typeof payload.redirect === "string")
      ) {
        const message =
          typeof payload === "object" &&
          payload !== null &&
          "message" in payload &&
          typeof payload.message === "string"
            ? payload.message
            : "Could not log in as this user.";
        throw new Error(message);
      }

      const redirectUrl = new URL(atob(payload.redirect), window.location.origin);
      if (redirectUrl.origin !== window.location.origin) {
        throw new Error("The login service returned an invalid redirect.");
      }
      window.location.assign(redirectUrl.toString());
    } catch (submitError) {
      console.error("Could not start user login:", submitError);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not log in as this user.",
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full bg-[#FAF6EC] p-4 pt-4 pb-24 font-sans flex justify-center items-start">
      
      {/* Main Card  */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full overflow-hidden">
        
        {/* Title Section */}
        <div className="bg-[#D4AF37] px-6 py-4">
          <h1 className="text-lg font-bold text-gray-900">User Login Search</h1>
          <p className="text-gray-800 text-xs mt-0.5">Search user to login</p>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Input Section */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                Enter User ID *
              </label>
              <input
                type="text"
                value={userId}
                onChange={(event) => {
                  setUserId(event.target.value);
                  setError("");
                }}
                placeholder="Enter user ID to search..."
                className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
              />
              {error && (
                <p className="text-red-500 text-xs mt-1.5">{error}</p>
              )}
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-violet py-3 font-bold text-white transition-colors hover:bg-violet/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Logging in..." : "Log in as User"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}