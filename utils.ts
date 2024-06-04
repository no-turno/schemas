import type { Glob, GlobScanOptions } from "bun";

/**
 * Signal function to wrap a value in a signal.
 * @template T - The type of the value to be wrapped.
 * @param value - The value to be wrapped in a signal.
 * @returns The value wrapped in a signal.
 */
export const Signal = <T extends unknown>(value: T) => value;

/**
 * Function to create a new Glob instance.
 * @param pattern - The glob pattern to match files.
 * @param options - Optional glob scan options.
 * @returns An array containing the Glob instance and the options.
 */
export function createGlob(pattern: string, options?: GlobScanOptions) {
	const glob = new Bun.Glob(pattern);
	return [glob, options] as [Glob, GlobScanOptions];
}

/**
 * Function to create a glob router.
 * @param dir - The directory to scan for files.
 * @param include - An array of file extensions to include.
 * @param options - Optional glob scan options.
 * @returns A signal containing the router, scan function, and scanSync function.
 */
export function createGlobRouter({
	dir,
	include,
	options,
}: { dir: string; include: string[]; options: GlobScanOptions }) {
	const [glob, $] = createGlob(
		`**/{${include.map((v) => `*${v}`).join(",")}}`,
		options,
	);
	return Signal({
		router: new Bun.FileSystemRouter({
			dir: dir,
			style: "nextjs",
			fileExtensions: include,
		}),
		scan: () => glob.scan($),
		scanSync: () => glob.scanSync($),
	});
}

export default {
	/**
	 * Custom inspect function for the default export.
	 * @returns An empty object.
	 */
	[Bun.inspect.custom]: function () {
		return {};
	},
	routers: {},
	scripts: {},
};

export const $url = (path: string) =>
	Bun.pathToFileURL(process.cwd() + "/" + path);

export const $path = (path: URL) => Bun.fileURLToPath(path);
