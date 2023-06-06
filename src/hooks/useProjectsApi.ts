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
				name: "Wallpaperz",
				tags: [
					"typescript",
					"desktop-app",

					"back-end",
					"react",
					"electron",
				],
				github_uri: "https://github.com/TareHimself/wallpaper-app",
				demo_uri:
					"Download|https://github.com/TareHimself/wallpaper-app/releases/latest",
				thumb: "https://raw.githubusercontent.com/TareHimself/wallpaper-app/main/github-assets/app-example1.png",
				description:
					"A full-stack wallpaper app made with typescript, electron, express and sqlite3",
			},
			{
				id: "2",
				name: "Osu! AI",
				tags: ["python", "numpy", "opencv", "pytorch"],
				github_uri: "https://github.com/TareHimself/osu-ai",
				demo_uri: "Video|https://www.youtube.com/watch?v=YEoSrtow8Qw",
				thumb: "https://raw.githubusercontent.com/TareHimself/osu-ai/master/assets/good-play-relax.png",
				description: "Teaching a pytorch model to play the game Osu!",
			},
			{
				id: "3",
				name: "Manga Translator",
				tags: ["python", "numpy", "opencv", "pytorch"],
				github_uri: "https://github.com/TareHimself/manga-translator",
				demo_uri: "",
				thumb: "https://raw.githubusercontent.com/TareHimself/manga-translator/master/ja_a_certain_scientific_accelerator_1_001_converted.png",
				description:
					"A manga translator made using Yolov8 , OpenCV and DeepFillV2",
			},
			{
				id: "4",
				name: "Umeko",
				tags: ["typescript", "front-end", "back-end", "api", "react"],
				github_uri: "https://github.com/TareHimself/umeko-js",
				demo_uri: "Website|https://umeko.dev/",
				thumb: "https://files.oyintare.dev/5uAsW3dxqPQv.png",
				description: "A full-stack discord bot written in typescript",
			},
			{
				id: "5",
				name: "Music App",
				tags: [
					"typescript",
					"desktop-app",
					"electron",
					"sqlite",
					"react",
				],
				github_uri: "https://github.com/TareHimself/music-app",
				demo_uri: "",
				thumb: "https://raw.githubusercontent.com/TareHimself/music-app/master/.github/sample-01.png",
				description:
					"A music app that has a library, playback and imports from external sources",
			},
		];

		setProjects(result);

		return result;
	}, [setProjects]);

	return [projects, fetchProjects];
}
