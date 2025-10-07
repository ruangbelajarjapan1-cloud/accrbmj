"use client";
import { useEffect } from "react";

export default function PortalRedirect() {
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_RBMJ_PORTAL_URL || "/";
    window.location.replace(url); // buka portal GAS di tab/halaman yang sama
  }, []);
  return (
    <main style={{ padding: 16 }}>
      <h2>Portal GAS (lengkap)</h2>
      <p>Mengarahkan ke portal…</p>
    </main>
  );
}
