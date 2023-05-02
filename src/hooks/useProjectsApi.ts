import { useCallback, useState } from "react";
import { IApiProject } from "../types";

export function useProjectsApi(): [
	IApiProject[],
	() => Promise<IApiProject[]>
] {
	const [projects, setProjects] = useState<IApiProject[]>([]);

	// currently uses sample data, will need to be updated in the future
	const fetchProjects = useCallback(async () => {
		const result: IApiProject[] = [
			{
				id: "1",
				name: "wallpaperz",
				tags: "desktop-app,back-end,react,python",
				github_uri: "https://github.com/TareHimself/wallpaper-app",
				demo_uri: "https://umeko.dev/",
				thumb: "https://files.oyintare.dev/BzhlBg6Dljk0.jpg",
			},
			{
				id: "2",
				name: "Umeko.dev",
				tags: "front-end,back-end,react,api,pytorch",
				github_uri: "https://github.com/TareHimself/umeko-js-dashboard",
				demo_uri: "live|https://umeko.dev/",
				thumb: "https://files.oyintare.dev/BzhlBg6Dljk0.jpg",
			},
			{
				id: "3",
				name: "wallpaperz",
				tags: "desktop-app,back-end,react,electron",
				github_uri: "https://github.com/TareHimself/wallpaper-app",
				demo_uri: "https://umeko.dev/",
				thumb: "https://files.oyintare.dev/BzhlBg6Dljk0.jpg",
			},
			{
				id: "4",
				name: "Umeko.dev",
				tags: "front-end,back-end,react,api,pytorch",
				github_uri: "https://github.com/TareHimself/umeko-js-dashboard",
				demo_uri: "live|https://umeko.dev/",
				thumb: "https://files.oyintare.dev/BzhlBg6Dljk0.jpg",
			},
		];

		setProjects(result);

		return result;
	}, [projects, setProjects]);

	return [projects, fetchProjects];
}
