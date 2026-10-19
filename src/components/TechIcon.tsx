import { styled } from "@linaria/react";
import type { IconType } from "react-icons";
import {
	SiAndroid,
	SiCmake,
	SiCplusplus,
	SiDocker,
	SiDotnet,
	SiElectron,
	SiHuggingface,
	SiKotlin,
	SiNodedotjs,
	SiNumpy,
	SiOpencv,
	SiPython,
	SiPytorch,
	SiReact,
	SiSharp,
	SiSqlite,
	SiTypescript,
	SiUnrealengine,
	SiVulkan,
	SiYolo,
} from "react-icons/si";
import type { Tech } from "../data/projects";
import { color, font, radius } from "../styles/theme";

const meta: Record<Tech, { label: string; Icon: IconType | null }> = {
	csharp: { label: "C#", Icon: SiSharp },
	dotnet: { label: ".NET", Icon: SiDotnet },
	cpp: { label: "C++", Icon: SiCplusplus },
	cmake: { label: "CMake", Icon: SiCmake },
	vulkan: { label: "Vulkan", Icon: SiVulkan },
	slang: { label: "Slang", Icon: null },
	python: { label: "Python", Icon: SiPython },
	pytorch: { label: "PyTorch", Icon: SiPytorch },
	yolo: { label: "YOLO", Icon: SiYolo },
	opencv: { label: "OpenCV", Icon: SiOpencv },
	numpy: { label: "NumPy", Icon: SiNumpy },
	huggingface: { label: "Hugging Face", Icon: SiHuggingface },
	typescript: { label: "TypeScript", Icon: SiTypescript },
	react: { label: "React", Icon: SiReact },
	electron: { label: "Electron", Icon: SiElectron },
	node: { label: "Node.js", Icon: SiNodedotjs },
	sqlite: { label: "SQLite", Icon: SiSqlite },
	docker: { label: "Docker", Icon: SiDocker },
	kotlin: { label: "Kotlin", Icon: SiKotlin },
	android: { label: "Android", Icon: SiAndroid },
	unreal: { label: "Unreal Engine", Icon: SiUnrealengine },
};

const Pill = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 6px;
	height: 26px;
	padding: 0 10px;
	border-radius: ${radius.pill};
	border: 1px solid ${color.border};
	background: rgba(255, 255, 255, 0.03);
	font-family: ${font.mono};
	font-size: 12px;
	color: ${color.textMuted};
	white-space: nowrap;

	svg {
		width: 13px;
		height: 13px;
		opacity: 0.9;
	}
`;

export function TechPill({ tech }: { tech: Tech }) {
	const { label, Icon } = meta[tech];
	return (
		<Pill>
			{Icon ? <Icon aria-hidden="true" /> : null}
			{label}
		</Pill>
	);
}
