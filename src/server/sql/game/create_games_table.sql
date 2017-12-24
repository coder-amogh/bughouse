CREATE TABLE IF NOT EXISTS games (
	id TEXT PRIMARY KEY NOT NULL,
	moves TEXT NULL,
	left_fen TEXT NOT NULL DEFAULT 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
	right_fen TEXT NOT NULL DEFAULT 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
	left_reserve_white TEXT NULL,
	left_reserve_black TEXT NULL,
	right_reserve_white TEXT NULL,
	right_reserve_black TEXT NULL,
	left_promoted_pieces TEXT NOT NULL DEFAULT '',
	right_promoted_pieces TEXT NOT NULL DEFAULT '',
	left_last_move TEXT NULL DEFAULT '[]',
	right_last_move TEXT NULL DEFAULT '[]',
	left_color_to_play TEXT NULL DEFAULT 'white',
	right_color_to_play TEXT NULL DEFAULT 'white',
	minutes SMALLINT NOT NULL DEFAULT 5,
	increment SMALLINT NOT NULL DEFAULT 5,
	rating_range TEXT NULL DEFAULT '0,3000',
	mode TEXT  NOT NULL DEFAULT 'Casual',
	status TEXT NOT NULL DEFAULT 'open',
	timestamp TIMESTAMP NOT NULL,
	left_last_time BIGINT NULL,
	right_last_time BIGINT NULL,
	clocks TEXT NULL DEFAULT '0,0,0,0',
	termination TEXT NULL,
	join_random BOOLEAN NULL DEFAULT TRUE,
	resign_state TEXT NULL DEFAULT '0,0,0,0',
	draw_state TEXT NULL DEFAULT '0,0,0,0',
	player1 INT NULL REFERENCES users (id),
	player2 INT NULL REFERENCES users (id),
	player3 INT NULL REFERENCES users (id),
	player4 INT NULL REFERENCES users (id),
	player1_rating INT NULL,
	player2_rating INT NULL,
	player3_rating INT NULL,
	player4_rating INT NULL
);
