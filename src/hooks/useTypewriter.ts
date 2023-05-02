import { useCallback, useEffect, useState } from "react";
import { ReturnTypeOrNull } from "../types";

/**
 *
 * @param values The strings to iterate over
 * @param startIndex The index of {@link values} to start at
 * @param typingRate The rate to type text at in ms
 * @param deleteRate The rate to delete text at in mx
 * @param typingDisplayDelay The delay before deleting text in ms
 * @param typingBreakDelay The delay before typing text in ms
 * @returns
 */
export default function useTypewriter(
	values: string[],
	startIndex = 0,
	typingRate = 120,
	deleteRate = 60,
	typingDisplayDelay = 4000,
	typingBreakDelay = 700
): { text: string; isTyping: boolean } {
	const [typingInterval, setTypingInterval] =
		useState<ReturnTypeOrNull<typeof setInterval>>(null);
	const [deletionInterval, setDeletionInterval] =
		useState<ReturnTypeOrNull<typeof setInterval>>(null);
	const [waitTimeout, setWaitTimeout] =
		useState<ReturnTypeOrNull<typeof setTimeout>>(null);
	const [text, setText] = useState("");

	/**
	 * Used to start the typewriter
	 * @param initialText The text to start from
	 * @param index The index of {@link values} to start at
	 */
	const startTyping = useCallback(
		(initialText: string, index: number) => {
			const targetText = values[index] || "";
			if (initialText === targetText) {
				setDeletionInterval((di) => {
					if (di !== null) {
						clearInterval(di);
					}

					let currentText = initialText;

					return setInterval(() => {
						if (currentText.length > 0) {
							currentText = currentText.slice(0, -1);
							setText(currentText);
						} else {
							setDeletionInterval((d) => {
								if (d) {
									clearInterval(d);
								}

								return null;
							});
							setWaitTimeout((wt) => {
								if (wt !== null) {
									clearTimeout(wt);
								}

								return setTimeout(() => {
									startTyping(
										currentText,
										(index + 1) % values.length
									);
								}, typingBreakDelay);
							});
						}
					}, deleteRate);
				});
			} else {
				setTypingInterval((ti) => {
					if (ti !== null) {
						clearInterval(ti);
					}

					let currentText = initialText;

					return setInterval(() => {
						if (currentText !== targetText) {
							currentText += targetText[currentText.length];
							setText(currentText);
						} else {
							setTypingInterval((a) => {
								if (a !== null) clearInterval(a);

								return null;
							});

							setWaitTimeout((wt) => {
								if (wt !== null) {
									clearTimeout(wt);
								}

								return setTimeout(() => {
									startTyping(currentText, index);
								}, typingDisplayDelay);
							});
						}
					}, typingRate);
				});
			}
		},
		[deleteRate, typingBreakDelay, typingDisplayDelay, typingRate, values]
	);

	/**
	 * Mainly used for cleanup
	 */
	const stopTyping = useCallback(() => {
		if (deletionInterval !== null) {
			setDeletionInterval((a) => {
				if (a !== null) clearInterval(a);

				return null;
			});
		}

		if (typingInterval !== null) {
			setTypingInterval((a) => {
				if (a !== null) clearInterval(a);

				return null;
			});
		}

		if (waitTimeout !== null) {
			setWaitTimeout((a) => {
				if (a !== null) clearTimeout(a);

				return null;
			});
		}
	}, [deletionInterval, typingInterval, waitTimeout]);

	useEffect(() => {
		startTyping("", startIndex);

		return stopTyping;

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		text: text,
		isTyping: typingInterval !== null || deletionInterval !== null,
	};
}
