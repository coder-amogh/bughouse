import React from 'react';

export default function AboutComponent() {
	const componentStyle = {
		marginTop: '2em'
	};

	return (
		<div className="container-fluid brighter-color" style={componentStyle}>
			<div className="col-md-12">
				<h3>About the Bughouse variant</h3>
				<p>
					Bughouse is a chess variant played on two chessboards by four players in teams of two. Each team member
					faces one opponent of the other team. Partners are next to each other and one player has black, while the
					other has white. Each player plays the opponent as in a standard chess game, with the exception of the rules
					specified below.
				</p>
				<br />
				<h3>Rules</h3>
				<p>
						If a player captures a piece, that piece is immediately passed to their partner. The partner keeps these
						pieces in
						reserve and may, instead of playing a regular move, place one of these pieces on the board (similar to shogi
						and crazyhouse). Pieces in reserve may be placed on any vacant square, including squares where the
						piece delivers check or checkmate. However, pawns may not be dropped on the first or last rank. Dropped
						pawns may promote, but all promoted pawns convert back to pawns when captured. A pawn placed on the second
						rank may move two squares on its first move.
					</p>
				<p>
						Bughouse chess is usually played with chess clocks to prevent players from waiting indefinitely for a piece.
						This is why this website only allows timed games. At the start of the game, the clock starts for the players
						with the white pieces.
					</p>
				<p>
						The match ends when either of the games on the two boards ends. A game is won when one player gets
						checkmated, resigns, or forfeits on time. The match can be drawn by agreement or when two players run out of
						time or are checkmated simultaneously.
					</p>
				<br />
			</div>
			<div className="col-md-12">
				<h3>About the Site</h3>
				<p>
					This website is designed for the purpose of for chess players to play <a href="https://en.wikipedia.org/wiki/Bughouse_chess" target="_blank">Bughouse chess</a>. It is written
					with an Angular.js + jQuery + Bootstrap 3 front-end with a Node.js (Express.js) + Socket.io + MySQL (Node-MySQL) backend. This
					site also utilizes heavily modified versions of jhlywa&apos;s <a href="https://github.com/jhlywa/chess.js/blob/master/README.md" target="_blank">Chess.js</a> and
					the <a href="http://chessboardjs.com/" target="_blank">chessboard.js</a> library. The game notation is specified by the
					<a href="http://bughousedb.com/Lieven_BPGN_Standard.txt" target="_blank">Bughouse Portable Game Notation standard</a>.
				</p>
				<br />
			</div>
			<br />
			<div className="col-md-12">
				<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
					<input type="hidden" name="cmd" value="_s-xclick" />
					<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----">
						<input type="image" src="../../app/static/img/assets/btn_donate.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
							<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
						</input>
					</input>
				</form>
			</div>
		</div>
	);
}
