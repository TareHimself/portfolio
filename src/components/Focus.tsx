import { styled } from "@linaria/react";
import { focusAreas, profile } from "../data/profile";
import { bp, color, ease, font, radius } from "../styles/theme";
import { Container, Reveal, Section, SectionHeading } from "./Layout";

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 20px;

	${bp.md} {
		grid-template-columns: minmax(0, 1fr);
	}
`;

const Card = styled.article`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 16px;
	height: 100%;
	padding: 28px;
	border: 1px solid ${color.border};
	border-radius: ${radius.lg};
	background: ${color.surface};
	transition:
		transform 0.35s ${ease},
		border-color 0.3s;
	overflow: hidden;

	&::after {
		content: "";
		position: absolute;
		inset: 0;
		background: radial-gradient(400px 200px at 0% 0%, ${color.accentSoft}, transparent 70%);
		opacity: 0;
		transition: opacity 0.35s;
		pointer-events: none;
	}

	&:hover {
		transform: translateY(-4px);
		border-color: ${color.borderStrong};

		&::after {
			opacity: 1;
		}
	}
`;

const Index = styled.span`
	font-family: ${font.mono};
	font-size: 13px;
	color: ${color.accent};
`;

const CardTitle = styled.h3`
	font-size: 20px;
	font-weight: 700;
	letter-spacing: -0.02em;
`;

const Body = styled.p`
	color: ${color.textMuted};
	font-size: 15px;
	flex: 1;
`;

const Repos = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	position: relative;
	z-index: 1;
`;

const RepoLink = styled.a`
	font-family: ${font.mono};
	font-size: 12px;
	padding: 5px 10px;
	border-radius: ${radius.pill};
	background: rgba(255, 255, 255, 0.04);
	border: 1px solid ${color.border};
	color: ${color.textMuted};
	transition: color 0.2s, border-color 0.2s;

	&:hover {
		color: ${color.accent};
		border-color: ${color.accent};
	}
`;

export function Focus() {
	return (
		<Section id="focus">
			<Container>
				<SectionHeading
					eyebrow="Background"
					title="Day job, side projects"
					lede="By day I'm a software engineer on product work across the stack: user-facing apps, backend services and the infrastructure between them. The projects below are what I build on my own time, where rendering, machine learning and tooling overlap."
				/>
				<Grid>
					{focusAreas.map((area, i) => (
						<Reveal key={area.title} delay={i * 90}>
							<Card>
								<Index>0{i + 1}</Index>
								<CardTitle>{area.title}</CardTitle>
								<Body>{area.body}</Body>
								<Repos>
									{area.repos.map((repo) => (
										<RepoLink
											key={repo}
											href={`${profile.links.github}/${repo}`}
											target="_blank"
											rel="noreferrer"
										>
											{repo}
										</RepoLink>
									))}
								</Repos>
							</Card>
						</Reveal>
					))}
				</Grid>
			</Container>
		</Section>
	);
}
