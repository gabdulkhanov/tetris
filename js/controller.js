
window.onload = function() {
	var timer, timeout;
	var 
		pt_x = 60,
		fps = 2,
		pt_y = n_Line = rnd_color = 0,
		rnd = 4,		
		lBtn = rBtn = stolknovenie_y = false,		
		canv = document.getElementById('tetris'),	
		ctx = canv.getContext("2d"),
		start = document.getElementById('start');
		
	
	var md = new Model();	
	var vw = new View(canv, ctx, 600, 600);	
	
	var figura = [
					 [[0,0,0,0],
					  [0,2,2,2],
					  [0,0,0,2],
					  [0,0,0,0]],
					  
					 [[0,0,0,0],
					  [2,2,2,0],
					  [2,0,0,0],
					  [0,0,0,0]],
					  
					 [[0,0,0,0],
					  [0,2,2,2],
					  [0,0,2,0],
					  [0,0,0,0]],

					 [[0,0,0,0],
					  [2,2,2,2],
					  [0,0,0,0],
					  [0,0,0,0]],
					  
					 [[0,0,0,0],
					  [0,2,2,0],
					  [0,2,2,0],
					  [0,0,0,0]],
					  
					 [[0,0,0,0],
					  [0,2,2,0],
					  [2,2,0,0],
					  [0,0,0,0]],
					
					 [[0,0,0,0],
					  [2,2,0,0],
					  [0,2,2,0],
					  [0,0,0,0]]];		
	
	var pole = [[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1],
				[1,1,1,1,1,1,1,1,1,1,1,1]];

	vw.otrisovka(figura[rnd], pole, pt_x, pt_y, n_Line);
	
	
	start.onclick = function() {			
		
		start.disabled = true;
		step();	
	
		window.onkeydown = function() {			
				if ((!md.isRotate(figura[rnd],pole,pt_x,pt_y))&&(event.keyCode == 38)) 
				{
					vw.clearCanvas();
					figura[rnd] = md.rotate90(figura[rnd]);
					pt_x = md.instanceRect(figura[rnd],pole,pt_x,pt_y, lBtn, rBtn);				
					vw.otrisovka(figura[rnd], pole, pt_x, pt_y, n_Line);
				}
				if ((event.keyCode == 37)&&(!md.stolknovenie_x(figura[rnd],pole,pt_x,pt_y,-1))&&(!md.gameOver(pole)))  
				{
					lBtn = true;
					rBtn = false;
					vw.clearCanvas();
					pt_x -= 30;	
					vw.otrisovka(figura[rnd], pole, pt_x, pt_y, n_Line);			
				}
				
				if ((event.keyCode == 39)&&(!md.stolknovenie_x(figura[rnd],pole,pt_x,pt_y,1))&&(!md.gameOver(pole)))  
				{
					lBtn = false;
					rBtn = true;
					vw.clearCanvas();
					pt_x += 30;
					vw.otrisovka(figura[rnd], pole, pt_x, pt_y, n_Line);
				}
				if ((event.keyCode == 40)&&(!md.gameOver(pole)))  fps = 20;
		};
		
		window.onkeyup = function() {				
				if ((event.keyCode == 40)&&(!md.gameOver(pole)))  fps = 2;
		};
	}
	
	function step() {		
		
		if (!md.gameOver(pole)) {
			vw.clearCanvas();		
			
			timeout = setTimeout(function() {	
				timer = window.requestAnimationFrame(step);
				if (!stolknovenie_y) pt_y += 30;			
			}, 1000 / fps);	

			vw.otrisovka(figura[rnd], pole, pt_x, pt_y, n_Line);
			
			if (stolknovenie_y) {
				
				md.update_pole(figura[rnd], pole, pt_x, pt_y);
				rnd_color = Math.ceil(Math.random()*4)+1;				
				
				for (let elem = 0; elem < figura.length; elem++)
					for (let m = 0; m < 4; m++)
						for (let n = 0; n < 4; n++)
							if (figura[elem][m][n] !== 0) figura[elem][m][n] = rnd_color;					
					
					n_Line += md.line(pole);						
					stolknovenie_y = false;
					pt_x = 60;
					pt_y = 0;					
					rnd = Math.floor(Math.random()*figura.length);					
				}
			stolknovenie_y = md.stolknovenie(figura[rnd], pole, pt_x, pt_y);	
		}
		else {					
			vw.clearCanvas();
			vw.otrisovka(figura[rnd], pole, pt_x, pt_y, n_Line);
			vw.view_gameOver();
			window.cancelAnimationFrame(timer);
			clearTimeout(timeout);	
		}
	};	
	
};


