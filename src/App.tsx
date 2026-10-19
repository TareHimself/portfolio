import { styled } from "@linaria/react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Focus } from "./components/Focus";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";
import { useGitHub } from "./hooks/useGitHub";

const Main = styled.main`
	position: relative;
	z-index: 1;
	min-width: 0;
	overflow-x: clip;
`;

export function App() {
	const github = useGitHub();
	const snapshot = github.status === "ready" ? github.data : null;

	return (
		<>
			<Nav />
			<Main>
				<Hero />
				<Focus />
				<Projects snapshot={snapshot} loading={github.status === "loading"} />
			</Main>
			<Footer live={github.status === "ready"} />
		</>
	);
}
