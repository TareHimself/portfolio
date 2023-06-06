import { IApiProject, ProjectTagTypes } from "../../../types";
import ProjectTag from "./ProjectTag";

export type ProjectItemProps = { project: IApiProject };

export default function ProjectItem({ project }: ProjectItemProps) {
	const tags: ProjectTagTypes[] = project.tags;

	const [DemoStr, DemoUri] = project.demo_uri.trim().split("|");
	return (
		<div className="projects-grid-item">
			<div className="projects-grid-item-overlay">
				<div
					className="lazy-image-bg"
					style={{
						backgroundImage: `url(https://resize.oyintare.dev/64x50/${project.thumb})`,
					}}
				></div>
				<img
					src={`https://resize.oyintare.dev/640x500/${project.thumb}`}
					alt="thumb"
					loading="lazy"
				/>
				<div className="item-overlay">
					<h3>{project.description}</h3>
				</div>
				<div className="projects-tag-container">
					{tags.map((tag) => (
						<>
							<ProjectTag
								key={tag}
								tag={tag}
								className="projects-tag-icon"
							/>
						</>
					))}
				</div>
				<div className="projects-title-container">
					<h2>{project.name}</h2>
				</div>
			</div>

			<span>
				{DemoStr && DemoUri && (
					<button
						onClick={() => {
							window.open(DemoUri);
						}}
					>
						<h2>{DemoStr}</h2>
					</button>
				)}{" "}
				{project.github_uri.length && (
					<button
						onClick={() => {
							window.open(project.github_uri);
						}}
					>
						<h2>Code</h2>
					</button>
				)}
			</span>
		</div>
	);
}
