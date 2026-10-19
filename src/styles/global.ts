import { css } from "@linaria/core";
import { color, font } from "./theme";

export const globals = css`
	:global() {
		*,
		*::before,
		*::after {
			box-sizing: border-box;
		}

		html {
			scroll-behavior: smooth;
			-webkit-text-size-adjust: 100%;
		}

		body {
			margin: 0;
			min-height: 100vh;
			font-family: ${font.sans};
			font-size: 16px;
			line-height: 1.6;
			color: ${color.text};
			background-color: ${color.bg};
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			overflow-x: hidden;
		}

		h1,
		h2,
		h3,
		h4,
		p {
			margin: 0;
		}

		a {
			color: inherit;
			text-decoration: none;
		}

		button {
			font: inherit;
			color: inherit;
			background: none;
			border: 0;
			padding: 0;
			cursor: pointer;
		}

		::selection {
			background: ${color.accent};
			color: ${color.bg};
		}

		::-webkit-scrollbar {
			width: 10px;
		}

		::-webkit-scrollbar-track {
			background: ${color.bg};
		}

		::-webkit-scrollbar-thumb {
			background: ${color.borderStrong};
			border-radius: 999px;
		}

		:focus-visible {
			outline: 2px solid ${color.accent};
			outline-offset: 3px;
			border-radius: 6px;
		}

		@media (prefers-reduced-motion: reduce) {
			html {
				scroll-behavior: auto;
			}

			*,
			*::before,
			*::after {
				animation-duration: 0.01ms !important;
				animation-iteration-count: 1 !important;
				transition-duration: 0.01ms !important;
			}
		}
	}
`;

export const keyframes = css`
	:global() {
		@keyframes hero-in {
			from {
				opacity: 0;
				transform: translateY(24px);
			}
			to {
				opacity: 1;
				transform: none;
			}
		}

		@keyframes shimmer {
			from {
				background-position: 200% 0;
			}
			to {
				background-position: -200% 0;
			}
		}

		@keyframes caret-blink {
			0%,
			49% {
				opacity: 1;
			}
			50%,
			100% {
				opacity: 0;
			}
		}
	}
`;
