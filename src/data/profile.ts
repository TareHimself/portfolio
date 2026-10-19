export const GITHUB_USER = "TareHimself";

export const profile = {
	name: "Oyintare Ebelo",
	handle: GITHUB_USER,
	roles: ["Software Engineer", "Computer vision developer", "Graphics programmer", "Tools builder"],
	links: {
		github: `https://github.com/${GITHUB_USER}`,
		linkedin: "https://www.linkedin.com/in/oyintare-ebelo/",
	},
} as const;

export const focusAreas = [
	{
		title: "Graphics and engines",
		body:
			"A C# game engine with a Vulkan render graph, bindless resources and a retained-mode UI system, plus a Roslyn-based transpiler that turns C# shader classes into Slang.",
		repos: ["rin", "rwin", "webmdx"],
	},
	{
		title: "Computer vision and ML",
		body:
			"A dataset labeling app, a comic text-detection, inpainting and localization pipeline, and the synthetic-data tooling that trains its segmenter.",
		repos: ["comic-localizer", "cv-label", "comic-localizer-text-masking"],
	},
	{
		title: "Tooling and full stack",
		body:
			"Electron, React and TypeScript apps, a from-source C++ package manager, and a self-hosted docs store where people and AI agents edit together.",
		repos: ["relay", "silo", "cv-label"],
	},
] as const;
