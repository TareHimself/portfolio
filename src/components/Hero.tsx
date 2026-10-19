import { styled } from "@linaria/react";
import { FaArrowDown, FaGithub } from "react-icons/fa6";
import { profile } from "../data/profile";
import { useTypewriter } from "../hooks/useTypewriter";
import { bp, color, ease, font, radius } from "../styles/theme";
import { Container } from "./Layout";

const Wrap = styled.section`
	min-height: 100vh;
	min-height: 100svh;
	display: flex;
	align-items: center;
	padding: 140px 0 80px;

	${bp.md} {
		padding: 120px 0 60px;
	}
`;

const Intro = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	gap: 32px;
	animation: hero-in 0.9s ${ease} both;
`;

const Kicker = styled.p`
	display: inline-flex;
	align-items: center;
	gap: 10px;
	font-family: ${font.mono};
	font-size: 14px;
	color: ${color.textMuted};

	&::before {
		content: "";
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: ${color.accent};
		box-shadow: 0 0 0 4px ${color.accentSoft};
	}
`;

const Headline = styled.h1`
	font-size: clamp(40px, 6vw, 76px);
	font-weight: 700;
	letter-spacing: -0.02em;
	line-height: 1.05;
`;

const Slot = styled.span`
	display: grid;

	> * {
		grid-area: 1 / 1;
	}
`;

const Sizer = styled.span`
	visibility: hidden;
	pointer-events: none;
	user-select: none;
`;

const Typed = styled.span`
	color: ${color.accent};
`;

const Caret = styled.span`
	display: inline-block;
	width: 0.06em;
	height: 0.85em;
	margin-left: 0.06em;
	vertical-align: -0.08em;
	background: ${color.accent};
	border-radius: 2px;

	&[data-idle="true"] {
		animation: caret-blink 1s steps(1) infinite;
	}
`;

const Actions = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 12px;

	${bp.sm} {
		flex-direction: column;
		align-self: stretch;
	}
`;

const Button = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	height: 48px;
	padding: 0 22px;
	border-radius: ${radius.pill};
	font-weight: 600;
	font-size: 15px;
	transition:
		transform 0.25s ${ease},
		background 0.2s,
		border-color 0.2s,
		color 0.2s;

	&:hover {
		transform: translateY(-2px);
	}

	svg {
		width: 15px;
		height: 15px;
	}

	&[data-variant="primary"] {
		background: ${color.accent};
		color: ${color.bg};

		&:hover {
			background: ${color.accentStrong};
		}
	}

	&[data-variant="ghost"] {
		border: 1px solid ${color.borderStrong};
		color: ${color.text};

		&:hover {
			border-color: ${color.text};
		}
	}
`;

export function Hero() {
	const { text, idle } = useTypewriter(profile.roles);

	return (
		<Wrap id="top">
			<Container>
				<Intro>
					<Kicker>Hi, I am</Kicker>
					<Headline>
						{profile.name}
						<Slot>
							{profile.roles.map((role) => (
								<Sizer key={role} aria-hidden="true">
									{role}
								</Sizer>
							))}
							<Typed>
								{text}
								<Caret data-idle={idle} aria-hidden="true" />
							</Typed>
						</Slot>
					</Headline>
					<Actions>
						<Button href={profile.links.github} target="_blank" rel="noreferrer" data-variant="ghost">
							<FaGithub /> @{profile.handle}
						</Button>
						<Button href="#focus" data-variant="primary">
							Continue <FaArrowDown />
						</Button>
					</Actions>
				</Intro>
			</Container>
		</Wrap>
	);
}
