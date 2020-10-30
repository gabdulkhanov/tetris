
class ModelClass {
	
	constructor(size_cell = 30) { 
		this.size_cell = size_cell; 
	}
	
		
	collision(arr1, arr2, ptx, pty) {		
		for (let i = arr1.length - 1; i >=0 ; i--) {
				for (let j = 0; j < arr1[i].length; j++)
					if ( (arr1[i][j])&&(arr2[pty/this.size_cell+i+1][ptx/this.size_cell+j]) ) { 					
						return true;
					}
			}
		return false;	
	}
	
	collision_x(arr1, arr2, ptx, pty, dx) {		
		for (let i = arr1.length - 1; i >=0 ; i--) {
				for (let j = 0; j < arr1[i].length; j++)
					if ( (arr1[i][j])&&(arr2[pty/this.size_cell+i][ptx/this.size_cell+j+dx]) ) { 					
						return true
					}
			}
		return false;	
	}
	
	update_field(arr1, arr2, ptx, pty) {
		for (let m = 0; m < arr1.length; m++)
			for (let n = 0; n < arr1[m].length; n++)
			{
				if ( arr1[m][n] ) arr2[pty/this.size_cell+m][ptx/this.size_cell+n] = arr1[m][n];
			}
	}
	
	clear_field(field_arr) {
		for (let m = 0; m < field_arr.length-1; m++)
			for (let n = 2; n < field_arr[m].length-2; n++)
			{
				field_arr[m][n] = 0;
			}
	}
	
	rotate90(arr) {
		var new_arr = [];
		for (let m = 0; m < arr.length; m++)
		{
			new_arr[m] = [];
			for (let n = 0; n < arr[m].length; n++)
			{
				new_arr[m][n] = arr[n][m];				
			}
			new_arr[m].reverse();
		}
		return new_arr;
	}	
	
	reverse_rotate90(arr) {
		var new_arr = [];
		for (let m = 0; m < arr.length; m++)
		{
			new_arr[m] = [];
			for (let n = 0; n < arr[m].length; n++)
			{
				new_arr[m][n] = arr[n][arr[m].length-1-m];				
			}			
		}
		return new_arr;
	}
	
	
	instanceRect(arr1, arr2, ptx, pty, dx) {
		var new_arr = this.rotate90(arr1);		
		var flag = false;
		for (let m = 0; m < new_arr.length; m++) {			
			for (let n = 0; n < new_arr[m].length; n++) {
				if ( (new_arr[m][n] > 0)&&(arr2[pty/this.size_cell+m][ptx/this.size_cell+n + dx] > 0) ) flag = true;
			}			
		}	
		if (flag) {
			new_arr = this.reverse_rotate90(new_arr);
		}
		return flag;
	}
	
	line(arr) {
		var f, k = 0;
		for (let m = arr.length - 2; m > 1; m--) {
			f = true;
			while(f) {
				for (let n = 2; n < arr[m].length - 2; n++) {
						if (!arr[m][n]) f = false;
					}	
				if (f) {
					for (let i = m; i > 0 ; i--) 
						for (let j = 2; j < arr[i].length - 2; j++) {
							arr[i][j] = arr[i-1][j];
						}
					k++;
				}				
			}
		}		
		return k;
	}	
	
}











