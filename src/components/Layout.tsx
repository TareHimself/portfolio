import { styled } from "@linaria/react";
import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";
import { bp, color, ease, font } from "../styles/theme";

export const Container = styled.div`
	width: 100%;
	max-width: 1120px;
	margin: 0 auto;
	padding: 0 32px;

	${bp.sm} {
		padding: 0 20px;
	}
`;

export const Section = styled.section`
	padding: 112px 0;

	${bp.md} {
		padding: 80px 0;
	}
`;

const HeadingWrap = styled.div`
	display: flex;
	flex-direction: column;
	gap: 14px;
	margin-bottom: 48px;
	max-width: 640px;
`;

export const Eyebrow = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 10px;
	font-family: ${font.mono};
	font-size: 13px;
	letter-spacing: 0.04em;
	color: ${color.accent};

	&::before {
		content: "";
		width: 24px;
		height: 1px;
		background: ${color.accent};
	}
`;

export const Title = styled.h2`
	font-size: clamp(30px, 4vw, 42px);
	font-weight: 600;
	letter-spacing: -0.015em;
	line-height: 1.1;
`;

export const Lede = styled.p`
	font-size: 17px;
	color: ${color.textMuted};
`;

export function SectionHeading({
	eyebrow,
	title,
	lede,
}: {
	eyebrow: string;
	title: string;
	lede?: string;
}) {
	return (
		<Reveal>
			<HeadingWrap>
				<Eyebrow>{eyebrow}</Eyebrow>
				<Title>{title}</Title>
				{lede ? <Lede>{lede}</Lede> : null}
			</HeadingWrap>
		</Reveal>
	);
}

const RevealBox = styled.div`
	min-width: 0;
	height: 100%;
	opacity: 0;
	transform: translateY(18px);
	transition:
		opacity 0.7s ${ease},
		transform 0.7s ${ease};
	transition-delay: var(--reveal-delay, 0ms);

	&[data-visible="true"] {
		opacity: 1;
		transform: none;
	}
`;

export function Reveal({
	children,
	delay = 0,
	className,
}: {
	children: ReactNode;
	delay?: number;
	className?: string;
}) {
	const ref = useReveal<HTMLDivElement>();
	return (
		<RevealBox
			ref={ref}
			className={className}
			style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
		>
			{children}
		</RevealBox>
	);
}
