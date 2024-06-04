import { createGlobRouter } from "./.config/bun.config";

export const loadAssets = () =>
	createGlobRouter({
		dir: process.cwd() + "/store",
		include: [".json"],
		options: {
			cwd: process.cwd(),
			onlyFiles: true,
		},
	}).router
