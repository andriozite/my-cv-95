/* ================== Ikon pixel ala Windows 95 (inline SVG) ================== */

const PAL: Record<string, string> = {
  k: "#000000",
  w: "#ffffff",
  g: "#c0c0c0",
  d: "#808080",
  D: "#404040",
  b: "#000080",
  B: "#1084d0",
  t: "#008080",
  y: "#ecc94b",
  Y: "#fff3a0",
  n: "#8f5a1e",
  N: "#c78f3f",
  o: "#ff8000",
  r: "#e03c31",
  e: "#21b039",
  m: "#f25022",
  G: "#7fba00",
  u: "#00a4ef",
  z: "#ffb900",
};

type IconName =
  | "flag"
  | "computer"
  | "doc"
  | "notepad"
  | "folder"
  | "bin"
  | "terminal"
  | "briefcase"
  | "sliders"
  | "gradcap"
  | "floppy"
  | "cd"
  | "drive"
  | "cert"
  | "mail"
  | "trashfile"
  | "shutdown"
  | "speaker";

const MAPS: Record<IconName, string[]> = {
  flag: [
    "................",
    "..mmmm..GGGG....",
    "..mmmm..GGGG....",
    "..mmmm..GGGG....",
    "..mmmm..GGGG....",
    "..mmmm..GGGG....",
    "..mmmm..GGGG....",
    "................",
    "..uuuu..zzzz....",
    "..uuuu..zzzz....",
    "..uuuu..zzzz....",
    "..uuuu..zzzz....",
    "..uuuu..zzzz....",
    "..uuuu..zzzz....",
    "................",
    "................",
  ],
  computer: [
    "................",
    ".kkkkkkkkkkkkkk.",
    ".kggggggggggggk.",
    ".kgttwwttttttgk.",
    ".kgttwtttttttgk.",
    ".kgttttttttttgk.",
    ".kgttttttttttgk.",
    ".kgttttttttttgk.",
    ".kgttttttttttgk.",
    ".kggggggggggggk.",
    ".kkkkkkkkkkkkkk.",
    ".....kggggk.....",
    "...kggggggggk...",
    "..kkkkkkkkkkkk..",
    "................",
    "................",
  ],
  doc: [
    ".kkkkkkkkkkk....",
    ".kwwwwwwwkkk....",
    ".kwwwwwwwkgk....",
    ".kwwwwwwwkggk...",
    ".kwwwwwwwkkkk...",
    ".kwwwwwwwwwwk...",
    ".kwwwwwwwwwwk...",
    ".kwwb...bwwk....",
    ".kwwb...bwwk....",
    ".kwwb.b.bwwk....",
    ".kwwb.b.bwwk....",
    ".kwwbb.bbwwk....",
    ".kwwwwwwwwwk....",
    ".kkkkkkkkkkk....",
    "................",
    "................",
  ],
  notepad: [
    "..kgkgkgkgkgk...",
    "..kkkkkkkkkkk...",
    "..kbbbbbbbbbk...",
    "..kwwwwwwwwwk...",
    "..kwgggggggwk...",
    "..kwwwwwwwwwk...",
    "..kwgggggggwk...",
    "..kwwwwwwwwwk...",
    "..kwgggggggwk...",
    "..kwwwwwwwwwk...",
    "..kwgggggggwk...",
    "..kwwwwwwwwwk...",
    "..kwwwwwwwwwk...",
    "..kkkkkkkkkkk...",
    "................",
    "................",
  ],
  folder: [
    "................",
    "..kkkk..........",
    ".kyyyykkkkkkkk..",
    ".kyyyyyyyyyyyk..",
    ".kkkkkkkkkkkkk..",
    "kyyyyyyyyyyyyyk.",
    "kyyyyyyyyyyyyyk.",
    "kyyyyyyyyyyyyyk.",
    "kyyyyyyyyyyyyyk.",
    "kyyyyyyyyyyyyyk.",
    "kyyyyyyyyyyyyyk.",
    "kyyyyyyyyyyyyyk.",
    "kyyyyyyyyyyyyyk.",
    ".kkkkkkkkkkkkk..",
    "................",
    "................",
  ],
  bin: [
    "................",
    ".....kkkkkk.....",
    "...kkkkkkkkkk...",
    "..kggggggggggk..",
    ".kkkkkkkkkkkkkk.",
    ".kgkgkgkgkgkgk..",
    ".kgkgkgkgkgkgk..",
    ".kgkgkgkgkgkgk..",
    ".kgkgkgkgkgkgk..",
    ".kgkgkgkgkgkgk..",
    ".kgkgkgkgkgkgk..",
    ".kgkgkgkgkgkgk..",
    ".kgkgkgkgkgkgk..",
    ".kkkkkkkkkkkkk..",
    "................",
    "................",
  ],
  terminal: [
    "................",
    ".kkkkkkkkkkkkkk.",
    ".kggggggggggggk.",
    ".kgkkkkkkkkkkgk.",
    ".kgkwwkwwkwwkgk.",
    ".kgkkkkkkkkkkgk.",
    ".kgkwwkwwkkkkgk.",
    ".kgkkkkkkkkkkgk.",
    ".kgkkkkkkkkgkgk.",
    ".kgkkkkkkkkggkk.",
    ".kgkkkkkkkkkkgk.",
    ".kgkkkkkkkkkkgk.",
    ".kggggggggggggk.",
    ".kkkkkkkkkkkkkk.",
    "................",
    "................",
  ],
  briefcase: [
    "................",
    "................",
    ".....kkkkkk.....",
    "....ky....yk....",
    "....ky....yk....",
    ".kkkkkkkkkkkkkk.",
    ".knnnnnnnnnnnnk.",
    ".knnnnkknnnnnnk.",
    ".knnnnkknnnnnnk.",
    ".kNNNNNNNNNNNNk.",
    ".kNNNNNNNNNNNNk.",
    ".kNNNNNNNNNNNNk.",
    ".kNNNNNNNNNNNNk.",
    ".kkkkkkkkkkkkkk.",
    "................",
    "................",
  ],
  sliders: [
    "................",
    ".kkkkkkkkkkkkkk.",
    ".kggggggggggggk.",
    ".kgdddddbbdddgk.",
    ".kgdddddbbdddgk.",
    ".kggggggggggggk.",
    ".kgdddbbddddgk..",
    ".kgdddbbddddgk..",
    ".kggggggggggggk.",
    ".kgddbbbbdddgk..",
    ".kgddbbbbdddgk..",
    ".kggggggggggggk.",
    ".kggggggggggggk.",
    ".kkkkkkkkkkkkkk.",
    "................",
    "................",
  ],
  gradcap: [
    "................",
    "................",
    "......kkkk......",
    "....kkkkkkkk....",
    "..kkkkkkkkkkkk..",
    "kkkkkkkkkkkkkkkk",
    "..kkkkkkkkkkkky.",
    "....kDDDDDDk.y..",
    "....kDDDDDDk.y..",
    "....kkkkkkkk.yy.",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
  ],
  floppy: [
    "................",
    ".kkkkkkkkkkkkk..",
    ".kbbbbbbbggggk..",
    ".kbbbbbbbgkkgk..",
    ".kbbbbbbbgkkgk..",
    ".kbbbbbbbggggk..",
    ".kbbbbbbbbbbbk..",
    ".kbbwwwwwwwwbk..",
    ".kbbwggggggwbk..",
    ".kbbwwwwwwwwbk..",
    ".kbbwggggggwbk..",
    ".kbbwwwwwwwwbk..",
    ".kbbbbbbbbbbbk..",
    ".kkkkkkkkkkkkk..",
    "................",
    "................",
  ],
  cd: [
    "................",
    "................",
    "....kkkkkkkk....",
    "..kkddddddddkk..",
    ".kdwwddddddwwdk.",
    ".kdwddddddddwdk.",
    "kdwwddddddddwwdk",
    "kdddddkkkkdddddk",
    "kdddddkwwkdddddk",
    "kdwwddddddddwwdk",
    ".kdwddddddddwdk.",
    ".kdwwddddddwwdk.",
    "..kkddddddddkk..",
    "....kkkkkkkk....",
    "................",
    "................",
  ],
  drive: [
    "................",
    "................",
    "................",
    "................",
    ".kkkkkkkkkkkkkk.",
    ".kggggggggggggk.",
    ".kgddddddddddgk.",
    ".kggggggggggeek.",
    ".kkkkkkkkkkkkkk.",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
  ],
  cert: [
    "................",
    ".kkkkkkkkkkk....",
    ".kwwwwwwwwwk....",
    ".kwgggggggwk....",
    ".kwwwwwwwwwk....",
    ".kwgggggggwk....",
    ".kwwwwwwwwwk....",
    ".kwgggggggwk....",
    ".kwwwyyywwwk....",
    ".kwwyyyyywwk....",
    ".kwwyyyyywwk....",
    ".kwwwyyywwwk....",
    ".kwwwwwwrrwk....",
    ".kkkkkkkkkkk....",
    "................",
    "................",
  ],
  mail: [
    "................",
    "................",
    "................",
    ".kkkkkkkkkkkkkk.",
    ".kdwwwwwwwwwwdk.",
    ".kwwdwwwwwwdwwk.",
    ".kwwwdwwwwdwwwk.",
    ".kwwwwdwwdwwwwk.",
    ".kwwwwwddwwwwwk.",
    ".kwwwwwwwwwwwwk.",
    ".kwwwwwwwwwwwwk.",
    ".kwwwwwwwwwwwwk.",
    ".kkkkkkkkkkkkkk.",
    "................",
    "................",
    "................",
  ],
  trashfile: [
    "................",
    "................",
    "................",
    "....kkkkkkk.....",
    "...kwwkwwwkk....",
    "..kwwkwwwkwwk...",
    "..kwkwwkwwwkwk..",
    "..kwwkwwwkwwwk..",
    "...kwwkwwkwwwk..",
    "....kkkkkkkkk...",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
  ],
  shutdown: [
    "................",
    ".kkkkkkkkkkkkkk.",
    ".kggggggggggggk.",
    ".kgbbbbbbbbbbgk.",
    ".kgbbbbrrbbbbgk.",
    ".kgbbbbrrbbbbgk.",
    ".kgbbbbrrbbbbgk.",
    ".kgbbbbbbbbbbgk.",
    ".kgbbbbbbbbbbgk.",
    ".kggggggggggggk.",
    ".kkkkkkkkkkkkkk.",
    ".....kggggk.....",
    "...kggggggggk...",
    "..kkkkkkkkkkkk..",
    "................",
    "................",
  ],
  speaker: [
    "................",
    "................",
    "................",
    "................",
    ".......kk.......",
    "..kkk.kggkk.....",
    ".kgggkggggggkk..",
    ".kgggkggggggggk.",
    ".kgggkggggggkk..",
    "..kkk.kggkk.....",
    ".......kk.......",
    "................",
    "................",
    "................",
    "................",
    "................",
  ],
};

export function Pix({
  name,
  size = 32,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const rows = MAPS[name];
  const H = rows.length;
  const W = Math.max(...rows.map((r) => r.length));
  const rects: React.ReactNode[] = [];
  rows.forEach((row, y) => {
    const padded = row.padEnd(W, ".");
    for (let x = 0; x < W; x++) {
      const c = padded[x];
      if (c !== "." && PAL[c]) {
        rects.push(
          <rect key={`${x}-${y}`} x={x} y={y} width={1.03} height={1.03} fill={PAL[c]} />
        );
      }
    }
  });
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      className={className}
      style={{ imageRendering: "pixelated", flexShrink: 0 }}
      aria-hidden
    >
      {rects}
    </svg>
  );
}

export type { IconName };
