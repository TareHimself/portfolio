import "./css/home.css";
import React from "react";
import Intro from "./Intro";
import Contact from "./Contact";
import Projects from "./Projects";

function Home() {
	return (
		<div className="page">
			<Intro />
			<Projects />
			<Contact />
		</div>
	);
}

export default Home;
