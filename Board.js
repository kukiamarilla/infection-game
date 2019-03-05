function Board(x, y, rad, size) {
	this.cells = []
	this.x = x;
	this.y = y;
	this.rad = rad
	this.size = size
	this.buildBoard = function()
	{
		for (var i = 0; i < this.size; i++) {

			for (var j = 0; j < this.size; j++) {
				cell = new Cell(this.x + this.rad * (2 * j +  i), this.y + (2*this.rad * i)*0.9, this.rad);
				this.cells.push(cell);
				if(i > 0){
					target = this.cells[this.map(i-1, j)]
					cell.setTopLeftCell(target)
					target.setBottomRightCell(cell)
					if(j < this.size - 1){
						target = this.cells[this.map(i-1, j+1)]
						cell.setTopRightCell(target)
						target.setBottomLeftCell(cell)
					}
				}
				if(j > 0){
					target = this.cells[this.map(i, j-1)]
					cell.setLeftCell(target)
					target.setRightCell(cell)
				}

			}

		}

	}

	this.map = function(x, y)
	{
		return x * this.size + y;
	}

	this.draw = function()
	{
		for (var i = 0; i < this.cells.length; i++) {
			this.cells[i].draw();
		}
		fill(255)
		rect(this.x, this.y - 2 * this.rad , (this.size - 1)*2 * this.rad, this.rad/2)
		rect(this.x + (this.size-1) * this.rad, this.y + (2*this.rad * (this.size - 1))*0.9 + this.rad + 10, (this.size - 1) * 2 * this.rad, this.rad/2)
	}
}