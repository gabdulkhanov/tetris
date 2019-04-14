var Model = function() {
	
	this.stolknovenie = function stolknovenie(mas1, mas2, ptx, pty) {
		var f = false;
		for (let i = mas1.length - 1; i >=0 ; i--) {
				for (let j = 0; j < mas1[i].length; j++)
				if ((mas1[i][j])&&(mas2[pty/30+i+1][ptx/30+j])) { 					
					f = true;
				}
			}
		return f;	
	}
	
	this.stolknovenie_x = function stolknovenie_x(mas1, mas2, ptx, pty, dx) {
		var f = false;
		for (let i = mas1.length - 1; i >=0 ; i--) {
				for (let j = 0; j < mas1[i].length; j++)
				if ((mas1[i][j])&&(mas2[pty/30+i][ptx/30+j+dx])) { 					
					f = true;
				}
			}
		return f;	
	}
	
	this.update_pole = function update_pole(mas1, mas2, ptx, pty) {
		for (let m = 0; m < mas1.length; m++)
			for (let n = 0; n < mas1[m].length; n++)
			{
				if (mas1[m][n]) mas2[pty/30+m][ptx/30+n] = mas1[m][n];
			}
	}
	
	this.rotate90 = function rotate90(mas) {
		var new_mas = [];
		for (let m = 0; m < mas.length; m++)
		{
			new_mas[m] = [];
			for (let n = 0; n < mas[m].length; n++)
			{
				new_mas[m][n] = mas[n][m];				
			}
			new_mas[m].reverse();
		}
		return new_mas;
	}
	
	this.isRotate = function isRotate(mas1, mas2, ptx, pty) {
		return (this.stolknovenie_x(mas1, mas2, ptx, pty, -1)&&(this.stolknovenie_x(mas1, mas2, ptx, pty, 1)));	
	}
	
	this.instanceRect = function(mas1, mas2, ptx, pty, l, r) {
		var f1 = 0, max = 0;
		for (let m = 0; m < mas1.length; m++) {	
			f1 = 0;
			for (let n = 0; n < mas1[m].length; n++) {
				if ((mas1[m][n])&&(mas2[pty/30+m][ptx/30+n])) f1++;
			}
			if (max < f1) max = f1;
		}
		if (l) ptx+=(30*max);		
		if (r) ptx-=(30*max);
		return ptx;
	}
	
	this.line = function line(mas) {
		var f, k = 0;
		for (let m = mas.length - 2; m > 1; m--) {
			f = true;
			while(f) {
				for (let n = 1; n < mas[m].length - 1; n++) {
						if (!mas[m][n]) f = false;
					}	
				if (f) {
					for (let i = m; i > 0 ; i--) 
						for (let j = 1; j < mas[i].length - 1; j++) {
							mas[i][j] = mas[i-1][j];
						}
					k++;
				}				
			}
		}
		return k;
	}
	
	this.gameOver = function gameOver(arr) {
		var flag = false;	
		for (let n = 1; n < arr[2].length - 1; n++) {			
			if (arr[2][n]) flag = true;
		}		
		return flag;
	}
	
}

