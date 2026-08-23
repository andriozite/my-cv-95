import { useRef, type ReactNode, type PointerEvent } from "react";
import { Pix, type IconName } from "../icons";

export interface WinState {
  key: string;
  appId: string;
  x: number;
  y: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
}

interface WindowProps {
  win: WinState;
  title: string;
  icon: IconName;
  width: number;
  height: number;
  focused: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMax: () => void;
  onMove: (x: number, y: number) => void;
  children: ReactNode;
  menuBar?: ReactNode;
  statusBar?: ReactNode;
  bodyClassName?: string;
}

export default function Window95({
  win,
  title,
  icon,
  width,
  height,
  focused,
  onFocus,
  onClose,
  onMinimize,
  onToggleMax,
  onMove,
  children,
  menuBar,
  statusBar,
  bodyClassName = "bg-[#c0c0c0]",
}: WindowProps) {
  const dragRef = useRef<{ dx: number; dy: number } | null>(null);

  const startDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (win.maximized) return;
    onFocus();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragRef.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const doDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const nx = e.clientX - dragRef.current.dx;
    const ny = e.clientY - dragRef.current.dy;
    const maxX = window.innerWidth - 90;
    onMove(Math.max(-width + 120, Math.min(nx, maxX)), Math.max(0, Math.min(ny, window.innerHeight - 90)));
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  const style = win.maximized
    ? { left: 0, top: 0, width: "100vw", height: "calc(100vh - 34px)", zIndex: win.z }
    : {
        left: win.x,
        top: win.y,
        width: `min(${width}px, 96vw)`,
        height: `min(${height}px, calc(100vh - 44px))`,
        zIndex: win.z,
      };

  return (
    <section
      className={`win-shadow win-pop absolute flex flex-col border border-black ${
        win.minimized ? "hidden" : ""
      }`}
      style={style}
      onPointerDown={onFocus}
    >
      <div className="bevel-out flex min-h-0 flex-1 flex-col p-[3px]">
        {/* title bar */}
        <div
          className={`flex h-[22px] shrink-0 cursor-default select-none items-center gap-1 px-[3px] ${
            focused ? "titlebar" : "titlebar-inactive"
          }`}
          onPointerDown={startDrag}
          onPointerMove={doDrag}
          onPointerUp={endDrag}
          onDoubleClick={onToggleMax}
        >
          <Pix name={icon} size={15} />
          <span className="min-w-0 flex-1 truncate text-[12px] font-bold tracking-tight">{title}</span>
          <TitleBtn label="Minimize" onClick={onMinimize}>
            <svg width="8" height="7" viewBox="0 0 8 7" aria-hidden>
              <rect x="0" y="5" width="6" height="2" fill="currentColor" />
            </svg>
          </TitleBtn>
          <TitleBtn label={win.maximized ? "Restore" : "Maximize"} onClick={onToggleMax}>
            <svg width="9" height="8" viewBox="0 0 9 8" aria-hidden>
              {win.maximized ? (
                <>
                  <rect x="2" y="0" width="7" height="2" fill="currentColor" />
                  <rect x="2" y="0" width="1" height="6" fill="currentColor" />
                  <rect x="8" y="0" width="1" height="6" fill="currentColor" />
                  <rect x="2" y="5" width="7" height="1" fill="currentColor" />
                  <rect x="0" y="2" width="7" height="2" fill="currentColor" />
                  <rect x="0" y="2" width="1" height="6" fill="currentColor" />
                  <rect x="6" y="2" width="1" height="6" fill="currentColor" />
                  <rect x="0" y="7" width="7" height="1" fill="currentColor" />
                </>
              ) : (
                <>
                  <rect x="0" y="0" width="9" height="2" fill="currentColor" />
                  <rect x="0" y="0" width="1" height="8" fill="currentColor" />
                  <rect x="8" y="0" width="1" height="8" fill="currentColor" />
                  <rect x="0" y="7" width="9" height="1" fill="currentColor" />
                </>
              )}
            </svg>
          </TitleBtn>
          <TitleBtn label="Close" danger onClick={onClose}>
            <svg width="8" height="7" viewBox="0 0 8 7" aria-hidden>
              <path d="M0 0h2l2 2 2-2h2v1L6 3l2 2v2H6L4 5 2 7H0V5l2-2L0 1z" fill="currentColor" />
            </svg>
          </TitleBtn>
        </div>

        {menuBar}

        {/* body */}
        <div className={`mt-[3px] min-h-0 flex-1 ${bodyClassName}`}>{children}</div>

        {statusBar}
      </div>
    </section>
  );
}

function TitleBtn({
  children,
  onClick,
  label,
  danger,
}: {
  children: ReactNode;
  onClick: () => void;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      aria-label={label}
      className={`w95-btn flex h-[16px] w-[18px] items-center justify-center ${
        danger ? "text-[#202020]" : ""
      }`}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </button>
  );
}
