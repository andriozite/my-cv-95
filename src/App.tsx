import { useCallback, useState } from "react";
import { PowerOffScreen, BiosScreen, LogoScreen, SafeShutdownScreen, playClick, playChime } from "./screens/Boot";
import Desktop from "./win95/Desktop";

type Phase = "off" | "bios" | "logo" | "desktop" | "shutdown";

export default function App() {
  const [phase, setPhase] = useState<Phase>("off");

  const toDesktop = useCallback(() => {
    playChime();
    setPhase("desktop");
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      {phase === "off" && (
        <PowerOffScreen
          onPower={() => {
            playClick();
            setPhase("bios");
          }}
        />
      )}
      {phase === "bios" && <BiosScreen onDone={() => setPhase("logo")} />}
      {phase === "logo" && <LogoScreen onDone={toDesktop} />}
      {phase === "desktop" && <Desktop onShutdown={() => setPhase("shutdown")} onRestart={() => setPhase("bios")} />}
      {phase === "shutdown" && <SafeShutdownScreen onRestart={() => setPhase("off")} />}
    </div>
  );
}
