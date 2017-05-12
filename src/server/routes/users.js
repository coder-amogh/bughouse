const express = require('express');
const pool = require('../models/pool.js').pool;
const bcrypt = require('bcryptjs');
const authentication = require('../services/authenticator');
const glicko = require('glicko2');
const router = express.Router();

/* GET all users */
router.get('/', (req, res) => {
	pool.getConnection((err, connection) => {
		if (err) {
			connection.release();
			res.json({ code: 100, status: 'Error in connection database' });
			return;
		}
		connection.query('SELECT * FROM users', (err, rows) => {
			connection.release();
			if (!err) {
				res.json(rows);
			} else {
				console.log('Error while performing query');
			}
		});
		connection.on('error', err => {
			res.json({ code: 100, status: 'Error in connection database' });
		});
	});
});
/* GET a specific user by id */
router.get('/:user_id', (req, res) => {
	pool.getConnection((err, connection) => {
		if (err) {
			connection.release();
			res.json({ code: 100, status: 'Error in connection database' });
			return;
		}
		connection.query('SELECT * FROM USERS WHERE user_id = ?', req.params.user_id, (err, user) => {
			connection.release();
			delete user[0].password_hash;
			if (!err) {
				res.json(user);
			} else {
				console.log('Error while performing query');
			}
		});
	});
});
/* GET a specific user by username */
router.get('/username/:username', (req, res) => {
	pool.getConnection((err, connection) => {
		if (err) {
			connection.release();
			res.json({ code: 100, status: 'Error in connection database' });
			return;
		}
		connection.query('SELECT * FROM USERS WHERE username = ?', req.params.username, (err, user) => {
			connection.release();
			if (user.length > 0) delete user[0].password_hash;
			console.log(user);
			if (!err) {
				res.json(user);
			} else {
				console.log('Error while performing query');
			}
		});
	});
});
/* Create a new user */
router.post('/', (req, res) => {
	pool.getConnection((err, connection) => {
		if (err) {
			connection.release();
			res.json({ code: 100, status: 'Error in connection database' });
			return;
		}
		const hash = bcrypt.hashSync(req.body.password, 10);
		connection.query('INSERT INTO Users (username, password_hash) Values (?, ?)', [req.body.username, hash], (err, rows) => {
			connection.release();
			if (!err) {
				res.json(rows);
			} else {
				console.log('Error while performing query');
				res.status(500).send({ error: 'error' });
			}
		});
		connection.on('error', err => {
			res.json({ code: 100, status: 'Error in connection database' });
		});
	});
});

router.use(authentication);

/* Update player ratings */
router.post('/ratings', (req, res) => {
	pool.getConnection((err, connection) => {
		if (err) {
			connection.release();
			res.json({ code: 100, status: 'Error in connection database' });
			return;
		}
		connection.query('SELECT * FROM USERS WHERE user_id In(?, ?, ?, ?)', [req.body.user_id1, req.body.user_id2, req.body.user_id3, req.body.user_id4], (errUsers, users) => {
			if (!errUsers) {
				const settings = {
					tau: 0.5,
					rating: 1500,
					rd: 350,
					vol: 0.06
				};
				const ranking = new glicko.Glicko2(settings);
				let player1,
					player2,
					player3,
					player4,
					race,
					updateRatingsMode,
					updateRdMode;
				if (req.body.mode == 'bullet') {
					player1 = ranking.makePlayer(users[0].ratingBullet, users[0].rdBullet, 0.06);
					player2 = ranking.makePlayer(users[1].ratingBullet, users[1].rdBullet, 0.06);
					player3 = ranking.makePlayer(users[2].ratingBullet, users[2].rdBullet, 0.06);
					player4 = ranking.makePlayer(users[3].ratingBullet, users[3].rdBullet, 0.06);
					updateRatingsMode = 'ratingBullet';
					updateRdMode = 'rdBullet';
				} else if (req.body.mode == 'blitz') {
					player1 = ranking.makePlayer(users[0].ratingBlitz, users[0].rdBlitz, 0.06);
					player2 = ranking.makePlayer(users[1].ratingBlitz, users[1].rdBlitz, 0.06);
					player3 = ranking.makePlayer(users[2].ratingBlitz, users[2].rdBlitz, 0.06);
					player4 = ranking.makePlayer(users[3].ratingBlitz, users[3].rdBlitz, 0.06);
					updateRatingsMode = 'ratingBlitz';
					updateRdMode = 'rdBlitz';
				} else {
					player1 = ranking.makePlayer(users[0].ratingClassical, users[0].rdClassical, 0.06);
					player2 = ranking.makePlayer(users[1].ratingClassical, users[1].rdClassical, 0.06);
					player3 = ranking.makePlayer(users[2].ratingClassical, users[2].rdClassical, 0.06);
					player4 = ranking.makePlayer(users[3].ratingClassical, users[3].rdClassical, 0.06);
					updateRatingsMode = 'ratingClassical';
					updateRdMode = 'rdClassical';
				}
				if (req.body.winner == 'near') { // players 1 and 4 won
					race = ranking.makeRace([[player1, player4], [player2, player3]]);
				} else if (req.body.winner == 'far') { // players 2 and 3 won
					race = ranking.makeRace([[player2, player3], [player1, player4]]);
				} else { // game drawn
					race = ranking.makeRace([[player1, player2, player3, player4]]);
				}
				ranking.updateRatings(race);
				const updateString = 'UPDATE users SET ?? = CASE user_id WHEN ? THEN ROUND(?) WHEN ? THEN ROUND(?) WHEN ? THEN ROUND(?) WHEN ? THEN ROUND(?) END WHERE user_id IN (?,?,?,?)';
				const updateRatingsArgs = [updateRatingsMode, req.body.user_id1, player1.getRating(), req.body.user_id2, player2.getRating(), req.body.user_id3, player3.getRating(), req.body.user_id4, player4.getRating(), req.body.user_id1, req.body.user_id2, req.body.user_id3, req.body.user_id4];
				const updateRdArgs = [updateRdMode, req.body.user_id1, player1.getRd(), req.body.user_id2, player2.getRd(), req.body.user_id3, player3.getRd(), req.body.user_id4, player4.getRd(), req.body.user_id1, req.body.user_id2, req.body.user_id3, req.body.user_id4];
				connection.query(updateString, updateRatingsArgs, errRatings => {
					if (!errRatings) {
						connection.query(updateString, updateRdArgs, errRd => {
							connection.release();
							if (errRd) {
								console.log('Error while performing query');
							}
						});
					} else {
						console.log('Error while performing query');
					}
				});
			} else {
				console.log('Error while performing query');
			}
		});
		connection.on('error', err => {
			res.json({ code: 100, status: 'Error in connection database' });
		});
	});
});

module.exports = router;
