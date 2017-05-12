CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY NOT NULL,
	email TEXT NOT NULL UNIQUE,
	username VARCHAR(25) NOT NULL UNIQUE,
	password_hash CHAR(60) NOT NULL,
	title VARCHAR(2) NULL,
	rating_bullet INT NOT NULL DEFAULT 1500,
	rd_bullet INT NOT NULL DEFAULT 350,
	rating_blitz INT NOT NULL DEFAULT 1500,
	rd_blitz INT NOT NULL DEFAULT 350,
	rating_classical INT NOT NULL DEFAULT 1500,
	rd_classical INT NOT NULL DEFAULT 350
);
