import { useCallback } from "react";
import { FiChevronDown } from "react-icons/fi";
import useTypewriter from "../../hooks/useTypewriter";

function Intro() {
	const onProjectClicked = useCallback(() => {
		document
			.getElementById("Projects")
			?.scrollIntoView({ behavior: "smooth" });
	}, []);

	const { text: typewriterText, isTyping } = useTypewriter([
		"Software Engineer",
		"Full-stack Web Developer",
		"Quick Learner",
	]);
	return (
		<div
			className="outer-section"
			style={{
				height: "100vh",
				minHeight: "100vh",
				maxHeight: "100vh",
			}}
		>
			<section id="Intro">
				<div className="content-row">
					<h3 style={{ fontWeight: "normal" }}>
						Hi, my name is <mark>Oyintare Ebelo</mark>. I am a..
					</h3>
					<h1 style={{ textAlign: "center" }}>
						{typewriterText}
						<mark
							className="typewriter-symbol"
							data-typing={isTyping}
						>
							|
						</mark>
					</h1>
				</div>

				<button onClick={onProjectClicked}>
					<FiChevronDown />
				</button>
			</section>
		</div>
	);
}

export default Intro;
