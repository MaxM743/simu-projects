class animControls{
  constructor(){
    this.run = 2;
  
    this.runButton = createButton('Run !');
    
    this.runButton.mousePressed(() => {this.run = (this.run + 1)%2}); 
    
    this.resetButton = createButton('Reset !');
  
    this.resetButton.mousePressed(() => {this.run = 2}); 
  }

}

class simuControls{
  constructor(){
    this.Nx = 1;
    this.Ny = 1;
    this.T_i = 10;
    this.T_top = 1;
    this.T_bottom = 1;
    this.T_left = 1;
    this.T_right = 1;
    this.D = 1;
    this.dx = width/this.Nx;
    this.dy = height/this.Ny;
    this.dt = 1/(4*this.D) * (this.dx**2 * this.dy**2)/(this.dx**2+this.dy**2);
    
    this.NxSlider = createSlider(5, 30, 10);
    this.NySlider = createSlider(5, 30, 10);
    this.TtopSlider = createSlider(0, 200, 20);
    this.TbottomSlider = createSlider(0, 200, 20);
    this.TleftSlider = createSlider(0, 200, 20);
    this.TrightSlider = createSlider(0, 200, 20);
    this.DSlider = createSlider(1, 200, 10);
        


    this.NxSlider.style('width', '80px');
    this.NySlider.style('width', '80px');
    this.TtopSlider.style('width', '80px');
    this.TbottomSlider.style('width', '80px');
    this.TleftSlider.style('width', '80px');
    this.TrightSlider.style('width', '80px');
    this.DSlider.style('width', '80px');

    this.selectQ = createSelect();

    this.selectQ.option('None');
    this.selectQ.option('Random');
    this.selectQ.option('Sinus');
    this.selectQ.option('Exp');
    
    this.update();
  }
  update(){
    this.Nx = this.NxSlider.value();
    this.Ny = this.NySlider.value();
    this.T_top = this.TtopSlider.value();
    this.T_bottom = this.TbottomSlider.value();
    this.T_left = this.TleftSlider.value();
    this.T_right = this.TrightSlider.value();
    this.D = this.DSlider.value();
    this.dx = width/this.Nx;
    this.dy = height/this.Ny;
    this.dt = 1/(4*this.D) * (this.dx**2 * this.dy**2)/(this.dx**2+this.dy**2); 
  }

  
  
}

class Controls{
  constructor(){
    this.animCtrl = new animControls(); 
    this.simuCtrl = new  simuControls();
  }
}

