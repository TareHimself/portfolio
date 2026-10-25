export type Tech =
	| "csharp"
	| "dotnet"
	| "cpp"
	| "cmake"
	| "vulkan"
	| "slang"
	| "python"
	| "pytorch"
	| "yolo"
	| "opencv"
	| "numpy"
	| "huggingface"
	| "typescript"
	| "react"
	| "electron"
	| "node"
	| "sqlite"
	| "docker"
	| "kotlin"
	| "android"
	| "unreal";

export type Group = "graphics" | "vision" | "tooling";

export const MIN_COUNT_TO_SHOW = 5;

export const groupLabel: Record<Group, string> = {
	graphics: "Graphics and engines",
	vision: "Computer vision and ML",
	tooling: "Tooling and full stack",
};

export interface ProjectLink {
	label: string;
	href: string;
}

export interface Project {
	repo: string;
	title: string;
	summary: string;
	blurb: string;
	group: Group;
	tech: Tech[];
	featured: boolean;
	huggingface?: string;
	image?: string;
	links?: ProjectLink[];
	fallback: {
		description: string;
		language: string | null;
		archived?: boolean;
	};
}

export const projects: Project[] = [
	{
		repo: "rin",
		title: "Rin",
		summary:
			"A game engine built from scratch, including the tooling that turns ordinary C# code into GPU shaders.",
		blurb:
			"C# game engine on Vulkan: render graph with bindless resources, retained-mode UI and views, audio and glTF scenes. Shaders are written in C# and transpiled to Slang at build time by Rin.Shade, a Roslyn-based transpiler with source generators.",
		group: "graphics",
		tech: ["csharp", "dotnet", "vulkan", "slang", "cpp"],
		featured: true,
		fallback: {
			description:
				"C# game engine with a Vulkan renderer, a retained-mode UI/views system, and Rin.Shade, a Roslyn-based C#-to-Slang shader transpiler.",
			language: "C#",
		},
	},
	{
		repo: "comic-localizer",
		title: "Comic Localizer",
		summary:
			"Translates comics automatically: finds the text on the page, erases it, and redraws the translation in place.",
		blurb:
			"End-to-end comic and manga localization. YOLO detection and segmentation finds text, OCR reads it, LaMa or DeepFillV2 inpaints the bubbles, then the translation is re-typeset. Ships as a library, a CLI and a UI.",
		group: "vision",
		tech: ["python", "pytorch", "yolo", "opencv"],
		featured: true,
		fallback: {
			description: "A comic localizer built with python",
			language: "Python",
		},
	},
	{
		repo: "cv-label",
		title: "cv-label",
		summary:
			"A desktop app for marking up images so machine learning models can learn from them.",
		blurb:
			"Desktop app for labeling image datasets. Projects, tasks and samples, a canvas labeler with pan and zoom for bounding boxes and polygons, and YOLO, COCO and .cvlabel import and export. SQLite storage behind a swappable data-store interface.",
		group: "vision",
		tech: ["typescript", "react", "electron", "sqlite"],
		featured: true,
		fallback: {
			description:
				"Desktop app for labeling image datasets for computer vision, built with Electron, React, and TypeScript.",
			language: "TypeScript",
		},
	},
	{
		repo: "relay",
		title: "Relay",
		summary:
			"Shared documents that people and AI assistants read and edit together, hosted on your own server.",
		blurb:
			"Self-hosted, git-backed markdown store where people and AI agents edit documents together. Pages are plain files in a git repo, with anchored comment threads, a REST API, an MCP server for agents and a React UI. Docker and Tailscale ready.",
		group: "tooling",
		tech: ["typescript", "react", "node", "docker"],
		featured: true,
		fallback: {
			description:
				"Self-hosted, git-backed markdown store where people and AI agents edit docs together",
			language: "TypeScript",
		},
	},
	{
		repo: "silo",
		title: "silo",
		summary:
			"Fetches and builds everything a C++ project depends on, so it builds the same way on every machine.",
		blurb:
			"A C++ package manager that builds dependencies from source in an isolated environment and keeps them in a local store. Recipes live in git registries, builds are keyed by compiler generation, and it drives the native modules in Rin.",
		group: "tooling",
		tech: ["python", "cpp", "cmake"],
		featured: true,
		links: [{ label: "Recipes", href: "https://github.com/TareHimself/silo-recipes" }],
		fallback: {
			description: "A C++ package manager that builds dependencies from source into a local store",
			language: "Python",
		},
	},
	{
		repo: "comic-localizer-text-masking",
		title: "Text Masking",
		summary:
			"Trains the model that spots text in comic pages, using generated training data instead of hand-labeled pages.",
		blurb:
			"Synthetic training-data generation and model training for the comic-localizer text-mask segmenter, a pixel classifier that handles multi-script text, vertical Japanese, low contrast and screentone. Weights are published on Hugging Face.",
		group: "vision",
		tech: ["python", "pytorch", "huggingface"],
		featured: true,
		huggingface: "TareHimself/comic-text-mask",
		links: [{ label: "Model", href: "https://huggingface.co/TareHimself/comic-text-mask" }],
		fallback: {
			description:
				"Synthetic training-data generation and model training for the comic-localizer text-mask segmenter",
			language: "Python",
		},
	},
	{
		repo: "osu-auto",
		title: "osu! AI",
		summary:
			"An AI that plays a rhythm game from the screen alone, trained by watching the game's autoplay.",
		blurb:
			"A small conv net that sees only the last few frames of osu!lazer and decides where to aim and when to click, 100 times a second. Trained by behaviour cloning on autoplay rendered offscreen by a modified lazer, on ranked and generated maps, and played by a native C++ runner with ONNX Runtime on CUDA.",
		group: "vision",
		tech: ["python", "pytorch", "cpp", "csharp"],
		featured: false,
		links: [{ label: "Old version video", href: "https://www.youtube.com/watch?v=YEoSrtow8Qw" }],
		fallback: {
			description: "An AI that plays osu!lazer from pixels only, trained by behaviour cloning on autoplay.",
			language: "Python",
		},
	},
	{
		repo: "webmdx",
		title: "webmdx",
		summary:
			"A small video decoding library so the engine can play WebM files.",
		blurb:
			"Small C++ WebM decoding library for Rin. VP8, VP9 and AV1 video with Opus and Vorbis audio, each toggleable at build time.",
		group: "graphics",
		tech: ["cpp", "cmake"],
		featured: false,
		fallback: {
			description: "WebM decoder library",
			language: "C++",
		},
	},
	{
		repo: "rwin",
		title: "rwin",
		summary:
			"Opens and manages windows for the engine on Windows, Linux and macOS.",
		blurb: "Cross-platform window management library in C++, built for the Rin engine.",
		group: "graphics",
		tech: ["cpp", "cmake"],
		featured: false,
		fallback: {
			description: "Cross-platform window management library in C++, built for the Rin engine.",
			language: "C++",
		},
	},
	{
		repo: "scriptpp",
		title: "ScriptPP",
		summary:
			"A small programming language, written to learn how interpreters work from the inside.",
		blurb:
			"A scripting language written in C++ with reference-counted values, Kotlin-style when expressions and early class support.",
		group: "tooling",
		tech: ["cpp"],
		featured: false,
		fallback: {
			description: "A scripting language written in C++",
			language: "C++",
		},
	},
	{
		repo: "mihon",
		title: "Mihon fork",
		summary:
			"A comic reader for Android, modified to translate pages as you read.",
		blurb:
			"Fork of the Mihon reader for Android with server-based page translation wired into the comic-localizer pipeline.",
		group: "vision",
		tech: ["kotlin", "android"],
		featured: false,
		fallback: {
			description: "A fork of mihon with server based translation",
			language: "Kotlin",
		},
	},
	{
		repo: "UEReplaySystemPlugin",
		title: "UE Replay System",
		summary:
			"Lets Unreal Engine designers record and replay gameplay without writing C++.",
		blurb: "Unreal Engine 5 plugin that exposes the engine replay system to Blueprints.",
		group: "graphics",
		tech: ["cpp", "unreal"],
		featured: false,
		fallback: {
			description: "UE5 Replay system exposed to blueprints",
			language: "C++",
			archived: true,
		},
	},
];
