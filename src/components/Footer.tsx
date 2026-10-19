import { styled } from "@linaria/react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { profile } from "../data/profile";
import { bp, color, font } from "../styles/theme";
import { Container } from "./Layout";

const Wrap = styled.footer`
	position: relative;
	z-index: 1;
	border-top: 1px solid ${color.border};
	padding: 40px 0 48px;
	background: rgba(11, 12, 16, 0.6);
`;

const Inner = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20px;

	${bp.md} {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const Name = styled.p`
	font-weight: 600;

	span {
		display: block;
		margin-top: 4px;
		font-family: ${font.mono};
		font-size: 12px;
		font-weight: 400;
		color: ${color.textFaint};
	}
`;

const Links = styled.div`
	display: flex;
	gap: 10px;
`;

const IconLink = styled.a`
	display: inline-flex;
	align-items: center;
	gap: 8px;
	height: 38px;
	padding: 0 14px;
	border: 1px solid ${color.border};
	border-radius: 999px;
	font-size: 14px;
	color: ${color.textMuted};
	transition: color 0.2s, border-color 0.2s;

	&:hover {
		color: ${color.text};
		border-color: ${color.borderStrong};
	}

	svg {
		width: 14px;
		height: 14px;
	}
`;

export function Footer({ live }: { live: boolean }) {
	return (
		<Wrap>
			<Container>
				<Inner>
					<Name>
						{profile.name}
						<span>
							React, Vite and Linaria. Project data {live ? "is live from" : "falls back to a snapshot of"} the GitHub API.
						</span>
					</Name>
					<Links>
						<IconLink href={profile.links.github} target="_blank" rel="noreferrer">
							<FaGithub aria-hidden="true" /> GitHub
						</IconLink>
						<IconLink href={profile.links.linkedin} target="_blank" rel="noreferrer">
							<FaLinkedinIn aria-hidden="true" /> LinkedIn
						</IconLink>
					</Links>
				</Inner>
			</Container>
		</Wrap>
	);
}
