import { BsServer } from "react-icons/bs";
import { GoDeviceDesktop, GoDeviceMobile } from "react-icons/go";
import { MdWeb } from "react-icons/md";
import { AiOutlineApi } from "react-icons/ai";
import { GrReactjs } from "react-icons/gr";
import { IoLogoElectron } from "react-icons/io5";
import { IconType } from "react-icons";
import {
	SiPytorch,
	SiPython,
	SiTypescript,
	SiNodedotjs,
	SiOpencv,
	SiNumpy,
	SiNetlify,
	SiReplit,
	SiSqlite,
} from "react-icons/si";
import { ProjectTagTypes } from "../../../types";
import { useId } from "react";
import { Tooltip } from "react-tooltip";

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
	opencv: SiOpencv,
	numpy: SiNumpy,
	netlify: SiNetlify,
	replit: SiReplit,
	sqlite: SiSqlite,
};

const TAG_ICONS_TOOLTIP: Record<ProjectTagTypes, string | null> = {
	api: "Uses external API's",
	"back-end": "Has a Backend",
	"desktop-app": "Desktop Application",
	"front-end": "Web Application",
	"mobile-app": "Mobile Application",
	react: "Uses React",
	electron: "Uses Electron",
	pytorch: "Uses Pytorch",
	python: "Written in Python",
	node: "Runs on NodeJS",
	typescript: "Written inTypescript",
	opencv: "Uses OpenCV",
	numpy: "Uses Numpy",
	netlify: "Hosted On Netlify",
	replit: "Hosted On Replit",
	sqlite: "Uses SQLite",
};

export default function ProjectTag({ tag, className }: TagIconProps) {
	const Icon = TAG_ICONS[tag];

	const iconInstanceId = useId();
	const tooltipText = TAG_ICONS_TOOLTIP[tag];

	if (!Icon) return null;

	return (
		<>
			<Icon
				data-tooltip-id={iconInstanceId}
				className={className}
				data-tooltip={tooltipText}
				data-tooltip-content={TAG_ICONS_TOOLTIP[tag]}
			/>
			<Tooltip id={iconInstanceId} />
		</>
	);
}
