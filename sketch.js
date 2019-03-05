var board;
var toMove = 'w';
var stateGame = 'initial'
const RADIUS = 40;
function setup() {
	// body...
	createCanvas(innerWidth,innerHeight);
	board = new Board(250, 100, RADIUS, 7);
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
					placed = null;
					toMove = 'b'
					stateGame = 'placing'
				}
			}else{
				if(cell.trySlide('w', placed)){
					placed = null;
					toMove = 'w'
					stateGame = 'placing'
				}
			}
			break;

	}
}

