import { proxy } from "./entry.schemas";
import type { ProxyKey } from "./types/proxy";

export const writeJsonSchema = async (path: ProxyKey) =>
	await Bun.write('store', await proxy[path].text());
