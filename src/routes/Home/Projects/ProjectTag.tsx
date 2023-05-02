import { BsServer } from "react-icons/bs";
import { GoDeviceDesktop, GoDeviceMobile } from "react-icons/go";
import { MdWeb } from "react-icons/md";
import { AiOutlineApi } from "react-icons/ai";
import { GrReactjs } from "react-icons/gr";
import { IoLogoElectron } from "react-icons/io5";
import { IconType } from "react-icons";
import { SiPytorch, SiPython, SiTypescript, SiNodedotjs } from "react-icons/si";
import { ProjectTagTypes } from "../../../types";
import React from "react";

// eslint-disable-next-line react/require-default-props
export type TagIconProps = { tag: ProjectTagTypes; className?: string };

const TAG_ICONS: Record<ProjectTagTypes, IconType | null> = {
	api: AiOutlineApi,
	"back-end": BsServer,
	"desktop-app": GoDeviceDesktop,
	"front-end": MdWeb,
	"mobile-app": GoDeviceMobile,
	react: GrReactjs,
	electron: IoLogoElectron,
	pytorch: SiPytorch,
	python: SiPython,
	node: SiNodedotjs,
	typescript: SiTypescript,
};

const TAG_ICONS_TOOLTIP: Record<ProjectTagTypes, string | null> = {
	api: "API",
	"back-end": "Backend",
	"desktop-app": "Desktop Application",
	"front-end": "Web Application",
	"mobile-app": "Mobile Application",
	react: "React Framework",
	electron: "Electron Framework",
	pytorch: "Pytorch",
	python: "Python",
	node: "NodeJS",
	typescript: "Typescript",
};

export default function ProjectTag({ tag, className }: TagIconProps) {
	const Icon = TAG_ICONS[tag];
	const tooltipText = TAG_ICONS_TOOLTIP[tag];

	if (!Icon) return null;

	return <Icon className={className} />;
}
