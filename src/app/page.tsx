"use client";

import { useEffect, useMemo, useState } from "react";
import { api, Kelas } from "@/lib/api";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
function ymRangeDefault() {
  const t = todayISO();
  return { dari: t, sampai: t };
}

export default function Home() {
  const [kelas, setKelas] = useState<Kelas[]>([]);
  const [kelasId, setKelasId] = useState("");
  const [tanggal, setTanggal] = useState(todayISO());
  const [range, setRange] = useState(ymRangeDefault());
  const [rekapKelas, setRekapKelas] = useState<any[] | null>(null);
  const [rekapSekolah, setRekapSekolah] = useState<{ items: any[]; summary: any } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.listKelas().then(setKelas).catch(console.error);
  }, []);

  const kelasOptions = useMemo(
    () => [{ id: "", nama: "Pilih kelas..." }, ...kelas],
    [kelas]
  );

  const actRekapKelas = async () => {
    if (!kelasId || !range.dari || !range.sampai) return;
    setLoading(true);
    try {
      const data = await api.rekapKelas(kelasId, range.dari, range.sampai);
      setRekapKelas(data.items);
    } finally {
      setLoading(false);
    }
  };

  const actRekapSekolah = async () => {
    if (!range.dari || !range.sampai) return;
    setLoading(true);
    try {
      const data = await api.rekapSekolah(range.dari, range.sampai);
      setRekapSekolah({ items: data.items, summary: data.summary });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Absensi Kelas (Rekap) */}
      <section className="card space-y-3">
        <h2 className="text-lg font-semibold">Rekap Absensi per Kelas</h2>
        <div className="grid-2">
          <div>
            <label className="text-sm text-gray-500">Kelas</label>
            <select className="select" value={kelasId} onChange={(e) => setKelasId(e.target.value)}>
              {kelasOptions.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.nama}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-500">Tanggal</label>
            <input className="input" type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
          </div>
        </div>
        <div className="grid-3">
          <div>
            <label className="text-sm text-gray-500">Dari</label>
            <input className="input" type="date" value={range.dari} onChange={(e) => setRange((r) => ({ ...r, dari: e.target.value }))} />
          </div>
          <div>
            <label className="text-sm text-gray-500">Sampai</label>
            <input className="input" type="date" value={range.sampai} onChange={(e) => setRange((r) => ({ ...r, sampai: e.target.value }))} />
          </div>
          <div className="flex items-end gap-2">
            <button className="btn w-full" disabled={!kelasId} onClick={actRekapKelas}>
              {loading ? "Memuat..." : "Tampilkan Rekap Kelas"}
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className="btn"
            disabled={!kelasId}
            onClick={async () => {
              const { url } = await api.exportKelasCsv(kelasId, range.dari, range.sampai);
              if (url) window.open(url, "_blank");
            }}
          >
            Export CSV (Kelas)
          </button>
          <button
            className="btn"
            disabled={!kelasId}
            onClick={async () => {
              const { wa } = await api.waKelas(kelasId, tanggal);
              window.open(wa, "_blank");
            }}
          >
            Share WA (Harian)
          </button>
        </div>

        {/* Tabel Rekap Kelas */}
        {rekapKelas && (
          <div className="overflow-auto">
            <table className="table mt-2">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama</th>
                  <th className="text-right">Hadir</th>
                  <th className="text-right">Izin</th>
                  <th className="text-right">Alpha</th>
                  <th className="text-right">Total</th>
                  <th className="text-right">%</th>
                </tr>
              </thead>
              <tbody>
                {rekapKelas.map((r, i) => (
                  <tr key={r.siswa_id + i}>
                    <td>{i + 1}</td>
                    <td>{r.nama}</td>
                    <td className="text-right">{r.hadir}</td>
                    <td className="text-right">{r.izin}</td>
                    <td className="text-right">{r.alpha}</td>
                    <td className="text-right">{r.total}</td>
                    <td className="text-right">{r.persen}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Rekap Sekolah */}
      <section className="card space-y-3">
        <h2 className="text-lg font-semibold">Rekap Absensi — Level Sekolah</h2>
        <div className="grid-3">
          <div>
            <label className="text-sm text-gray-500">Dari</label>
            <input className="input" type="date" value={range.dari} onChange={(e) => setRange((r) => ({ ...r, dari: e.target.value }))} />
          </div>
          <div>
            <label className="text-sm text-gray-500">Sampai</label>
            <input className="input" type="date" value={range.sampai} onChange={(e) => setRange((r) => ({ ...r, sampai: e.target.value }))} />
          </div>
          <div className="flex items-end gap-2">
            <button className="btn w-full" onClick={actRekapSekolah}>
              {loading ? "Memuat..." : "Tampilkan Rekap Sekolah"}
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className="btn"
            onClick={async () => {
              const { url } = await api.exportSekolahCsv(range.dari, range.sampai);
              if (url) window.open(url, "_blank");
            }}
          >
            Export CSV (Sekolah)
          </button>
          <button
            className="btn"
            onClick={async () => {
              const { wa } = await api.waSekolah(range.dari, range.sampai);
              window.open(wa, "_blank");
            }}
          >
            Share WA (Sekolah)
          </button>
        </div>

        {rekapSekolah && (
          <>
            <div className="text-sm text-gray-500">
              Persentase hadir total: <b>{rekapSekolah.summary.persen}%</b>
            </div>
            <div className="overflow-auto">
              <table className="table mt-2">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Kelas</th>
                    <th className="text-right">Hadir</th>
                    <th className="text-right">Izin</th>
                    <th className="text-right">Alpha</th>
                    <th className="text-right">Total</th>
                    <th className="text-right">% Hadir</th>
                  </tr>
                </thead>
                <tbody>
                  {rekapSekolah.items.map((k, i) => (
                    <tr key={k.kelas_id}>
                      <td>{i + 1}</td>
                      <td>{k.kelas_nama}</td>
                      <td className="text-right">{k.hadir}</td>
                      <td className="text-right">{k.izin}</td>
                      <td className="text-right">{k.alpha}</td>
                      <td className="text-right">{k.total}</td>
                      <td className="text-right">{k.persen}%</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={2}>TOTAL</th>
                    <th className="text-right">{rekapSekolah.summary.hadir}</th>
                    <th className="text-right">{rekapSekolah.summary.izin}</th>
                    <th className="text-right">{rekapSekolah.summary.alpha}</th>
                    <th className="text-right">{rekapSekolah.summary.total}</th>
                    <th className="text-right">{rekapSekolah.summary.persen}%</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
