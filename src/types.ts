
export type tag = "front-end" | "back-end" | "mobile-app" | "desktop-app" | "api" | "react" | "electron";

export interface IApiProject {
	id: string;
	name: string;
	tags: string;
	github: string;
	demo: string;
	thumb: string;
	demo_prompt: "live" | "download"
}