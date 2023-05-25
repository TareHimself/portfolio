/* eslint-disable @typescript-eslint/no-explicit-any */
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
	| "typescript"
	| "opencv"
	| "numpy"
	| "netlify"
	| "replit"
	| "sqlite";

export interface IApiProject {
	id: string;
	name: string;
	tags: ProjectTagTypes[];
	github_uri: string;
	demo_uri: string;
	thumb: string;
	description: string;
}

export type ReturnTypeOrNull<T extends (...args: any[]) => any> =
	ReturnType<T> | null;
