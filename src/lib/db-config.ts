import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" });

let db: ReturnType<typeof drizzle> | undefined;

export function getDb() {
	if (!db) {
		const databaseUrl = process.env.NEON_DATABASE_URL;

		if (!databaseUrl) {
			throw new Error("NEON_DATABASE_URL is not configured");
		}

		db = drizzle(neon(databaseUrl));
	}

	return db;
}
