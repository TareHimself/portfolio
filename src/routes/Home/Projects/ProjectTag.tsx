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
} from "react-icons/si";
import { ProjectTagTypes } from "../../../types";

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
};

const TAG_ICONS_TOOLTIP: Record<ProjectTagTypes, string | null> = {
	api: "Uses external API's",
	"back-end": "Backend",
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
};

export default function ProjectTag({ tag, className }: TagIconProps) {
	const Icon = TAG_ICONS[tag];

	const tooltipText = TAG_ICONS_TOOLTIP[tag];

	if (!Icon) return null;

	return <Icon className={className} data-tooltip={tooltipText} />;
}
