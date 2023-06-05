class heatObject{
  constructor(param){
    this.parameters = param;
    
    this.grid = zeros(this.parameters.Nx, this.parameters.Ny);
    this.setBound();

    this.Q = this.createQ(this.parameters.selectQ.value());
  }
  
  compute(){
    this.Q = this.createQ(this.parameters.selectQ.value());

    let dx = this.parameters.dx;
    let dy = this.parameters.dy;
    let dt = this.parameters.dt;
    let D = this.parameters.D;
    let alph = D * dt / (dx ** 2);
    let beta = D * dt / (dy ** 2);
    let newgrid = copyMat(this.grid);
    
    for (let i = 1; i < newgrid.length - 1; i++){
      for(let j = 1; j < newgrid[0].length - 1; j++){
          newgrid[i][j] =
          this.grid[i][j] +
          alph * (this.grid[i][j - 1] + this.grid[i][j + 1] - 2 * this.grid[i][j]) +
          beta * (this.grid[i - 1][j] + this.grid[i + 1][j] - 2 * this.grid[i][j]);
      }
    }
    this.grid = newgrid;
    this.setBound();
  }

  setBound() {
    let T_top = this.parameters.T_top;
    let T_bottom = this.parameters.T_bottom;
    let T_right = this.parameters.T_right;
    let T_left = this.parameters.T_left;
  
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i][0] = T_top;
      this.grid[i][this.grid[0].length - 1] = T_bottom;
    }
  
    for (let j = 0; j < this.grid[0].length; j++) {
      this.grid[0][j] = T_left;
      this.grid[this.grid.length - 1][j] = T_right;
    }
  } 

  createQ(distrib){
    let Nx = this.parameters.Nx;
    let Ny = this.parameters.Ny;
    
    
    if (distrib == 'Random'){
      return randMat(Nx, Ny, 0, 1);
    }   
    if (distrib == 'Sinus'){
      return sinMat(Nx, Ny, 1);
    }
    if (distrib == 'Exp'){
      return expMat(Nx, Ny);
    }
    if (distrib == 'None'){
      return zeros(Nx, Ny);
    }
  }
  
  show3D(){
   
    let dx = this.parameters.dx;
    let dy = this.parameters.dy;
    
    for (let i = 0; i < this.grid.length; i++){
      for(let j = 0; j < this.grid[0].length; j++){
        
        push();
        let cval = map(this.grid[i][j], findMin(this.grid), findMax(this.grid), 0, 255);
        fill(200, 0, int(cval));
        translate(i*dx, j*dy, this.grid[i][j]/2);
        box(dx, dy, this.grid[i][j]);
        pop();
      }
    } 
  }
}

