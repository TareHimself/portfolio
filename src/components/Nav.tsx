import { styled } from "@linaria/react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { profile } from "../data/profile";
import { bp, color, font, radius } from "../styles/theme";

const Bar = styled.header`
	position: fixed;
	top: 16px;
	left: 0;
	right: 0;
	z-index: 10;
	display: flex;
	justify-content: center;
	padding: 0 16px;
	pointer-events: none;
`;

const Pill = styled.nav`
	pointer-events: auto;
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 6px 8px 6px 16px;
	border: 1px solid ${color.border};
	border-radius: ${radius.pill};
	background: rgba(17, 19, 24, 0.72);
	backdrop-filter: blur(14px);
	-webkit-backdrop-filter: blur(14px);
	box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
`;

const Brand = styled.a`
	font-family: ${font.mono};
	font-size: 13px;
	font-weight: 500;
	color: ${color.text};
	margin-right: 10px;
	white-space: nowrap;

	span {
		color: ${color.accent};
	}
`;

const Link = styled.a`
	padding: 8px 12px;
	border-radius: ${radius.pill};
	font-size: 14px;
	font-weight: 500;
	color: ${color.textMuted};
	transition: color 0.2s, background 0.2s;

	&:hover {
		color: ${color.text};
		background: rgba(255, 255, 255, 0.06);
	}

	${bp.sm} {
		display: none;
	}
`;

const IconLink = styled.a`
	display: grid;
	place-items: center;
	width: 34px;
	height: 34px;
	border-radius: ${radius.pill};
	color: ${color.textMuted};
	transition: color 0.2s, background 0.2s;

	&:hover {
		color: ${color.text};
		background: rgba(255, 255, 255, 0.06);
	}

	svg {
		width: 16px;
		height: 16px;
	}
`;

const Divider = styled.span`
	width: 1px;
	height: 18px;
	margin: 0 4px;
	background: ${color.border};
`;

export function Nav() {
	return (
		<Bar>
			<Pill aria-label="Primary">
				<Brand href="#top">
					<span>~/</span>oyintare
				</Brand>
				<Link href="#focus">Background</Link>
				<Link href="#projects">Projects</Link>
				<Divider aria-hidden="true" />
				<IconLink href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
					<FaGithub />
				</IconLink>
				<IconLink href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
					<FaLinkedinIn />
				</IconLink>
			</Pill>
		</Bar>
	);
}
