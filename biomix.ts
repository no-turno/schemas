
const jsonWorker = new Worker('./json-ls.mjs');

jsonWorker.addEventListener("open", () => {
	jsonWorker.postMessage(Bun.inspect({
		pattern: "./index.html"
	}))
})