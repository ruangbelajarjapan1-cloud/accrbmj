"use client";
import { useEffect } from "react";

export default function PortalRedirect() {
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_RBMJ_PORTAL_URL || "/";
    window.location.replace(url); // pindah langsung ke Web App GAS (/exec)
  }, []);
  return (
    <main className="card" style={{padding:16}}>
      <h2>Portal GAS (lengkap)</h2>
      <p>Mengarahkan ke portal…</p>
      <p><a href={process.env.NEXT_PUBLIC_RBMJ_PORTAL_URL || "#"} target="_blank">Buka manual</a></p>
    </main>
  );
}
