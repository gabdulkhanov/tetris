
window.onload = function() {
	
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
					  [0,0,0,0]],
					  
					  [[0,0,0,0],
					   [2,2,2,2],
					   [2,0,2,0],
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
	
	
	var timer, timeout;
	var
		max_k = 20, /***максимальное кол-во очков***/
		fps = 2,
		pt_x = 90,
		pt_y = 0,
		rnd_color = 0,
		rnd = Math.floor( Math.random()*figura.length ), /***случайная фигура***/	
		start = pause = stolknovenie_y = false,		
		canv = document.getElementById('tetris'),	
		ctx = canv.getContext("2d");
	
	var md = new Model();	
	var vw = new View(canv, ctx, 620, 600);	
	
	vw.message("Нажмите ЛКМ, чтобы начать игру", 30);	
	
	window.onkeydown = function(event) {			
			if ((!md.isRotate(figura[rnd],pole,pt_x,pt_y))&&(event.keyCode == 38) && !pause) 
			{
				vw.clearCanvas();				
				if (!md.instanceRect(figura[rnd], pole, pt_x, pt_y)) figura[rnd] = md.rotate90(figura[rnd]);				
				vw.otrisovka(figura[rnd], pole, pt_x, pt_y, md.getset_line.a);				
			}
			if ((event.keyCode == 37)&&(!md.stolknovenie_x(figura[rnd],pole,pt_x,pt_y,-1))&&(!md.gameOver(pole) && !md.you_win(max_k)) && !pause)  
			{
				vw.clearCanvas();
				pt_x -= 30;	
				vw.otrisovka(figura[rnd], pole, pt_x, pt_y, md.getset_line.a);				
			}
			
			if ((event.keyCode == 39)&&(!md.stolknovenie_x(figura[rnd],pole,pt_x,pt_y,1))&&(!md.gameOver(pole) && !md.you_win(max_k)) && !pause)  
			{
				vw.clearCanvas();
				pt_x += 30;
				vw.otrisovka(figura[rnd], pole, pt_x, pt_y, md.getset_line.a);				
			}
			if ((event.keyCode == 40)&&(!md.gameOver(pole) && !md.you_win(max_k)))  fps = 20;
			
			if (event.keyCode == 80) {
				pause = !pause;
				step();
			}
	};
	
	window.onkeyup = function(event) {				
		if ((event.keyCode == 40)&&(!md.gameOver(pole) && !md.you_win(max_k)))  fps = 2;
	};
	
	
	function step() {		
		
		if (!md.gameOver(pole) && !md.you_win(max_k) && !pause) {
			vw.clearCanvas();				
			
			timeout = setTimeout(function() {	
				timer = window.requestAnimationFrame(step);
				stolknovenie_y = md.stolknovenie(figura[rnd], pole, pt_x, pt_y);
				if (!stolknovenie_y) pt_y += 30;			
			}, 1000 / fps);	

			vw.otrisovka(figura[rnd], pole, pt_x, pt_y, md.getset_line.a);				
			
			if (stolknovenie_y) {
				
				md.update_pole(figura[rnd], pole, pt_x, pt_y);
				rnd_color = Math.round(Math.random()*3)+2;				
				
				for (let elem = 0; elem < figura.length; elem++)
					for (let m = 0; m < 4; m++)
						for (let n = 0; n < 4; n++)
							if (figura[elem][m][n] !== 0) figura[elem][m][n] = rnd_color;	
						
					md.line(pole);								
					stolknovenie_y = false;					
					pt_x = 90;
					pt_y = 0;					
					rnd = Math.floor(Math.random()*figura.length);					
				}
		}
		else if (pause) {
			vw.message("Pause", 40);
			window.cancelAnimationFrame(timer);
			clearTimeout(timeout);	
		}
		else {					
			vw.clearCanvas();
			vw.otrisovka(figura[rnd], pole, pt_x, pt_y, md.getset_line.a);
			if (md.gameOver(pole)) vw.message("Game over", 30);		
			if (md.you_win(max_k)) vw.message("You win!", 30);		
			window.cancelAnimationFrame(timer);
			clearTimeout(timeout);	
		}
	};
	
	/*****************Вызываем*/
	
	
	canv.onclick = function() {		
		if (!start) {
			start = true;
			step();			
		}
		else alert("Пауза");
	}
	

		
};


