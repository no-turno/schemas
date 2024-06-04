// import { writeJsonSchema } from "./writeJsonSchema";

import Elysia from "elysia";
import { loadAssets } from "./loadAssets";
import { proxy } from "./entry.schemas";
import { renderToReadableStream } from "react-dom/server";

// writeJsonSchema("/home/runner/schemas/store/schemas/replit/config/index.schema")
//  writeJsonSchema("/home/runner/schemas/store/schemas/replit/ui/theme/index.schema")

export const app = new Elysia()
	.state("assets", loadAssets())
	.get("/", async ({ store }) => await renderToReadableStream(<div>{
		Object.keys(store.assets.routes).map(asset => <li key={btoa(asset)}>{asset}</li>)
	}</div>))
	.get("/store/schemas", () => proxy)
	.get("/store/*", async (ctx) =>
		await Bun.file(ctx.store.assets.match('/'+ ctx.params["*"])?.filePath!).json()
	);

if ("Bun" in globalThis) {
	const main = app.listen({
		hostname: "0.0.0.0",
	});
	console.log("%s", main.server?.url);
}
