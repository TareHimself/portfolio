import { FaLinkedinIn, FaGithub, FaYoutube } from "react-icons/fa";
import { SiUnrealengine } from "react-icons/si";
import { PORTFOLIO_DATA } from "./data";

export default function Socials() {
	return (
		<div id="socials">
			<FaLinkedinIn
				onClick={() =>
					window.open(PORTFOLIO_DATA.LINKED_IN_URL, "_blank")
				}
			/>
			<FaGithub
				onClick={() => window.open(PORTFOLIO_DATA.GITHUB_URL, "_blank")}
			/>
			<FaYoutube
				onClick={() =>
					window.open(PORTFOLIO_DATA.YOUTUBE_URL, "_blank")
				}
			/>
			<SiUnrealengine
				onClick={() =>
					window.open(PORTFOLIO_DATA.UNREAL_ENGINE_URL, "_blank")
				}
			/>
		</div>
	);
}
