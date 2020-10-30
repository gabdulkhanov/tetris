
window.onload = function() {	
	
	var figura = [
					 [[0,0,0,0],
					  [0,2,2,0],
					  [0,2,0,0],
					  [0,2,0,0]],
					   
					 [[0,0,0,0],
					  [0,2,2,0],
					  [0,0,2,0],
					  [0,0,2,0]],
					  
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
					  [0,0,0,0]]  ];	
	
	var pole = [[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
	
	
	var timer, timeout;
	var
		k = 0,
		size_field = 1, /***размер поля***/
		max_k = 20, /***максимальное кол-во очков***/
		fps = 2,
		pt_x = 180,
		pt_y = 0,
		rnd_color = 0,
		rnd = Math.floor( Math.random()*figura.length ), /***случайная фигура***/
		nextrnd = Math.floor( Math.random()*figura.length ),
		start = pause = stolknovenie_y = false,		
		canvas = document.getElementById('tetris'),	
		ctx = canvas.getContext("2d");
		

	
	pt_x *= size_field;
	
	var music = new Audio('Kalimba.mp3');	
	var new_game = document.getElementById('new_game');
	var level = document.getElementById('level');
	
	var left = document.getElementById('left');
	var right = document.getElementById('right');
	var up = document.getElementById('up');
	var down = document.getElementById('down');
	var btn_pause = document.getElementById('pause');
	
	
	
	var md = new ModelClass( 30 * size_field );	
	var vw = new View( canvas, ctx, 450 * size_field, 600 * size_field, 30 * size_field );	
	
	
	
	vw.clearCanvas();
	vw.rendering( figura[rnd], pole, pt_x, pt_y );
	vw.nextFigure(figura[nextrnd]);
	
	
	function gameOver(arr) {			
		for (let n = 2; n < arr[2].length - 2; n++) {			
			if (arr[2][n]) return true;
		}		
		return false;
	}	
	
	function you_win(q, max_q) {
		if ( q >= max_q ) return true;
		else return false;
	}
	
		
	/****УПРАВЛЕНИЕ******/
	
	/*****ВВЕРХ ПОВОРОТ*****/
	function rotate_figure() {
		if (!gameOver(pole) && !you_win(k, max_k) && !pause && start) {
			vw.clearCanvas();				
			if (!md.instanceRect(figura[rnd], pole, pt_x, pt_y, 0)) figura[rnd] = md.rotate90(figura[rnd]);				
			
			else if (!md.instanceRect(figura[rnd], pole, pt_x, pt_y, -1)) {			
				pt_x -= 30 * size_field;
				figura[rnd] = md.rotate90(figura[rnd]);
			}			
			else if (!md.instanceRect(figura[rnd], pole, pt_x, pt_y, -2)) {				
				pt_x -= 60 * size_field;
				figura[rnd] = md.rotate90(figura[rnd]);
			}	
			
			
			else if (!md.instanceRect(figura[rnd], pole, pt_x, pt_y, 1)) {				
				pt_x += 30 * size_field;
				figura[rnd] = md.rotate90(figura[rnd]);
			}			
			else if (!md.instanceRect(figura[rnd], pole, pt_x, pt_y, 2)) {				
				pt_x += 60 * size_field;
				figura[rnd] = md.rotate90(figura[rnd]);
			}				
			
			vw.rendering(figura[rnd], pole, pt_x, pt_y);					
		}
	}
	
	/*****ВНИЗ УСКОРЕНИЕ*****/
	function down_figure() {
		if (!gameOver(pole) && !you_win(k, max_k) && !pause && start) {
			fps = 20;
		}
	}
	
	/*****ОТМЕНА УСКОРЕНИЯ*****/
	function cancel_down_figure() {
		if (!gameOver(pole) && !you_win(k, max_k) && !pause && start) {
			fps = 2;
		}
	}
	
	
	/*****ВЛЕВО*****/
		function left_figure() {
			if (!gameOver(pole) && !you_win(k, max_k) && !pause && start) {
				if (!md.collision_x( figura[rnd], pole, pt_x, pt_y, -1 )) {
					vw.clearCanvas();
					pt_x -= 30 * size_field;	
					vw.rendering( figura[rnd], pole, pt_x, pt_y );	
				}
			}
		}
	
	
	
	/*****ВПРАВО*****/
	function right_figure() {
			if (!gameOver(pole) && !you_win(k, max_k) && !pause && start) {
				if (!md.collision_x( figura[rnd], pole, pt_x, pt_y,1 )) {
					vw.clearCanvas();
					pt_x += 30 * size_field;	
					vw.rendering( figura[rnd], pole, pt_x, pt_y );	
				}
			}
		}
		
	
	
	
	/***Event buttons***/
	
	up.onclick = function() { rotate_figure(); }
	left.onclick = function() { left_figure(); }
	right.onclick = function() { right_figure(); }
	down.onmousedown = function() { down_figure(); }
	down.onmouseup = function() { cancel_down_figure(); }
	btn_pause.onclick = function() {
		if (start && (!gameOver(pole)) && (!you_win(k, max_k))) {
				pause = !pause;
				step();
			}
	}
	
	
	
	/***Event keys***/	
	
	window.onkeydown = function(event) {			
			
			if (event.keyCode == 38) rotate_figure();				
			
			if (event.keyCode == 37) left_figure();			
			
			if (event.keyCode == 39) right_figure();			
			
			if (event.keyCode == 40) down_figure();
			
			
			/***пауза***/
			if ((event.keyCode == 80) && start && (!gameOver(pole)) && (!you_win(k, max_k))) {
				pause = !pause;
				step();
			}		
	};
	
		
	window.onkeyup = function(event) {				
		if (event.keyCode == 40) cancel_down_figure();
	};
	
	
	
	
	/******АНИМАЦИЯ*******/
	
	function step() {		
		
		if (!gameOver(pole) && !you_win(k, max_k) && !pause && start) {
			
			music.play();
			vw.clearCanvas();				
			
			timeout = setTimeout(function() {	
				timer = window.requestAnimationFrame(step);
				stolknovenie_y = md.collision( figura[rnd], pole, pt_x, pt_y );
				if (!stolknovenie_y) pt_y += 30 * size_field;			
			}, 1000 / fps);	

			vw.rendering(figura[rnd], pole, pt_x, pt_y);		
			level.innerHTML = "Очки: " + k;
			
			
			if (stolknovenie_y) {
				
				md.update_field(figura[rnd], pole, pt_x, pt_y);
				rnd_color = Math.round(Math.random()*3)+2;				
				
				for (let elem = 0; elem < figura.length; elem++)
					for (let m = 0; m < figura[elem].length; m++)
						for (let n = 0; n < figura[elem].length; n++)
							if (figura[elem][m][n] !== 0) figura[elem][m][n] = rnd_color;	
				
				
				vw.colorFullLines(pole);				
				k += md.line(pole);				
				rnd = nextrnd;		
				nextrnd = Math.floor(Math.random()*figura.length);
				vw.nextFigure(figura[nextrnd]);
				
				stolknovenie_y = false;					
				pt_x = 180 * size_field;
				pt_y = 0;					
				

			}
		}
		else if (pause) {
			vw.message("Pause", 40);
			music.pause();
			window.cancelAnimationFrame(timer);
			clearTimeout(timeout);	
		}
		else {					
			vw.clearCanvas();			
			level.innerHTML = "Очки: " + k;
			vw.rendering(figura[rnd], pole, pt_x, pt_y);
			if (gameOver(pole)) vw.message("Game over", 30);		
			if (you_win(k, max_k)) vw.message("You win!", 30);
			music.pause();
			music.currentTime = 0.0;
			window.cancelAnimationFrame(timer);
			clearTimeout(timeout);	
		}
	};
	
	
	/*****************Вызываем*/

	
	
	new_game.onclick = function() {		
		if (!start) {
			new_game.innerHTML = "New game"; 
			start = true;
			music.currentTime = 0.0;
			music.play();
			step();			
		}
		else if (pause || gameOver(pole) || you_win(k, max_k)) {			 			
			reset();			
			step();
			
		}
		else {
			reset();			
		}
	}

	function reset() {
		stolknovenie_y = pause = false;				
		pt_x = 180 * size_field;
		pt_y = k = 0;						
		rnd = Math.floor(Math.random()*figura.length);	
		md.clear_field(pole);			
	}

};


