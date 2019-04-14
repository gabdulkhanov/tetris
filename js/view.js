
		
	var View = function(canvas, ctnx, width, height) {
		this.canv = canvas;
		this.ctx = ctnx;
		this.canv.width = width;
		this.canv.height = height;
		this.canv.style.border = "1px solid black";
		this.ctx.lineWidth = 3;
		this.clr = ["rgb(45,60,200)","rgb(0,150,50)","rgb(170,0,40)","rgb(0,200,180)","rgb(100,50,150)"];

		this.clearCanvas = function clearCanvas() {
				this.ctx.fillStyle = "#fff";
				this.ctx.fillRect(0, 0, this.canv.width, this.canv.height);
			};	
			
		this.figuraCanvas = function figuraCanvas(mas, point_x, point_y, width) {
			
			//this.ctx.fillStyle = "rgb(0,0,200)";
			this.ctx.strokeStyle = "#fff";		
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
			this.ctx.strokeStyle = "#fff";
			for (let i = 2; i < 20; i++) {				
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
			this.poleCanvas(mas2, 30);
			this.figuraCanvas(mas1, ptx, pty, 30);
			this.ctx.font = "26px Arial";
			this.ctx.fillStyle = "#09f";
			this.ctx.fillText("Очки: " + n, 380, this.canv.height / 2);
		};
		
		this.view_gameOver = function gameover() {
			this.ctx.font = "italic 50px Arial";
			this.ctx.textAlign = "center";
			this.ctx.shadowColor = "#000";
			this.ctx.shadowOffsetX = 5;
			this.ctx.shadowOffsetY = 5;
			this.ctx.shadowBlur = 10;
			this.ctx.fillStyle = "#009";
			this.ctx.fillText("Game over", this.canv.width / 2, this.canv.height / 2);
		};
	}
