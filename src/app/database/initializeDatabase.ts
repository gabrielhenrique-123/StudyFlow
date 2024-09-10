import {type SQLiteDatabase} from "expo-sqlite"

export async function initializeDatabase(database:SQLiteDatabase){
	await database.execAsync(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			cpf TEXT NOT NULL,
			user TEXT NOT NULL,
			password TEXT NOT NULL
		);
	`)
}
