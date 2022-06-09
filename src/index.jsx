import "./css/main.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import { Home } from "./routes/routes";

function App() {
	useEffect(() => {

		const docWidth = document.documentElement.offsetWidth;

		[].forEach.call(
			document.querySelectorAll("*"),
			function (el) {
				if (el.offsetWidth > docWidth) {
					console.log(el);
				}
			}
		);

	});
	return (<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home />} />
		</Routes>
	</BrowserRouter>
	);

}


ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

