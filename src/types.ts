export type ProjectTagTypes =
	| "front-end"
	| "back-end"
	| "mobile-app"
	| "desktop-app"
	| "api"
	| "react"
	| "electron"
	| "pytorch"
	| "python"
	| "node"
	| "typescript";

export interface IApiProject {
	id: string;
	name: string;
	tags: string;
	github_uri: string;
	demo_uri: string;
	thumb: string;
}
