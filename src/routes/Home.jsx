import React from "react";
import Intro from "../Components/Home/Intro";
import Contact from "../Components/Home/Contact";
import Projects from "../Components/Home/Projects";

function Home() {

    return (<div className="page">
        <Intro />
        <Projects />
        <Contact />
    </div>);
}

export default Home;