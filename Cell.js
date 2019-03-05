function Cell(x, y, rad) 
{
	this.x = x;
	this.y = y;
	this.rad = rad;
	this.adjacents = [];
	this.piece = 'n';

	this.draw = function()
	{
		fill(220, 20, 20)
		polygon(this.x, this.y, this.rad, 6)
		var ap = this.rad * sqrt(3)/2;
		noStroke();
		if(this.piece == 'w'){
			fill(255);
			ellipse(this.x, this.y, ap, ap);
		}else if(this.piece == 'b'){
			fill(0);
			ellipse(this.x, this.y, ap, ap);
		}
	}

	this.clicked = function (x,y) {
		var ap = this.rad * sqrt(3)/2;
		return dist(x, y, this.x, this.y) < ap;
	}

	this.isAdjacent = function (cell) {
		for (var i = 0; i < this.adjacents.length; i++) {
			if(this.adjacents[i] == cell) 
				return true;
		}
		return false;
	}

	this.place = function(piece){
		this.piece = piece
	}

	this.tryPlace = function (piece) {
		var canPlace = false;
		if((piece == 'w' && this.piece == 'b') || (piece == 'b' && this.piece == 'w')){
			for (var i = 0; i < this.adjacents.length; i++) {
				if(typeof(this.adjacents[i]) != 'undefined' && this.adjacents[i].piece == 'n'){
					canPlace = true;
					this.piece = piece;
				}
			}
		}

		return canPlace;
	}
	this.trySlide = function (piece, placed) {
		if(this.piece == 'n' && this.isAdjacent(placed)){
			this.piece = piece;
			return true;
		}
		return false;
	}

	this.setRightCell = function(cell)
	{
		this.adjacents[0] = cell;
	}
	this.setTopRightCell = function(cell)
	{
		this.adjacents[1] = cell;
	}
	this.setTopLeftCell = function(cell)
	{
		this.adjacents[2] = cell;
	}
	this.setLeftCell = function(cell)
	{
		this.adjacents[3] = cell;
	}
	this.setBottomLeftCell = function(cell)
	{
		this.adjacents[4] = cell;
	}

	this.setBottomRightCell = function()
	{
		this.adjacents[5] = cell;
	}
	this.getRightCell = function()
	{
		return this.adjacents[0];
	}
	this.getTopRightCell = function()
	{
		return this.adjacents[1];
	}
	this.getTopLeftCell = function()
	{
		return this.adjacents[2];
	}
	this.getLeftCell = function()
	{
		return this.adjacents[3];
	}
	this.getBottomLeftCell = function()
	{
		return this.adjacents[4];
	}
	this.getBottomRightCell = function()
	{
		return this.adjacents[5];
	}
	
}

function polygon(x, y, radius, npoints) {
	let angle = TWO_PI / npoints;
	beginShape();
	for (let a = 0; a < TWO_PI; a += angle) {
		let sx = x + cos(a-PI/2) * radius;
		let sy = y + sin(a-PI/2) * radius;
		vertex(sx, sy);
	}
	endShape(CLOSE);
}