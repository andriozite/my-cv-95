import { useEffect, useState } from "react";
import { SKILL_BARS, KOMPETENSI, BAHASA } from "../data";

export default function SkillsApp() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 250);
    return () => clearTimeout(t);
  }, []);

  const [tab, setTab] = useState<"grafis" | "teknis">("grafis");

  return (
    <div className="flex h-full flex-col text-black">
      {/* tabs */}
      <div className="flex shrink-0 items-end gap-0 px-2 pt-2">
        <TabBtn active={tab === "grafis"} onClick={() => setTab("grafis")}>
          Meteran Skill
        </TabBtn>
        <TabBtn active={tab === "teknis"} onClick={() => setTab("teknis")}>
          Daftar Teknis
        </TabBtn>
      </div>

      <div className="bevel-out m-2 mt-0 min-h-0 flex-1 overflow-auto p-3 w95-scroll">
        {tab === "grafis" ? (
          <>
            <fieldset className="border border-[#808080] px-3 pb-3 pt-1">
              <legend className="px-1 text-[12px] font-bold">Kalibrasi kemampuan — diaudit tiap shift</legend>
              <div className="space-y-[10px]">
                {SKILL_BARS.map((s, i) => (
                  <div key={s.nama}>
                    <div className="mb-[3px] flex items-baseline justify-between text-[12px]">
                      <span>{s.nama}</span>
                      <span className="font-bold text-[#000080]">{s.nilai}%</span>
                    </div>
                    <div className="field flex h-[16px] gap-[2px] p-[2px]">
                      {Array.from({ length: 20 }).map((_, b) => (
                        <span
                          key={b}
                          className="h-full flex-1 transition-colors duration-300"
                          style={{
                            backgroundColor: on && b < Math.round((s.nilai / 100) * 20) ? "#000080" : "transparent",
                            transitionDelay: `${i * 60 + b * 18}ms`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-3 border border-[#808080] px-3 pb-3 pt-1">
              <legend className="px-1 text-[12px] font-bold">Bahasa</legend>
              <div className="flex gap-6">
                {BAHASA.map((b) => (
                  <p key={b.nama} className="text-[12px]">
                    <span className="font-bold">{b.nama}</span> — {b.level}
                  </p>
                ))}
              </div>
            </fieldset>

            <p className="mt-3 text-center text-[11px] text-[#555]">
              * nilai kalibrasi berdasarkan audit shift, stock opname, dan drama musim promo 12.12
            </p>
          </>
        ) : (
          <>
            {KOMPETENSI.map((k) => (
              <fieldset key={k.kategori} className="mb-3 border border-[#808080] px-3 pb-3 pt-1">
                <legend className="px-1 text-[12px] font-bold">{k.kategori}</legend>
                <div className="flex flex-wrap gap-1">
                  {k.items.map((it) => (
                    <span
                      key={it}
                      className="bevel-out cursor-default px-2 py-[3px] text-[11.5px] transition-transform hover:-translate-y-[1px] hover:bg-[#dcdcdc]"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </fieldset>
            ))}
          </>
        )}
      </div>

      <div className="flex shrink-0 gap-[3px] border-t border-white bg-[#c0c0c0] p-[3px] text-[11px]">
        <div className="bevel-in-thin flex-1 px-2 py-[1px]">
          Rata-rata: <b>{Math.round(SKILL_BARS.reduce((a, s) => a + s.nilai, 0) / SKILL_BARS.length)}%</b> — siap produksi
        </div>
      </div>
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`relative cursor-pointer border border-b-0 border-black px-4 py-[4px] text-[12px] ${
        active ? "bevel-out z-10 mb-[-1px] font-bold" : "bevel-thin mb-[2px] translate-y-[2px] bg-[#b0b0b0]"
      }`}
    >
      {children}
    </button>
  );
}
