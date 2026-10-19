export interface HuggingFaceStats {
	downloads30d: number;
	downloadsAllTime: number;
	likes: number;
}

const CACHE_KEY = "hf-stats-v1";
const CACHE_TTL_MS = 10 * 60 * 1000;

type Cache = Record<string, HuggingFaceStats & { fetchedAt: number }>;

function readCache(): Cache {
	try {
		return JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? "{}") as Cache;
	} catch {
		return {};
	}
}

function writeCache(cache: Cache) {
	try {
		sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
	} catch {
		return;
	}
}

export async function fetchModelStats(modelId: string, signal?: AbortSignal): Promise<HuggingFaceStats> {
	const cache = readCache();
	const hit = cache[modelId];
	if (hit && Date.now() - hit.fetchedAt < CACHE_TTL_MS) return hit;

	const url = `https://huggingface.co/api/models/${modelId}?expand[]=downloads&expand[]=downloadsAllTime&expand[]=likes`;
	const res = await fetch(url, signal ? { signal } : {});
	if (!res.ok) throw new Error(`Hugging Face ${res.status} for ${modelId}`);
	const json = (await res.json()) as { downloads?: number; downloadsAllTime?: number; likes?: number };

	const stats: HuggingFaceStats = {
		downloads30d: json.downloads ?? 0,
		downloadsAllTime: json.downloadsAllTime ?? 0,
		likes: json.likes ?? 0,
	};
	writeCache({ ...cache, [modelId]: { ...stats, fetchedAt: Date.now() } });
	return stats;
}
