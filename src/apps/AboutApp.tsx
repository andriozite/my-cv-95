import { useState } from "react";
import { TENTANG_SAYA, FAKTA_SISTEM, IDENTITAS } from "../data";
import { Pix } from "../icons";
import { playOpen } from "../screens/Boot";

const AVATAR_URL = "https://image.qwenlm.ai/generated-images/57f0300b-011c-44b3-a98b-402affd5eaf8/_result.png";

const MENU = ["File", "Edit", "Search", "Help"];

export default function AboutApp() {
  const [imgOk, setImgOk] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(IDENTITAS.email);
      setCopied(true);
      playOpen();
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex h-full flex-col text-black">
      <div className="flex shrink-0 items-center gap-[2px] border-b border-[#808080] bg-[#c0c0c0] px-1 py-[2px]">
        {MENU.map((m) => (
          <button key={m} className="cursor-default px-[7px] py-[1px] hover:bg-[#000080] hover:text-white">
            <span className="underline">{m[0]}</span>
            {m.slice(1)}
          </button>
        ))}
        <span className="ml-auto pr-2 text-[10px] text-[#555]">C:\My Documents\About_Me.txt</span>
      </div>

      <div className="w95-scroll field m-[3px] min-h-0 flex-1 overflow-auto p-4 sm:p-5">
        <div className="mx-auto max-w-[620px]">
          {/* header */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="bevel-in shrink-0 bg-[#008080] p-1">
              {imgOk ? (
                <img
                  src={AVATAR_URL}
                  alt="Avatar pixel Andrian"
                  width={128}
                  height={128}
                  onError={() => setImgOk(false)}
                  className="block"
                  style={{ imageRendering: "pixelated" }}
                />
              ) : (
                <FallbackAvatar />
              )}
            </div>
            <div className="text-center sm:text-left">
              <p className="pixel text-[#000080]" style={{ fontSize: 30, lineHeight: 1 }}>
                C:\Users\Andrian&gt; about_me.exe
              </p>
              <h1 className="mt-1 text-[22px] font-bold">Andrian Permana Dihardja</h1>
              <p className="text-[12px] text-[#444]">
                "{IDENTITAS.panggilan}" · {IDENTITAS.role}
              </p>
              <p className="text-[12px] text-[#444]">{IDENTITAS.lokasi}, Indonesia</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                <a
                  href={`mailto:${IDENTITAS.email}?subject=Halo%20Andrian%20—%20Peluang%20Logistik`}
                  onClick={() => playOpen()}
                  className="w95-btn flex items-center gap-2 px-3 py-[4px] text-[12px]"
                >
                  <Pix name="mail" size={16} /> Kirim Email
                </a>
                <button onClick={copyEmail} className="w95-btn px-3 py-[4px] text-[12px]">
                  {copied ? "Tersalin! ✓" : "Salin Email"}
                </button>
              </div>
            </div>
          </div>

          {/* bio */}
          <div className="mt-5 space-y-3 border-t border-dashed border-[#808080] pt-4 text-[13px] leading-relaxed">
            {TENTANG_SAYA.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* system properties */}
          <div className="mt-6">
            <fieldset className="border border-[#808080] px-3 pb-3 pt-1 shadow-[1px_1px_0_#fff_inset,-1px_-1px_0_#fff]">
              <legend className="px-1 text-[12px] font-bold">System Properties — ANDRIAN-PC</legend>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
                {FAKTA_SISTEM.map((f) => (
                  <div key={f.label} className="flex flex-col border-b border-dotted border-[#999] py-[3px]">
                    <span className="text-[10px] text-[#666] uppercase">{f.label}</span>
                    <span className="text-[13px] font-bold text-[#000080]">{f.nilai}</span>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>

          <p className="pixel mt-5 text-center text-[#008000]" style={{ fontSize: 19 }}>
            — EOF — tekan Ctrl+W untuk kembali ke desktop (bercanda, pakai tombol X) —
          </p>
        </div>
      </div>

      <div className="flex shrink-0 gap-[3px] border-t border-white bg-[#c0c0c0] p-[3px] text-[11px]">
        <div className="bevel-in-thin px-2 py-[1px]">Ln 1, Col 1</div>
        <div className="bevel-in-thin flex-1 px-2 py-[1px]">5 paragraf · ditulis tengah malam, diuji coba di gudang</div>
      </div>
    </div>
  );
}

function FallbackAvatar() {
  const rows = [
    "....kkkkkkkk....",
    "..kkDDDDDDDDkk..",
    ".kDDDDDDDDDDDDk.",
    ".kDDkkkkkkkkDDk.",
    ".kkSSSSSSSSSSkk.",
    ".kSSSSSSSSSSSSk.",
    ".kSSkkSSSSkkSSk.",
    ".kSSSSSSSSSSSSk.",
    ".kSSSkkkkkkSSSk.",
    ".kkSSSSSSSSSSkk.",
    "..kkkkkkkkkkkk..",
    "..kkbbbbbbbbkk..",
    ".kbbbbbbbbbbbbk.",
    ".kbbbybbbbbbbyk.",
    ".kbbbbbbbbbbbbk.",
    "kkkkkkkkkkkkkkkk",
  ];
  const pal: Record<string, string> = { k: "#000", D: "#1c1c1c", S: "#e8b88a", b: "#000080", y: "#ecc94b" };
  return (
    <svg width={128} height={128} viewBox="0 0 16 16" shapeRendering="crispEdges" style={{ imageRendering: "pixelated", background: "#008080" }}>
      {rows.map((r, y) =>
        r.split("").map((c, x) => (c !== "." ? <rect key={`${x}${y}`} x={x} y={y} width={1.03} height={1.03} fill={pal[c]} /> : null))
      )}
    </svg>
  );
}
