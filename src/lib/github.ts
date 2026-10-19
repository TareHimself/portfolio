import { GITHUB_USER } from "../data/profile";

export interface GitHubRepo {
	name: string;
	description: string | null;
	stargazers_count: number;
	forks_count: number;
	language: string | null;
	pushed_at: string;
	html_url: string;
	fork: boolean;
	archived: boolean;
	topics?: string[];
}

export interface GitHubUser {
	public_repos: number;
	followers: number;
	bio: string | null;
}

export interface GitHubSnapshot {
	user: GitHubUser;
	repos: GitHubRepo[];
	fetchedAt: number;
}

const CACHE_KEY = "gh-snapshot-v1";
const CACHE_TTL_MS = 10 * 60 * 1000;
const API = "https://api.github.com";

function readCache(): GitHubSnapshot | null {
	try {
		const raw = sessionStorage.getItem(CACHE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as GitHubSnapshot;
		if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
		return parsed;
	} catch {
		return null;
	}
}

function writeCache(snapshot: GitHubSnapshot) {
	try {
		sessionStorage.setItem(CACHE_KEY, JSON.stringify(snapshot));
	} catch {
		return;
	}
}

async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
	const res = await fetch(`${API}${path}`, {
		headers: { Accept: "application/vnd.github+json" },
		...(signal ? { signal } : {}),
	});
	if (!res.ok) throw new Error(`GitHub ${res.status} for ${path}`);
	return (await res.json()) as T;
}

export async function fetchGitHubSnapshot(signal?: AbortSignal): Promise<GitHubSnapshot> {
	const cached = readCache();
	if (cached) return cached;

	const [user, repos] = await Promise.all([
		getJson<GitHubUser>(`/users/${GITHUB_USER}`, signal),
		getJson<GitHubRepo[]>(`/users/${GITHUB_USER}/repos?per_page=100&type=owner&sort=pushed`, signal),
	]);

	const snapshot = { user, repos, fetchedAt: Date.now() };
	writeCache(snapshot);
	return snapshot;
}

export const languageColors: Record<string, string> = {
	"C#": "#8b5cf6",
	"C++": "#f472b6",
	C: "#94a3b8",
	TypeScript: "#60a5fa",
	JavaScript: "#facc15",
	Python: "#38bdf8",
	Kotlin: "#c084fc",
	Go: "#22d3ee",
	HTML: "#fb923c",
	CSS: "#a78bfa",
	CMake: "#34d399",
	"Jupyter Notebook": "#fb7185",
};

export function colorFor(language: string | null): string {
	return (language && languageColors[language]) || "#6ee7b7";
}
