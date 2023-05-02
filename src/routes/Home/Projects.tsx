import { useEffect } from "react";
import { useProjectsApi } from "../../hooks/useProjectsApi";
import ProjectItem from "./Projects/ProjectItem";

function Projects() {
	const [projects, fetchProjects] = useProjectsApi();

	useEffect(() => {
		fetchProjects();
	}, [fetchProjects]);

	useEffect(() => {
		function onResize() {
			const rows = parseInt(
				getComputedStyle(document.body, null).getPropertyValue(
					"--project-rows"
				),
				10
			);

			const recomendedRows =
				window.innerWidth < 1600
					? window.innerWidth < 1100
						? 1
						: 2
					: 3;

			if (recomendedRows > projects.length && rows !== projects.length) {
				document.body.style.setProperty(
					"--project-rows",
					`${projects.length}`
				);
			} else if (
				recomendedRows <= projects.length &&
				rows !== recomendedRows
			) {
				document.body.style.setProperty(
					"--project-rows",
					`${recomendedRows}`
				);
			}

			// console.log(
			// 	getComputedStyle(document.body, null).getPropertyValue(
			// 		"--project-rows"
			// 	)
			// );
		}

		window.addEventListener("resize", onResize);

		onResize();

		return () => {
			window.removeEventListener("resize", onResize);
		};
	}, [projects]);

	//<input role='search' type='search' id='project-search'></input>
	return (
		<div className="outer-section">
			<section id="Projects">
				<h2>Projects</h2>

				<div className="projects-grid">
					{projects.map((project) => (
						<ProjectItem key={project.id} project={project} />
					))}
				</div>
			</section>
		</div>
	);
}

export default Projects;
