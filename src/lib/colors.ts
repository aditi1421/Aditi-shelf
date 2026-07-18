const TAG_COLORS: Record<string, string> = {
  ai: "#7c5cff",
  careers: "#ff8a3d",
  writing: "#ff5d8f",
  society: "#00b8a9",
};

const FALLBACK_COLORS = ["#f9c80e", "#43bccd", "#ea3546", "#662e9b", "#2a9d8f"];

function hash(s: string): number {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

export function tagColor(tag: string): string {
  return TAG_COLORS[tag] ?? FALLBACK_COLORS[hash(tag) % FALLBACK_COLORS.length];
}

export function cardGradient(seed: string): string {
  const start = hash(seed) % 360;
  const end = (start + 60) % 360;
  return `linear-gradient(135deg, hsl(${start} 85% 62%), hsl(${end} 85% 55%))`;
}
