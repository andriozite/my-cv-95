import { useEffect, useRef, useState, type ReactNode } from "react";
import Window95, { type WinState } from "./Window";
import { Pix, type IconName } from "../icons";
import { IDENTITAS } from "../data";
import { playOpen, playClick } from "../screens/Boot";
import ResumeApp from "../apps/ResumeApp";
import AboutApp from "../apps/AboutApp";
import ExperienceApp from "../apps/ExperienceApp";
import SkillsApp from "../apps/SkillsApp";
import TerminalApp from "../apps/TerminalApp";
import { MyComputerApp, RecycleApp, EducationApp, DisplayPropsApp, WALLPAPERS, MsgBox } from "../apps/MiscApps";

/* ================= registry aplikasi ================= */
interface Api {
  open: (id: string) => void;
  closeByApp: (id: string) => void;
  closeKey: (key: string) => void;
  wallpaper: string;
  setWallpaper: (id: string) => void;
}

const APPS: Record<string, { title: string; icon: IconName; w: number; h: number; render: (api: Api, key: string) => ReactNode }> = {
  resume: { title: "Resume.docx — Microsoft Word", icon: "doc", w: 840, h: 620, render: () => <ResumeApp /> },
  about: { title: "About_Me.txt — Notepad", icon: "notepad", w: 720, h: 580, render: () => <AboutApp /> },
  experience: { title: "C:\\Pengalaman — Explorer", icon: "briefcase", w: 820, h: 560, render: () => <ExperienceApp /> },
  skills: { title: "Kompetensi — System Properties", icon: "sliders", w: 560, h: 600, render: () => <SkillsApp /> },
  terminal: {
    title: "MS-DOS Prompt",
    icon: "terminal",
    w: 690,
    h: 440,
    render: (api) => <TerminalApp openApp={api.open} closeSelf={() => api.closeByApp("terminal")} />,
  },
  mycomputer: { title: "My Computer", icon: "computer", w: 580, h: 420, render: (api) => <MyComputerApp openApp={api.open} /> },
  recycle: { title: "Recycle Bin", icon: "bin", w: 520, h: 400, render: () => <RecycleApp /> },
  education: { title: "Pendidikan & Sertifikat", icon: "gradcap", w: 620, h: 540, render: () => <EducationApp /> },
  display: {
    title: "Display Properties",
    icon: "sliders",
    w: 360,
    h: 480,
    render: (api, key) => (
      <DisplayPropsApp current={api.wallpaper} onChange={api.setWallpaper} onClose={() => api.closeKey(key)} />
    ),
  },
};

const DESKTOP_ICONS: { id: string; label: string; icon: IconName }[] = [
  { id: "mycomputer", label: "My Computer", icon: "computer" },
  { id: "resume", label: "Resume.docx", icon: "doc" },
  { id: "about", label: "About_Me.txt", icon: "notepad" },
  { id: "experience", label: "Pengalaman", icon: "briefcase" },
  { id: "skills", label: "Kompetensi", icon: "sliders" },
  { id: "education", label: "Pendidikan.lnk", icon: "gradcap" },
  { id: "terminal", label: "MS-DOS Prompt", icon: "terminal" },
  { id: "recycle", label: "Recycle Bin", icon: "bin" },
];

/* ================= Desktop ================= */
export default function Desktop({ onShutdown, onRestart }: { onShutdown: () => void; onRestart: () => void }) {
  const [wins, setWins] = useState<WinState[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [ctx, setCtx] = useState<{ x: number; y: number } | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [wallpaperId, setWallpaperId] = useState("teal");
  const [shutdownDlg, setShutdownDlg] = useState(false);
  const [standbyMsg, setStandbyMsg] = useState(false);
  const [hint, setHint] = useState(true);
  const zRef = useRef(10);
  const cascadeRef = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => setHint(false), 11000);
    return () => clearTimeout(t);
  }, []);

  const api: Api = {
    open: openApp,
    closeByApp: (id) => setWins((p) => p.filter((w) => w.appId !== id)),
    closeKey: (key) => setWins((p) => p.filter((w) => w.key !== key)),
    wallpaper: wallpaperId,
    setWallpaper: setWallpaperId,
  };

  function openApp(id: string) {
    if (!APPS[id]) return;
    playOpen();
    setStartOpen(false);
    setCtx(null);
    setHint(false);
    zRef.current += 1;
    setWins((prev) => {
      const ex = prev.find((w) => w.appId === id);
      if (ex) return prev.map((w) => (w.appId === id ? { ...w, minimized: false, z: zRef.current } : w));
      const c = cascadeRef.current++ % 6;
      return [...prev, { key: `${id}-${Date.now()}`, appId: id, x: 90 + c * 34, y: 24 + c * 26, z: zRef.current, minimized: false, maximized: false }];
    });
  }

  const focusKey = (key: string) => {
    zRef.current += 1;
    const z = zRef.current;
    setWins((p) => p.map((w) => (w.key === key ? { ...w, z } : w)));
  };

  const focusedKey = wins.reduce<string | null>((acc, w) => {
    if (w.minimized) return acc;
    if (!acc) return w.key;
    const a = wins.find((x) => x.key === acc)!;
    return w.z > a.z ? w.key : acc;
  }, null);

  const wp = WALLPAPERS.find((w) => w.id === wallpaperId) ?? WALLPAPERS[0];

  const refreshIcons = () => {
    setCtx(null);
    setRefreshing(true);
    playClick();
    setTimeout(() => setRefreshing(false), 520);
  };

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${wp.cls ?? ""}`}
      style={{ backgroundColor: wp.bg }}
      onPointerDown={() => {
        setSelected(null);
        setStartOpen(false);
        setCtx(null);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setStartOpen(false);
        setCtx({ x: Math.min(e.clientX, window.innerWidth - 180), y: Math.min(e.clientY, window.innerHeight - 160) });
      }}
    >
      {/* ===== ikon desktop ===== */}
      <div className="absolute top-2 left-1 flex max-h-[calc(100%-44px)] flex-col flex-wrap content-start gap-[2px]">
        {DESKTOP_ICONS.map((ic) => (
          <button
            key={ic.id}
            className={`flex w-[86px] cursor-default flex-col items-center gap-[3px] border border-transparent px-1 py-2 ${refreshing ? "icon-refresh" : ""}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setSelected(ic.id)}
            onDoubleClick={() => openApp(ic.id)}
            onKeyDown={(e) => e.key === "Enter" && openApp(ic.id)}
          >
            <Pix name={ic.icon} size={34} className={selected === ic.id ? "brightness-[.75] sepia-[.2]" : ""} />
            <span
              className={`desk-label max-w-full px-[2px] text-[11px] leading-tight text-white ${
                selected === ic.id ? "border border-dotted border-[#ffff00] bg-[#000080]" : ""
              }`}
            >
              {ic.label}
            </span>
          </button>
        ))}
      </div>

      {/* ===== tooltip sambutan ===== */}
      {hint && wins.length === 0 && (
        <div className="toast-in absolute top-[86px] left-[92px] z-[5] max-w-[240px] border border-black bg-[#ffffe1] p-2 text-[11.5px] leading-snug shadow-[2px_2px_0_rgba(0,0,0,0.4)]">
          <b>Selamat datang di ANDRIAN-95!</b>
          <br />
          Klik dua kali <b>Resume.docx</b> untuk melihat CV gue, atau <b>About_Me.txt</b> buat kenalan.
          <button className="absolute top-[1px] right-[3px] cursor-pointer font-bold text-[#808080] hover:text-black" onClick={() => setHint(false)} aria-label="Tutup tips">
            ×
          </button>
        </div>
      )}

      {/* ===== jendela ===== */}
      {wins.map((w) => {
        const def = APPS[w.appId];
        return (
          <Window95
            key={w.key}
            win={w}
            title={def.title}
            icon={def.icon}
            width={def.w}
            height={def.h}
            focused={focusedKey === w.key}
            onFocus={() => focusKey(w.key)}
            onClose={() => api.closeKey(w.key)}
            onMinimize={() => setWins((p) => p.map((x) => (x.key === w.key ? { ...x, minimized: true } : x)))}
            onToggleMax={() => setWins((p) => p.map((x) => (x.key === w.key ? { ...x, maximized: !x.maximized } : x)))}
            onMove={(x, y) => setWins((p) => p.map((k) => (k.key === w.key ? { ...k, x, y } : k)))}
          >
            {def.render(api, w.key)}
          </Window95>
        );
      })}

      {/* ===== menu klik kanan ===== */}
      {ctx && (
        <div className="bevel-out absolute z-[60] w-[170px] border border-black p-[3px] text-[12px]" style={{ left: ctx.x, top: ctx.y }} onPointerDown={(e) => e.stopPropagation()}>
          <CtxItem onClick={refreshIcons}>Segarkan</CtxItem>
          <CtxItem onClick={refreshIcons}>Susun Ikon</CtxItem>
          <div className="my-[3px] border-t border-[#808080] border-b border-b-white" />
          <CtxItem onClick={() => { setCtx(null); openApp("resume"); }}>Buka Resume.docx</CtxItem>
          <CtxItem onClick={() => { setCtx(null); openApp("display"); }}>Properti Desktop…</CtxItem>
        </div>
      )}

      {/* ===== start menu ===== */}
      {startOpen && (
        <div className="bevel-out absolute bottom-[34px] left-0 z-[70] flex border border-black" onPointerDown={(e) => e.stopPropagation()}>
          <div className="flex w-[26px] items-end justify-center bg-gradient-to-t from-[#000080] to-[#1084d0] py-2">
            <span className="pixel text-white" style={{ fontSize: 20, writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: 1 }}>
              ANDRIAN·95
            </span>
          </div>
          <div className="w-[190px] bg-[#c0c0c0] p-[3px] text-[12px]">
            <StartItem icon="doc" label="Resume.docx" onClick={() => openApp("resume")} />
            <StartItem icon="notepad" label="Tentang Andrian" onClick={() => openApp("about")} />
            <StartItem icon="briefcase" label="Pengalaman Kerja" onClick={() => openApp("experience")} />
            <StartItem icon="sliders" label="Kompetensi" onClick={() => openApp("skills")} />
            <StartItem icon="gradcap" label="Pendidikan" onClick={() => openApp("education")} />
            <StartItem icon="computer" label="My Computer" onClick={() => openApp("mycomputer")} />
            <StartItem icon="terminal" label="MS-DOS Prompt" onClick={() => openApp("terminal")} />
            <div className="my-[3px] border-t border-[#808080] border-b border-b-white" />
            <StartItem icon="shutdown" label="Shut Down…" onClick={() => { setStartOpen(false); setShutdownDlg(true); }} />
          </div>
        </div>
      )}

      {/* ===== dialog shutdown ===== */}
      {shutdownDlg && <ShutdownDialog onClose={() => setShutdownDlg(false)} onShutdown={onShutdown} onRestart={onRestart} onStandby={() => { setShutdownDlg(false); setStandbyMsg(true); }} />}
      {standbyMsg && (
        <div className="absolute inset-0 z-[80] flex items-center justify-center">
          <div className="relative">
            <MsgBox title="ANDRIAN-95" text={"Standby? Anak logistik nggak kenal standby.\nShift jalan terus 24/7."} kind="info" onClose={() => setStandbyMsg(false)} />
          </div>
        </div>
      )}

      {/* ===== taskbar ===== */}
      <Taskbar
        wins={wins}
        focusedKey={focusedKey}
        startOpen={startOpen}
        onToggleStart={() => { playClick(); setStartOpen((s) => !s); }}
        onTaskClick={(w) => {
          playClick();
          if (w.minimized) {
            focusKey(w.key);
            setWins((p) => p.map((x) => (x.key === w.key ? { ...x, minimized: false } : x)));
          } else if (focusedKey === w.key) {
            setWins((p) => p.map((x) => (x.key === w.key ? { ...x, minimized: true } : x)));
          } else {
            focusKey(w.key);
          }
        }}
        onStartShutdown={() => { setStartOpen(false); setShutdownDlg(true); }}
      />
    </div>
  );
}

function CtxItem({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button className="menu-item w-full cursor-default px-3 py-[4px] text-left" onClick={onClick}>
      {children}
    </button>
  );
}

function StartItem({ icon, label, onClick }: { icon: IconName; label: string; onClick: () => void }) {
  return (
    <button className="menu-item flex w-full cursor-default items-center gap-2 px-2 py-[5px] text-left" onClick={onClick}>
      <Pix name={icon} size={26} />
      <span>{label}</span>
    </button>
  );
}

/* ================= Taskbar ================= */
function Taskbar({
  wins,
  focusedKey,
  startOpen,
  onToggleStart,
  onTaskClick,
  onStartShutdown,
}: {
  wins: WinState[];
  focusedKey: string | null;
  startOpen: boolean;
  onToggleStart: () => void;
  onTaskClick: (w: WinState) => void;
  onStartShutdown: () => void;
}) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const iv = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="bevel-out absolute right-0 bottom-0 left-0 z-[65] flex h-[34px] items-center gap-[3px] px-[3px]">
      <button
        className={`flex h-[26px] cursor-pointer items-center gap-[5px] px-[6px] text-[12px] font-bold ${startOpen ? "w95-btn-pressed" : "w95-btn"}`}
        onClick={onToggleStart}
        aria-label="Start"
      >
        <Pix name="flag" size={18} />
        <span>Start</span>
      </button>
      <span className="mx-[2px] h-[24px] w-[2px] border-l border-[#808080] border-r border-r-white" />

      <div className="flex min-w-0 flex-1 items-center gap-[3px] overflow-hidden">
        {wins.map((w) => {
          const def = APPS[w.appId];
          const active = focusedKey === w.key && !w.minimized;
          return (
            <button
              key={w.key}
              className={`flex h-[26px] min-w-0 cursor-pointer items-center gap-[5px] px-[6px] text-[11.5px] ${active ? "w95-btn-pressed font-bold" : "w95-btn"}`}
              style={{ width: wins.length > 4 ? 120 : 168 }}
              onClick={() => onTaskClick(w)}
            >
              <Pix name={def.icon} size={16} />
              <span className="truncate">{def.title.split("—")[0].trim()}</span>
            </button>
          );
        })}
      </div>

      <button
        className="w95-btn hidden h-[26px] cursor-pointer items-center px-[6px] text-[11px] sm:flex"
        onClick={onStartShutdown}
        title="Shut Down"
      >
        <Pix name="shutdown" size={16} />
      </button>

      <div className="bevel-in-thin flex h-[26px] items-center gap-2 px-2" title={now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}>
        <Pix name="speaker" size={16} />
        <span className="pixel text-[13px]">
          {now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }).replace(".", ":")}
        </span>
      </div>
    </div>
  );
}

/* ================= Dialog Shut Down ================= */
function ShutdownDialog({
  onClose,
  onShutdown,
  onRestart,
  onStandby,
}: {
  onClose: () => void;
  onShutdown: () => void;
  onRestart: () => void;
  onStandby: () => void;
}) {
  const [opt, setOpt] = useState<"shutdown" | "restart" | "standby">("shutdown");
  return (
    <div className="absolute inset-0 z-[75] flex items-center justify-center" onPointerDown={onClose}>
      <div className="bevel-out win-shadow w-[380px] border border-black p-[3px]" onPointerDown={(e) => e.stopPropagation()}>
        <div className="titlebar flex h-[22px] items-center justify-between px-2 text-[12px] font-bold">
          <span>Shut Down ANDRIAN-95</span>
          <button className="w95-btn flex h-[16px] w-[18px] items-center justify-center" onClick={onClose} aria-label="Tutup">
            <svg width="8" height="7" viewBox="0 0 8 7">
              <path d="M0 0h2l2 2 2-2h2v1L6 3l2 2v2H6L4 5 2 7H0V5l2-2L0 1z" fill="currentColor" />
            </svg>
          </button>
        </div>
        <div className="flex gap-4 bg-[#c0c0c0] p-4">
          <Pix name="computer" size={54} className="mt-1 shrink-0" />
          <div className="flex-1">
            <p className="mb-3 text-[12px] font-bold">Yakin mau menutup CV-nya? Masih banyak yang belum dilihat lho.</p>
            {([
              ["shutdown", "Shut down the computer"],
              ["restart", "Restart the computer"],
              ["standby", "Standby (mode rebahan)"],
            ] as const).map(([v, label]) => (
              <label key={v} className="flex cursor-pointer items-center gap-2 py-[3px] text-[12px]">
                <span className="field flex h-[12px] w-[12px] items-center justify-center">
                  {opt === v ? <span className="h-[6px] w-[6px] bg-black" /> : null}
                </span>
                <input type="radio" className="hidden" checked={opt === v} onChange={() => setOpt(v)} />
                {label}
              </label>
            ))}
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="w95-btn w-[76px] py-[3px] text-[12px]"
                onClick={() => {
                  if (opt === "shutdown") onShutdown();
                  else if (opt === "restart") onRestart();
                  else onStandby();
                }}
              >
                OK
              </button>
              <button className="w95-btn w-[76px] py-[3px] text-[12px]" onClick={onClose}>
                Cancel
              </button>
              <button className="w95-btn w-[76px] py-[3px] text-[12px]" onClick={() => window.open(`mailto:${IDENTITAS.email}`)}>
                Email…
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
