import type { BunFile } from "bun";
import type { ProxyKey } from "./types/proxy";
import { $path, $url, createGlobRouter } from "./utils";

export const urls = Array.from(
	createGlobRouter({
		dir: process.cwd() + "/store",
		include: [".schema"],
		options: {
			cwd: process.cwd(),
		},
	}).scanSync(),
).map($url);

export const refs = urls.map((url) => ({ [$path(url)]: Bun.file($path(url)) }));

export const proxy = refs.reduce(
	(acc, ref) => Object.assign(acc, ref),
	{} as {
		[k in ProxyKey]: BunFile;
	},
);

await Bun.write(
	"./types/proxy.d.ts",
	`export type ProxyKey = ${Object.keys(proxy)
		.map((key) => `'${key}'`)
		.join("|")}`,
);
