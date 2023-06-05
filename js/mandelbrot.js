let nbr_iter = 30;
let xbounds = [-2, 1];
let ybounds = [-1, 1];
let py = 0;

let zoom_pos_start;
let zoom_pos_end;

let slider_iter;
let button_reset;
let select_iter;

let min_iter = 0;


function setup() {
  canvas = createCanvas(windowWidth*0.8, windowHeight*0.9);
  canvas.parent('mandelbrot');
  pixelDensity(1);
  
  zoom_pos_start = createVector(0, 0); 
  zoom_pos_end = createVector(width, height);

  button_reset = createButton("RESET");
  button_reset.mousePressed(resetSet);
  input_iter = createInput('');
  input_iter.size(100);
  input_iter.input(onInput);
  
  button_reset.parent('widgets');
  input_iter.parent('widgets');
  
}

function draw() {
  if (py <= height){
  loadPixels();
  for (let substep = 0; substep < 20; substep++){
    for (let px = 0; px < width; px++) {
      let iter = 0;
      let cx = map(px, 0, width, xbounds[0], xbounds[1]);
      let cy = map(py, 0, height, ybounds[0], ybounds[1]);
      let c = { re: cx, im: cy };
      let z = { re: 0, im: 0 };
      let z_norm = z.re * z.re + z.im * z.im
      while (z_norm <= 4 && iter < nbr_iter) {
        let new_re = z.re * z.re - z.im * z.im + c.re;
        let new_im = 2 * z.re * z.im + c.im;
        z = { re: new_re, im: new_im };
        z_norm = z.re * z.re + z.im * z.im;
        iter += 1;
      }
      if (iter < min_iter){
        min_iter = iter;
      }
  
      
      let index = (px + py * width) * 4;
      let brightness = mapColor(iter, z_norm);
      pixels[index + 0] = brightness;
      pixels[index + 1] = brightness;
      pixels[index + 2] = brightness;
      pixels[index + 3] = 255;
    }
    py += 1;
  }
  updatePixels();
  }

  
}
function mousePressed(){
  if (mouseOnCanvas()){
    zoom_pos_start = createVector(mouseX, mouseY);
  }
}

function mouseReleased(){
  if (mouseOnCanvas()){
    let x1 = map(zoom_pos_start.x, 0, width, xbounds[0], xbounds[1]);
    let y1 = map(zoom_pos_start.y, 0, height, ybounds[0], ybounds[1]);
    let x2 = map(zoom_pos_end.x, 0, width, xbounds[0], xbounds[1]);
    let y2 = map(zoom_pos_end.y, 0, height, ybounds[0], ybounds[1]);
    xbounds = [min(x1, x2), max(x1, x2)];
    ybounds = [min(y1, y2), max(y1, y2)];
    py = 0;
  }
}

function mouseDragged(){
  if (mouseOnCanvas()){
  updatePixels();
    zoom_pos_end = createVector(mouseX, mouseY);
    noFill();
    rect(zoom_pos_start.x, zoom_pos_start.y, -zoom_pos_start.x+zoom_pos_end.x, -    zoom_pos_start.y+zoom_pos_end.y);
  }
}

function mouseOnCanvas(){
  if (0 < mouseX && mouseX < width && 0 < mouseY && mouseY < height){
    return true;
  }
  return false
}

function mapColor(n_escape, z_escape){
  //let bright = 255*exp(-n_escape/nbr_iter*255);// + 1 - log(log(z_escape) / log(2));
  //let aaa = map(n_escape, min_iter, nbr_iter, 0, 255);
  let aaa = n_escape * (nbr_iter-min_iter)/nbr_iter;
  //let bright = 1000*exp(-aaa);
  let bright = map(aaa, (nbr_iter-min_iter), 0, 0, 255);
  //let bright = map_iter/nbr_iter * 255;
  
  return bright
}

function resetSet(){
  xbounds = [-2, 1]; 
  ybounds = [-1, 1];
  py = 0;
  
  select_iter.selected('25');
  nbr_iter = int(select_iter.value());
  
}

function onInput(value){
  nbr_iter = int(this.value());
  py=0;
}
