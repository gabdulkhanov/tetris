	
class View {	
	
	constructor(canvas, context, width, height, size_cell = 30) {
		this.canvas = canvas;
		this.ctx = context;
		this.canvas.width = width;
		this.canvas.height = height;
		this.size_cell = size_cell;
		
		this.canvas.style.border = "1px solid black";
		this.ctx.lineWidth = 1;	
		this.clr = ["#090351","#0a4a08","#0812d3","#ed8804","#f7ef04","#f7ef04"];
	}
		
	
	clearCanvas() {
		this.ctx.fillStyle = "#fff";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.strokeStyle = "#0ff";
		this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
	}
	
	figureCanvas(arr, point_x, point_y) {			
		this.ctx.strokeStyle = "#000";
		
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr.length; j++){	
					for (let z = 0; z < this.clr.length; z++)
						if (arr[i][j] === z) this.ctx.fillStyle = this.clr[z];						
					if (arr[i][j] !== 0) {
						this.ctx.fillRect(point_x + j*this.size_cell, point_y + i*this.size_cell, this.size_cell, this.size_cell);
						this.ctx.strokeRect(point_x + j*this.size_cell, point_y + i*this.size_cell, this.size_cell, this.size_cell);	
					}							
				 }					
			}						
	}

	fieldCanvas(arr) {				
		this.ctx.strokeStyle = "#000";	
		
		for (let i = 0; i < arr.length; i++) {				
			for (let j = 1; j < arr[i].length-1; j++) {
				for (let z = 0; z < this.clr.length; z++)
						if (arr[i][j] === z) this.ctx.fillStyle = this.clr[z];								
				if (arr[i][j] !== 0) {
						this.ctx.fillRect(j*this.size_cell, i*this.size_cell, this.size_cell, this.size_cell);
						this.ctx.strokeRect(j*this.size_cell, i*this.size_cell, this.size_cell, this.size_cell);
				 }				
			}
		}
	}

	rendering(arr1, arr2, ptx, pty) {	
		this.fieldCanvas(arr2);
		this.figureCanvas(arr1, ptx, pty);			
	}


	colorFullLines(arr) {
		this.ctx.strokeStyle = "#000";
		this.ctx.fillStyle = "#bbb";
		var f;
		for (let i = 0; i < arr.length - 1 ; i++) {
			f = true;
			for (let j = 2; j < arr[i].length - 2; j++) {
				if (!arr[i][j]) f = false; 
			}
			if (f) {
				for (let j = 2; j < arr[i].length - 2; j++) {
					this.ctx.fillRect(j*this.size_cell, i*this.size_cell, this.size_cell, this.size_cell);
					this.ctx.strokeRect(j*this.size_cell, i*this.size_cell, this.size_cell, this.size_cell);
				}
			}
		}
	}
	
	
	message(str, size) {
		this.ctx.font = "italic " + size + "px Arial";		
		this.ctx.fillStyle = "#d00";
		this.ctx.fillText(str, this.canvas.width / 2, this.canvas.height / 2);
	}
	
	
	nextFigure(arr) {	
	  let nf = document.getElementById("nextfigure");
	  var innerHtml = "";
	
	  for (let i = 0; i < arr.length; i++) {		
		for (let j = 0; j < arr.length; j++) {
		  if (arr[i][j] === 0) innerHtml += '<div class="excel"></div>';
			else innerHtml += '<div class="excel active"></div>';
		}
		nf.innerHTML = innerHtml;	
		
	  }
	}
	
}



	
	

	
	

