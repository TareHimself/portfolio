import "./css/main.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./routes/exports";
import Socials from "./Socials";

function App() {
	useEffect(() => {
		const docWidth = document.documentElement.offsetWidth;

		[].forEach.call(document.querySelectorAll("*"), function (el) {
			if (el.offsetWidth > docWidth) {
				console.log(el);
			}
		});
	});
	return (
		<BrowserRouter>
			<Socials />
			<div id="content">
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));
