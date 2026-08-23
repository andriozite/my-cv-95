import { useState } from "react";
import { PENGALAMAN } from "../data";
import { Pix } from "../icons";

export default function ExperienceApp() {
  const [activeId, setActiveId] = useState(PENGALAMAN[0].id);
  const job = PENGALAMAN.find((p) => p.id === activeId)!;

  return (
    <div className="flex h-full flex-col text-black">
      {/* toolbar + address */}
      <div className="shrink-0 border-b border-[#808080] bg-[#c0c0c0] p-1">
        <div className="flex items-center gap-1">
          <NavBtn disabled>
            <Arrow left />
          </NavBtn>
          <NavBtn disabled>
            <Arrow />
          </NavBtn>
          <NavBtn disabled>
            <ArrowUp />
          </NavBtn>
          <span className="ml-2 flex-1 text-[11px] text-[#555]">Menjelajahi riwayat karier sejak 2016…</span>
        </div>
        <div className="mt-1 flex items-center gap-1">
          <span className="text-[11px] font-bold">Address</span>
          <div className="field flex flex-1 items-center gap-1 px-1 py-[2px] text-[11px]">
            <Pix name="folder" size={14} />
            C:\Pengalaman\{job.perusahaan.replace(/[^a-zA-Z]/g, "")}
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* tree */}
        <aside className="field m-[3px] w-[172px] shrink-0 overflow-auto p-2 text-[12px] w95-scroll">
          <p className="flex items-center gap-1 font-bold">
            <span className="text-[#808080]">▾</span>
            <Pix name="folder" size={15} /> Pengalaman
          </p>
          <div className="ml-3 border-l border-dotted border-[#808080] pl-2">
            {PENGALAMAN.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                className={`mt-1 flex w-full cursor-pointer items-center gap-1 px-1 py-[2px] text-left ${
                  p.id === activeId ? "bg-[#000080] text-white" : "hover:bg-[#dcdcdc]"
                }`}
              >
                <Pix name="briefcase" size={15} />
                <span className="leading-tight">
                  {p.perusahaan}
                  <br />
                  <span className={p.id === activeId ? "text-[#ffe14d]" : "text-[#666]"}>{p.periode}</span>
                </span>
              </button>
            ))}
          </div>
          <p className="mt-4 flex items-center gap-1 text-[#666]">
            <Pix name="gradcap" size={15} /> Pendidikan.lnk
          </p>
          <p className="mt-1 flex items-center gap-1 text-[#666]">
            <Pix name="cert" size={15} /> Sertifikat.lnk
          </p>
        </aside>

        {/* detail */}
        <main className="w95-scroll field m-[3px] ml-0 flex-1 overflow-auto p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h1 className="text-[19px] font-bold text-[#000080]">{job.perusahaan}</h1>
              {job.sub ? <p className="text-[12px] text-[#444]">{job.sub}</p> : null}
              <p className="mt-[2px] text-[13px] italic">{job.peran}</p>
            </div>
            <span className="bevel-out px-3 py-1 text-[13px] font-bold text-[#000080]">{job.periode}</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1">
            {job.metrik.map((m) => (
              <span
                key={m}
                className="border border-[#000080] bg-[#e8ecff] px-2 py-[2px] text-[11px] font-bold text-[#000080] transition-colors hover:bg-[#000080] hover:text-white"
              >
                {m}
              </span>
            ))}
          </div>

          {job.grup.map((g, gi) => (
            <section key={g.judul} className={gi === 0 ? "mt-4" : "mt-5"}>
              <h2 className="flex items-center gap-2 text-[13px] font-bold tracking-wide text-[#000080] uppercase">
                <span className="inline-block h-[10px] w-[10px] border border-[#000080] bg-[#1084d0]" />
                {g.judul}
              </h2>
              <ul className="mt-1 ml-4 space-y-[5px]">
                {g.items.map((it, i) => (
                  <li key={i} className="flex gap-2 text-[12.5px] leading-snug">
                    <span className="mt-[1px] text-[#1084d0]">▸</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </main>
      </div>

      <div className="flex shrink-0 gap-[3px] border-t border-white bg-[#c0c0c0] p-[3px] text-[11px]">
        <div className="bevel-in-thin px-2 py-[1px]">{job.grup.reduce((a, g) => a + g.items.length, 0)} objek</div>
        <div className="bevel-in-thin flex-1 px-2 py-[1px]">
          {job.perusahaan} — {job.periode}
        </div>
        <div className="bevel-in-thin px-2 py-[1px]">100% terverifikasi</div>
      </div>
    </div>
  );
}

function NavBtn({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) {
  return (
    <button disabled={disabled} className="w95-btn flex h-[22px] w-[26px] items-center justify-center">
      {children}
    </button>
  );
}
function Arrow({ left }: { left?: boolean }) {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10">
      <path d={left ? "M12 0v10L2 5z M2 3h-2v4h2z" : "M0 0v10l10-5z M10 3h2v4h-2z"} fill="currentColor" />
    </svg>
  );
}
function ArrowUp() {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12">
      <path d="M0 12h10L5 2z M3 2h4V0H3z" fill="currentColor" />
    </svg>
  );
}
