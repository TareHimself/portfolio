import { useEffect, useState } from "react";
import { fetchGitHubSnapshot, type GitHubSnapshot } from "../lib/github";

export type GitHubState =
	| { status: "loading" }
	| { status: "ready"; data: GitHubSnapshot }
	| { status: "error"; error: string };

export function useGitHub(): GitHubState {
	const [state, setState] = useState<GitHubState>({ status: "loading" });

	useEffect(() => {
		const controller = new AbortController();
		fetchGitHubSnapshot(controller.signal)
			.then((data) => setState({ status: "ready", data }))
			.catch((err: unknown) => {
				if (controller.signal.aborted) return;
				setState({ status: "error", error: err instanceof Error ? err.message : String(err) });
			});
		return () => controller.abort();
	}, []);

	return state;
}
