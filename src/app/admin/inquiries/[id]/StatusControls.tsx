"use client";

import { useState } from "react";

interface StatusAction {
  value: string;
  label: string;
}

interface StatusControlsProps {
  inquiryId: string;
  actions: StatusAction[];
}

export default function StatusControls({
  inquiryId,
  actions,
}: StatusControlsProps) {
  const [loadingStatus, setLoadingStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function updateStatus(status: string) {
    setLoadingStatus(status);
    setError(null);

    try {
      const response = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? "Unable to update inquiry.");
      }

      window.location.reload();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update inquiry.",
      );
      setLoadingStatus(null);
    }
  }

  if (actions.length === 0) {
    return (
      <p className="text-sm leading-6 text-geoweb-text/60">
        This inquiry has no further status transitions available.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {actions.map((action) => (
        <button
          key={action.value}
          type="button"
          disabled={loadingStatus !== null}
          onClick={() => updateStatus(action.value)}
          className="block w-full rounded-full border border-geoweb-indigo/15 px-4 py-3 text-center text-sm font-semibold text-geoweb-indigo transition-colors hover:border-geoweb-red hover:text-geoweb-red disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loadingStatus === action.value ? "Updating..." : action.label}
        </button>
      ))}

      {error && (
        <p className="rounded-2xl bg-red-50 p-3 text-xs leading-5 text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}