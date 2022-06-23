import { useCallback, useState } from "react";
import { IApiProject } from "../types";

export function useProjectsApi(): [IApiProject[], () => Promise<IApiProject[]>] {

	const [projects, setProjects] = useState<IApiProject[]>([]);


	// currently uses sample data, will need to be updated in the future
	const fetchProjects = useCallback(async () => {
		const result: IApiProject[] = [{
			id: "1",
			name: "wallpaperz",
			tags: "desktop-app,back-end,react,electron",
			github: "https://github.com/TareHimself/wallpaper-app",
			demo: "https://umeko.dev/",
			thumb: "https://b.catgirlsare.sexy/V35bBVSwBqog.png",
			demo_prompt: "download"
		}, {
			id: "2",
			name: "Umeko.dev",
			tags: "front-end,back-end,react,api",
			github: "https://github.com/TareHimself/umeko-js-dashboard",
			demo: "https://umeko.dev/",
			thumb: "https://b.catgirlsare.sexy/ssoOOORV16qD.png",
			demo_prompt: "live"
		}];

		setProjects(result);

		return result;
	}, [projects, setProjects]);

	return [projects, fetchProjects];
}