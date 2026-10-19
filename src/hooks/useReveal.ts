import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement>(threshold = 0.15) {
	const ref = useRef<T>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (typeof IntersectionObserver === "undefined") {
			el.dataset.visible = "true";
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						el.dataset.visible = "true";
						observer.disconnect();
					}
				}
			},
			{ threshold },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [threshold]);

	return ref;
}
