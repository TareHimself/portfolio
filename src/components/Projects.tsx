import { styled } from "@linaria/react";
import { useId, useMemo, useState } from "react";
import { FaArrowUpRightFromSquare, FaChevronDown, FaDownload, FaGithub, FaStar } from "react-icons/fa6";
import { groupLabel, MIN_COUNT_TO_SHOW, projects, type Group, type Project } from "../data/projects";
import { useHuggingFace } from "../hooks/useHuggingFace";
import type { HuggingFaceStats } from "../lib/huggingface";
import { profile } from "../data/profile";
import { colorFor, type GitHubRepo, type GitHubSnapshot } from "../lib/github";
import { bp, color, ease, font, radius } from "../styles/theme";
import { Container, Reveal, Section, SectionHeading } from "./Layout";
import { TechPill } from "./TechIcon";

type Filter = Group | "all";

interface Resolved {
	project: Project;
	description: string;
	stars: number | null;
	language: string | null;
	pushedAt: string | null;
	archived: boolean;
	url: string;
}

function resolve(project: Project, repos: GitHubRepo[] | undefined): Resolved {
	const live = repos?.find((r) => r.name === project.repo);
	const url = `${profile.links.github}/${project.repo}`;
	if (!live) {
		return {
			project,
			description: project.fallback.description,
			stars: null,
			language: project.fallback.language,
			pushedAt: null,
			archived: project.fallback.archived ?? false,
			url,
		};
	}
	return {
		project,
		description: live.description ?? project.fallback.description,
		stars: live.stargazers_count,
		language: live.language,
		pushedAt: live.pushed_at,
		archived: live.archived,
		url: live.html_url,
	};
}

const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function timeAgo(iso: string) {
	const days = Math.round((Date.now() - new Date(iso).getTime()) / 86_400_000);
	if (days < 1) return "today";
	if (days < 30) return relative.format(-days, "day");
	if (days < 365) return relative.format(-Math.round(days / 30), "month");
	return relative.format(-Math.round(days / 365), "year");
}

const Toolbar = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin: -16px 0 32px;
`;

const FilterChip = styled.button`
	height: 36px;
	padding: 0 16px;
	border-radius: ${radius.pill};
	border: 1px solid ${color.border};
	font-size: 14px;
	font-weight: 500;
	color: ${color.textMuted};
	background: transparent;
	transition: color 0.2s, border-color 0.2s, background 0.2s;

	&:hover {
		color: ${color.text};
		border-color: ${color.borderStrong};
	}

	&[aria-pressed="true"] {
		color: ${color.bg};
		background: ${color.accent};
		border-color: ${color.accent};
	}
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 20px;

	${bp.md} {
		grid-template-columns: minmax(0, 1fr);
	}
`;

const Card = styled.article`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 18px;
	height: 100%;
	padding: 28px;
	border: 1px solid ${color.border};
	border-radius: ${radius.lg};
	background: ${color.surface};
	transition:
		transform 0.35s ${ease},
		border-color 0.3s,
		background 0.3s;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 28px;
		right: 28px;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--lang, ${color.accent}), transparent);
		opacity: 0.7;
	}

	&:hover {
		transform: translateY(-4px);
		border-color: ${color.borderStrong};
		background: ${color.surfaceHover};
	}
`;

const Thumb = styled.img`
	display: block;
	width: calc(100% + 56px);
	margin: -28px -28px 0;
	aspect-ratio: 16 / 9;
	object-fit: cover;
	border-bottom: 1px solid ${color.border};
	border-radius: ${radius.lg} ${radius.lg} 0 0;
`;

const Meta = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 14px;
	font-family: ${font.mono};
	font-size: 12px;
	color: ${color.textMuted};
`;

const Lang = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 7px;

	&::before {
		content: "";
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: var(--lang, ${color.accent});
	}
`;

const Stars = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 5px;

	svg {
		width: 11px;
		height: 11px;
		color: ${color.amber};
	}
`;

const Downloads = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 5px;

	svg {
		width: 11px;
		height: 11px;
		color: ${color.accent};
	}
`;

const Skeleton = styled.span`
	display: inline-block;
	height: 12px;
	border-radius: 999px;
	background: linear-gradient(90deg, ${color.surfaceHover}, ${color.borderStrong}, ${color.surfaceHover});
	background-size: 200% 100%;
	animation: shimmer 1.4s linear infinite;
`;

const Badge = styled.span`
	margin-left: auto;
	padding: 2px 8px;
	border-radius: ${radius.pill};
	border: 1px solid ${color.border};
	font-size: 11px;
	color: ${color.textFaint};
`;

const CardTitle = styled.h3`
	font-size: 24px;
	font-weight: 700;
	letter-spacing: -0.02em;

	a {
		transition: color 0.2s;
	}

	a:hover {
		color: ${color.accent};
	}
`;

const Summary = styled.p`
	font-size: 16px;
	line-height: 1.5;
`;

const Blurb = styled.p`
	color: ${color.textMuted};
	font-size: 15px;
`;

const DetailsToggle = styled.button`
	display: inline-flex;
	align-items: center;
	gap: 8px;
	width: fit-content;
	font-family: ${font.mono};
	font-size: 12px;
	color: ${color.textMuted};
	transition: color 0.2s;

	&:hover {
		color: ${color.accent};
	}

	svg {
		width: 10px;
		height: 10px;
		transition: transform 0.3s ${ease};
	}

	&[aria-expanded="true"] svg {
		transform: rotate(180deg);
	}
`;

const DetailsBody = styled.div`
	display: grid;
	grid-template-rows: 0fr;
	transition: grid-template-rows 0.35s ${ease};

	> div {
		overflow: hidden;
	}

	&[data-open="true"] {
		grid-template-rows: 1fr;
	}
`;

const DetailsInner = styled.div`
	padding-top: 12px;
`;

function TechDetails({ text }: { text: string }) {
	const [open, setOpen] = useState(false);
	const id = useId();
	return (
		<div>
			<DetailsToggle type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
				Technical details <FaChevronDown aria-hidden="true" />
			</DetailsToggle>
			<DetailsBody data-open={open} id={id}>
				<div>
					<DetailsInner>
						<Blurb>{text}</Blurb>
					</DetailsInner>
				</div>
			</DetailsBody>
		</div>
	);
}

const Pills = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
`;

const Links = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	padding-top: 6px;
`;

const LinkButton = styled.a`
	display: inline-flex;
	align-items: center;
	gap: 8px;
	height: 36px;
	padding: 0 14px;
	border-radius: ${radius.pill};
	border: 1px solid ${color.borderStrong};
	font-size: 14px;
	font-weight: 500;
	transition: border-color 0.2s, color 0.2s, background 0.2s;

	&:hover {
		border-color: ${color.accent};
		color: ${color.accent};
	}

	svg {
		width: 13px;
		height: 13px;
	}
`;

const MoreHeading = styled.h3`
	margin: 64px 0 20px;
	font-family: ${font.mono};
	font-size: 13px;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	color: ${color.textFaint};
`;

const MoreGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 14px;

	${bp.md} {
		grid-template-columns: minmax(0, 1fr);
	}
`;

const Row = styled.a`
	display: flex;
	flex-direction: column;
	height: 100%;
	gap: 10px;
	padding: 20px;
	border: 1px solid ${color.border};
	border-radius: ${radius.md};
	background: rgba(21, 24, 31, 0.6);
	transition:
		transform 0.3s ${ease},
		border-color 0.2s;

	&:hover {
		transform: translateY(-3px);
		border-color: ${color.borderStrong};
	}

	h4 {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 16px;
		font-weight: 600;
	}

	h4 svg {
		width: 12px;
		height: 12px;
		margin-left: auto;
		color: ${color.textFaint};
	}

	p {
		font-size: 14px;
		color: ${color.textMuted};
		flex: 1;
	}
`;

const Empty = styled.p`
	color: ${color.textMuted};
	padding: 40px 0;
`;

function Counts({
	stars,
	pushedAt,
	loading,
	hf,
}: {
	stars: number | null;
	pushedAt: string | null | undefined;
	loading: boolean;
	hf: HuggingFaceStats | null | undefined;
}) {
	if (loading) {
		return (
			<>
				<Skeleton style={{ width: 36 }} aria-hidden="true" />
				{pushedAt !== undefined ? <Skeleton style={{ width: 110 }} aria-hidden="true" /> : null}
			</>
		);
	}
	return (
		<>
			{stars !== null && stars >= MIN_COUNT_TO_SHOW ? (
				<Stars title="GitHub stars">
					<FaStar aria-hidden="true" /> {stars}
				</Stars>
			) : null}
			{hf === undefined ? (
				<Skeleton style={{ width: 36 }} aria-hidden="true" />
			) : hf && hf.downloadsAllTime >= MIN_COUNT_TO_SHOW ? (
				<Downloads title={`Hugging Face downloads, all time (${hf.downloads30d} in the last 30 days)`}>
					<FaDownload aria-hidden="true" /> {hf.downloadsAllTime}
				</Downloads>
			) : null}
			{pushedAt ? <span>updated {timeAgo(pushedAt)}</span> : null}
		</>
	);
}

const modelIds = projects.flatMap((p) => (p.huggingface ? [p.huggingface] : []));

const filters: { key: Filter; label: string }[] = [
	{ key: "all", label: "All" },
	{ key: "graphics", label: groupLabel.graphics },
	{ key: "vision", label: groupLabel.vision },
	{ key: "tooling", label: groupLabel.tooling },
];

export function Projects({ snapshot, loading }: { snapshot: GitHubSnapshot | null; loading: boolean }) {
	const [filter, setFilter] = useState<Filter>("all");
	const hfStats = useHuggingFace(modelIds);

	const resolved = useMemo(() => projects.map((p) => resolve(p, snapshot?.repos)), [snapshot]);

	const visible = resolved.filter((r) => filter === "all" || r.project.group === filter);
	const featured = visible.filter((r) => r.project.featured);
	const more = visible.filter((r) => !r.project.featured);

	return (
		<Section id="projects">
			<Container>
				<SectionHeading
					eyebrow="Work"
					title="Projects"
					lede="All open source. Stars and activity come from GitHub when the page loads."
				/>
				<Toolbar role="group" aria-label="Filter projects">
					{filters.map((f) => (
						<FilterChip
							key={f.key}
							type="button"
							aria-pressed={filter === f.key}
							onClick={() => setFilter(f.key)}
						>
							{f.label}
						</FilterChip>
					))}
				</Toolbar>

				{featured.length === 0 && more.length === 0 ? <Empty>Nothing in this category yet.</Empty> : null}

				<Grid>
					{featured.map((r, i) => (
						<Reveal key={r.project.repo} delay={(i % 2) * 80}>
							<Card style={{ "--lang": colorFor(r.language) } as React.CSSProperties}>
								{r.project.image ? <Thumb src={r.project.image} alt="" loading="lazy" /> : null}
								<Meta>
									{r.language ? <Lang>{r.language}</Lang> : null}
									<Counts
										stars={r.stars}
										pushedAt={r.pushedAt}
										loading={loading}
										hf={r.project.huggingface ? hfStats[r.project.huggingface] : null}
									/>
									{r.archived ? <Badge>archived</Badge> : null}
								</Meta>
								<CardTitle>
									<a href={r.url} target="_blank" rel="noreferrer">
										{r.project.title}
									</a>
								</CardTitle>
								<Summary>{r.project.summary}</Summary>
								<TechDetails text={r.project.blurb} />
								<Pills>
									{r.project.tech.map((t) => (
										<TechPill key={t} tech={t} />
									))}
								</Pills>
								<Links>
									<LinkButton href={r.url} target="_blank" rel="noreferrer">
										<FaGithub aria-hidden="true" /> Source
									</LinkButton>
									{r.project.links?.map((l) => (
										<LinkButton key={l.href} href={l.href} target="_blank" rel="noreferrer">
											{l.label} <FaArrowUpRightFromSquare aria-hidden="true" />
										</LinkButton>
									))}
								</Links>
							</Card>
						</Reveal>
					))}
				</Grid>

				{more.length > 0 ? (
					<>
						<MoreHeading>More on GitHub</MoreHeading>
						<MoreGrid>
							{more.map((r, i) => (
								<Reveal key={r.project.repo} delay={(i % 3) * 60}>
									<Row href={r.url} target="_blank" rel="noreferrer">
										<Meta style={{ "--lang": colorFor(r.language) } as React.CSSProperties}>
											{r.language ? <Lang>{r.language}</Lang> : null}
											<Counts
												stars={r.stars}
												pushedAt={undefined}
												loading={loading}
												hf={r.project.huggingface ? hfStats[r.project.huggingface] : null}
											/>
											{r.archived ? <Badge>archived</Badge> : null}
										</Meta>
										<h4>
											{r.project.title}
											<FaArrowUpRightFromSquare aria-hidden="true" />
										</h4>
										<p>{r.project.summary}</p>
										<Pills>
											{r.project.tech.map((t) => (
												<TechPill key={t} tech={t} />
											))}
										</Pills>
									</Row>
								</Reveal>
							))}
						</MoreGrid>
					</>
				) : null}
			</Container>
		</Section>
	);
}
