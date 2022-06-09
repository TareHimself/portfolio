import React from "react";
import { IApiProject, tag } from "../../../types";
import { BsServer } from "react-icons/bs";
import { GoDeviceDesktop, GoDeviceMobile } from "react-icons/go";
import { MdWeb } from "react-icons/md";
import { AiOutlineApi } from "react-icons/ai";
import { GrReactjs } from "react-icons/gr";
import { IoLogoElectron } from "react-icons/io5";
import { IconType } from "react-icons";

export type ProjectItemProps = { project: IApiProject }

export type TagIconProps = { tag: tag, className?: string }

const icons: Record<tag, IconType | null> = {
	"api": AiOutlineApi,
	"back-end": BsServer,
	"desktop-app": GoDeviceDesktop,
	"front-end": MdWeb,
	"mobile-app": GoDeviceMobile,
	"react": GrReactjs,
	"electron": IoLogoElectron
};

function TagIcon({ tag, className }: TagIconProps) {

	const Icon = icons[tag];

	if (!Icon) return null;

	return <Icon className={className} />;
}

export default function ProjectItem({ project }: ProjectItemProps) {

	const tags: tag[] = project.tags.split(",") as tag[];

	return (
		<div className="projects-grid-item">

			<div className="projects-grid-item-overlay">
				<div ></div>
				<img src={project.thumb} />
			</div>
			<div className="projects-tag-container">{tags.map(tag => <TagIcon key={tag} tag={tag} className="projects-tag-icon" />)}</div>
			<span>
				{project.demo.length && <button onClick={() => { window.open(project.demo); }} >Live</button>} {project.github.length && <button onClick={() => { window.open(project.github); }} >GitHub</button>}
			</span>

		</div>
	);
}
