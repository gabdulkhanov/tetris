	
var View = function(canvas, ctnx, width, height) {
	
	this.canv = canvas;
	this.ctx = ctnx;
	this.canv.width = width;
	this.canv.height = height;
	this.canv.style.border = "1px solid black";
	this.ctx.lineWidth = 3;	
	this.clr = ["#090351","#1abf15","#0812d3","#ed8804","#f7ef04","#f7ef04"];

	this.clearCanvas = function clearCanvas() {
			this.ctx.fillStyle = "#fff";
			this.ctx.fillRect(0, 0, this.canv.width, this.canv.height);
		};	
		
	this.figuraCanvas = function figuraCanvas(mas, point_x, point_y, width) {			
		this.ctx.strokeStyle = "#000";		
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++){	
					for (let z = 0; z < this.clr.length; z++)
						if (mas[i][j] === z) this.ctx.fillStyle = this.clr[z];						
					if (mas[i][j] !== 0) {
						this.ctx.fillRect(point_x + j*width, point_y + i*width, width, width);
						this.ctx.strokeRect(point_x + j*width, point_y + i*width, width, width);	
					}							
				 }					
			}						
	};

	this.poleCanvas = function poleCanvas(mas, width) {				
		this.ctx.strokeStyle = "#000";		
		for (let i = 0; i < 20; i++) {				
			for (let j = 0; j < 12; j++) {
				for (let z = 0; z < this.clr.length; z++)
						if (mas[i][j] === z) this.ctx.fillStyle = this.clr[z];								
				if (mas[i][j] !== 0) {
						this.ctx.fillRect(j*width, i*width, width, width);
						this.ctx.strokeRect(j*width, i*width, width, width);
				 }				
			}
		}
	};

	this.otrisovka = function otrisovka(mas1, mas2, ptx, pty, n) {
		this.ctx.shadowOffsetX = 0;
		this.ctx.shadowOffsetY = 0;
		this.ctx.shadowBlur = 0;
		this.ctx.textAlign = "left";
		this.poleCanvas(mas2, 30);
		this.figuraCanvas(mas1, ptx, pty, 30);
		this.ctx.font = "italic 26px Arial";
		this.ctx.fillStyle = "#00f";
		this.ctx.fillText("Очки: " + n, 370, this.canv.height / 2);
		this.ctx.fillText("Управление: ←↑→↓", 370, this.canv.height / 2 + 50);	
		this.ctx.fillText("p - пауза", 370, this.canv.height / 2 + 100);			
	};
	
	this.message = function message(str, size) {
		this.ctx.font = "italic " + size + "px Arial";
		this.ctx.textAlign = "center";
		this.ctx.shadowColor = "#000";
		this.ctx.shadowOffsetX = 5;
		this.ctx.shadowOffsetY = 5;
		this.ctx.shadowBlur = 10;
		this.ctx.fillStyle = "#d00";
		this.ctx.fillText(str, this.canv.width / 2 - 50, this.canv.height / 2);
	};
	
}
