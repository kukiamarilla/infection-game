var board;
var toMove = 'w';
var stateGame = 'initial'
var placed;
var countSpecial = 0;
const BOARD_SIZE = 4;
const RADIUS = 40;

function setup() {
	// body...
	createCanvas(innerWidth,innerHeight);
	board = new Board(250, 100, RADIUS, BOARD_SIZE);
	board.buildBoard();
}

function draw() {
	createCanvas(innerWidth,innerHeight);
	background(0);
	board.draw();
	var ap = RADIUS * sqrt(3)/2;
	switch(stateGame){
		case 'initial':
			if(toMove == 'w'){
				fill(255);
			}else{
				fill(0)
			}
			break;
		case 'placing':
			if(toMove == 'w'){
				fill(255);
			}else{
				fill(0)
			}
			break;
		case 'sliding':
			if(toMove == 'w'){
				fill(0);
			}else{
				fill(255)
			}
			break;
		case 'special':
			if(toMove == 'w'){
				fill(0);
			}else{
				fill(255)
			}
			break;
	}
	ellipse(mouseX, mouseY, ap, ap)
	fill(255)
	if(toMove == 'w'){
		text("Turno de las blancas", 50, 50)
	}else{
		text("Turno de las negras", 50, 50)
	}
}

function mouseReleased() {
	var cell;
	for (var i = 0; i < board.cells.length; i++) {
		if(board.cells[i].clicked(mouseX, mouseY)){
			cell = board.cells[i];
		}
	}
	if(cell != null){
		play(cell);
	}
}

function play(cell) {
	switch(stateGame){
		case 'initial':
			if(toMove == 'w'){
				cell.place('w')
				toMove = 'b'
			}else{
				cell.place('b')
				toMove = 'w'
			}
			stateGame = 'placing'
			break;

		case 'placing':
			if(toMove == 'w'){
				if(cell.tryPlace('w')){
					placed = cell;
					stateGame = 'sliding'
				}
			}else{
				if(cell.tryPlace('b')){
					placed = cell;
					stateGame = 'sliding'
				}
			}
			break;

		case 'sliding':
			if(toMove == 'w'){
				if(cell.trySlide('b', placed)){
					toMove = 'b'
					stateGame = 'placing'
					if(placed.hasSpecial('w')){
						stateGame = 'special'
						toMove = 'w'
					}
					placed = null;
				}
			}else{
				if(cell.trySlide('w', placed)){
					toMove = 'w'
					stateGame = 'placing'
					if(placed.hasSpecial('b')){
						stateGame = 'special'
						toMove = 'b'
					}
					placed = null;
				}
			}
			break;
		case 'special':
			
			if(toMove == 'w'){
				if(cell.place('b'))
					countSpecial--
				if(countSpecial == 0){
					stateGame = 'placing'
					toMove = 'b'
				}
			}else{
				if(cell.place('w'))
					countSpecial--
				if(countSpecial == 0){
					stateGame = 'placing'
					toMove = 'w'
				}
			}
			break;
	}
}

