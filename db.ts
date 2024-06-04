import { Database } from "bun:sqlite";
const dbSrc = Bun.pathToFileURL(process.cwd() + "/" + "db.sqlite");
const db = new Database(dbSrc.pathname, {
	create: true,
});

console.log(db);
