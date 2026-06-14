"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <button onClick={handleLogout} className={className}>
      Log out
    </button>
  );
}
