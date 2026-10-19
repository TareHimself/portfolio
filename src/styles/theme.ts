export const color = {
	bg: "#0b0c10",
	bgRaised: "#111318",
	surface: "#15181f",
	surfaceHover: "#1b1f28",
	border: "rgba(255, 255, 255, 0.08)",
	borderStrong: "rgba(255, 255, 255, 0.16)",
	text: "#e9ecf2",
	textMuted: "#9aa3b4",
	textFaint: "#6b7280",
	accent: "#6ee7b7",
	accentStrong: "#34d399",
	accentSoft: "rgba(110, 231, 183, 0.12)",
	violet: "#a78bfa",
	amber: "#fbbf24",
} as const;

export const font = {
	sans: "'Jost', 'Futura', 'Avenir Next', system-ui, sans-serif",
	mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
} as const;

export const radius = {
	sm: "8px",
	md: "14px",
	lg: "20px",
	pill: "999px",
} as const;

export const bp = {
	sm: "@media (max-width: 640px)",
	md: "@media (max-width: 900px)",
	lg: "@media (max-width: 1200px)",
} as const;

export const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
