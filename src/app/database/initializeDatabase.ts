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
		CREATE TABLE IF NOT EXISTS tests (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			subject TEXT NOT NULL,
			date TEXT NOT NULL
		);
		CREATE TABLE IF NOT EXISTS assingments (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			subject TEXT NOT NULL,
			description TEXT NOT NULL,
			date TEXT NOT NULL
		);
	`)
}
