import React from "react";

import { IApiProject, ProjectTagTypes } from "../../../types";
import ProjectTag from "./ProjectTag";

export type ProjectItemProps = { project: IApiProject };

export default function ProjectItem({ project }: ProjectItemProps) {
	const tags: ProjectTagTypes[] = project.tags.split(
		","
	) as ProjectTagTypes[];

	return (
		<div className="projects-grid-item">
			<div className="projects-grid-item-overlay">
				<div>
					<h3>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit
					</h3>
				</div>
				<img src={project.thumb} />
			</div>
			<div className="projects-tag-container">
				{tags.map((tag) => (
					<ProjectTag
						key={tag}
						tag={tag}
						className="projects-tag-icon"
					/>
				))}
			</div>
			<span>
				{project.demo_uri.trim().split("|")[1] && (
					<button
						onClick={() => {
							window.open(
								project.demo_uri.trim().split("|")[1] || ""
							);
						}}
					>
						<h2>
							{project.demo_uri.startsWith("live")
								? "Live"
								: "Download"}
						</h2>
					</button>
				)}{" "}
				{project.github_uri.length && (
					<button
						onClick={() => {
							window.open(project.github_uri);
						}}
					>
						<h2>GitHub</h2>
					</button>
				)}
			</span>
		</div>
	);
}
