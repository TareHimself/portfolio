import { useEffect, useState } from "react";

interface Options {
	typeMs?: number;
	deleteMs?: number;
	holdMs?: number;
	pauseMs?: number;
}

export function useTypewriter(
	words: readonly string[],
	{ typeMs = 70, deleteMs = 35, holdMs = 2200, pauseMs = 400 }: Options = {},
) {
	const [index, setIndex] = useState(0);
	const [length, setLength] = useState(0);
	const [deleting, setDeleting] = useState(false);

	const target = words[index % words.length] ?? "";

	useEffect(() => {
		if (words.length === 0) return;
		let delay = deleting ? deleteMs : typeMs;

		if (!deleting && length === target.length) delay = holdMs;
		if (deleting && length === 0) delay = pauseMs;

		const timer = setTimeout(() => {
			if (!deleting && length === target.length) {
				setDeleting(true);
			} else if (deleting && length === 0) {
				setDeleting(false);
				setIndex((i) => (i + 1) % words.length);
			} else {
				setLength((l) => l + (deleting ? -1 : 1));
			}
		}, delay);

		return () => clearTimeout(timer);
	}, [deleting, length, target, words.length, typeMs, deleteMs, holdMs, pauseMs]);

	return {
		text: target.slice(0, length),
		idle: !deleting && length === target.length,
	};
}
