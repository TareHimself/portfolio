import { useEffect, useState } from "react";
import { fetchModelStats, type HuggingFaceStats } from "../lib/huggingface";

export function useHuggingFace(modelIds: readonly string[]): Record<string, HuggingFaceStats | null> {
	const [stats, setStats] = useState<Record<string, HuggingFaceStats | null>>({});
	const key = modelIds.join(",");

	useEffect(() => {
		if (!key) return;
		const controller = new AbortController();
		for (const id of key.split(",")) {
			fetchModelStats(id, controller.signal)
				.then((s) => setStats((prev) => ({ ...prev, [id]: s })))
				.catch(() => {
					if (!controller.signal.aborted) setStats((prev) => ({ ...prev, [id]: null }));
				});
		}
		return () => controller.abort();
	}, [key]);

	return stats;
}
