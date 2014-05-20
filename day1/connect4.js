(function (){
	var ROWS = 6;
	var COLS = 7;

	var ROW_HEIGHT = 80;
	var COL_WIDTH = 80;

	var styleMap = {
		0:"unset",
		1:"player1",
		2:"player2"
	}

	function Piece(row, col, parentEl, game){
		this.row = row;
		this.col = col;
		this.game = game;
		this.player = 0;
		//console.log("building piece", this.row, this.col)

		this.pieceEl = document.createElement("div");
		parentEl.appendChild(this.pieceEl);
		this.pieceEl.classList.add("piece");
		this.pieceEl.classList.add("unset");
		this.pieceEl.style.width =  "80px";
		this.pieceEl.style.height = "80px";

		var boardHeight = ROW_HEIGHT * ROWS;
		this.pieceEl.style.left = this.col * COL_WIDTH + "px";
		this.pieceEl.style.top = boardHeight - ((this.row+1) * ROW_HEIGHT) + "px";

		this.pieceEl.addEventListener("click", this.clickedPiece.bind(this));
	}

	Piece.prototype.clickedPiece = function(evt){
		//console.log("clicked", this.row, this.col);
		this.game.clickedColumn(this.col);
	}

	Piece.prototype.setPlayer = function(player){
		this.player = player;
		console.log("setting piece ", this.row, this.col, " to player ", this.player);
		this.removeStyle();
		var style = styleMap[player];
		this.pieceEl.classList.add(style);
		//try changing colour when player is set.
		//if(this.player===1) this.pieceEl.style.background = "red";
		//else if(this.player===2) this.pieceEl.style.background = "blue";
	}

	Piece.prototype.removeStyle = function(){
		for(var player in styleMap){
			var style = styleMap[player];
			this.pieceEl.classList.remove(style);
		}
	}

	function Game(el){
		console.log("Building game");

		this.active = true;

		this.activePlayer = 1;

		this.boardEl = document.createElement("div");
		this.boardEl.classList.add("board");

		el.appendChild(this.boardEl);

		this.boardEl.style.width = COLS * COL_WIDTH + "px";
		this.boardEl.style.height = ROWS * ROW_HEIGHT + "px";

		this.messageEl = document.createElement("div");
		el.appendChild(this.messageEl);
		this.messageEl.classList.add("message");

		this.setupBoard();
	}

	Game.prototype.setupBoard = function(){
		this.pieces = [];
		for(var row=0; row<ROWS; row++){
			this.pieces[row] = [];
			for(var col=0; col<COLS; col++){
				var piece = new Piece(row, col, this.boardEl, this);
				this.pieces[row][col] = piece;
			}
		}
	}

	Game.prototype.clickedColumn = function(col){
		if(this.active===false){
			this.setupBoard();
			this.active = true;
			this.activePlayer = 1;
			this.messageEl.innerHTML = "";
			return;
		}
		//console.log("clicked column", col);
		for(var row=0; row<ROWS; row++){
			var piece = this.pieces[row][col];
			if(piece.player===0){
				piece.setPlayer(this.activePlayer);
				this.checkWin(row, col, this.activePlayer);
				this.switchActivePlayer();
				return;
			}
		}
	}

	Game.prototype.checkWin = function(checkRow, checkCol, player){
		//check vertical win
		var vStreak = 0 ;
		for(var row=0; row<ROWS; row++){
			var piece = this.pieces[row][checkCol];
			if(piece.player === player){
				vStreak++;
			} else{
				vStreak = 0;
			}

			if(vStreak===4){
				console.log("Player " + player + " won!");
				this.messageEl.innerHTML = "Player " + player + " won!";
				this.active = false;
				//alert("Player " + player + " won!");
			}
		}

		//check horizontal win
		var hStreak = 0 ;
		for(var col=0; col<COLS; col++){
			var piece = this.pieces[checkRow][col];
			if(piece.player === player){
				hStreak++;
			} else{
				hStreak = 0;
			}

			if(hStreak===4){
				console.log("Player " + player + " won!");
				this.messageEl.innerHTML = "Player " + player + " won!";
				this.active = false;
				//alert("Player " + player + " won!");
			}
		}
		//check diagonal win
		var dUpRtStreak = 0 ;
		var URflag = false;
		var dDnLfStreak = 0 ;
		var DLflag = false;
		var dUpLfStreak = 0 ;
		var ULflag = false;
		var dDnRtStreak = 0 ;
		var DRflag = false;

		for (var cnt=1; cnt<4; cnt++){
			//up right
			if(((checkCol+cnt)<COLS) && ((checkRow+cnt)<ROWS)){
				var piece1 = this.pieces[checkRow+cnt][checkCol+cnt];
				if(piece1.player === player){
					dUpRtStreak++;
				} else if ((piece1.player !== 0) && !URflag){
					URflag = !URflag;
				} else if((piece1.player !== 0) && URflag){
					dUpRtStreak = 0;
				}
			}
			//dn left
			if(((checkCol-cnt)>=0) && ((checkRow-cnt)>=0)){
				var piece2 = this.pieces[checkRow-cnt][checkCol-cnt];
				if(piece2.player === player){
					dDnLfStreak++;
				} else if ((piece2.player !== 0) && !DLflag){
					URflag = !URflag;
				} else if((piece2.player !== 0) && DLflag){
					dDnLfStreak = 0;
				}
			}

			//up left
			if(((checkCol-cnt)>=0) && ((checkRow+cnt)<ROWS)){
				var piece3 = this.pieces[checkRow+cnt][checkCol-cnt];
				if(piece3.player === player){
					dUpLfStreak++;
				} else if ((piece3.player !== 0) && !ULflag){
					URflag = !URflag;
				} else if((piece3.player !== 0) && ULflag){
					dUpLfStreak = 0;
				}
			}
			//dn right
			if(((checkCol+cnt)<COLS) && ((checkRow-cnt)>=0)){
				var piece4 = this.pieces[checkRow-cnt][checkCol+cnt];
				if(piece4.player === player){
					dDnRtStreak++;
				} else if ((piece4.player !== 0) && !DRflag){
					URflag = !URflag;
				} else if((piece4.player !== 0) && DRflag){
					dDnRtStreak = 0;
				}
			}
			if(((dUpLfStreak+dDnRtStreak)===3)||((dUpRtStreak+dDnLfStreak)===3)){
				console.log("Player " + player + " won!");
				this.messageEl.innerHTML = "Player " + player + " won!";
				this.active = false;
				//alert("Player " + player + " won!");				
			}
			//dn right
		}
	}

	Game.prototype.switchActivePlayer = function(){
		if(this.activePlayer===1){
			this.activePlayer=2;
		} else if (this.activePlayer===2){
			this.activePlayer=1;
		}
	}

	window.addEventListener("DOMContentLoaded", function(){
		var containerEl = document.getElementById("game");
		new Game(containerEl);
	})
})()