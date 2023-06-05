let nbr_iter = 20;
let c = {x: -1.4736001, y: 0};

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);

  let button1 = document.getElementById("button1");
  let button2 = document.getElementById("button2");
  let button3 = document.getElementById("button3");
  let button4 = document.getElementById("button4");

  button1.addEventListener("click", function () {
    updateValue(-0.79, -0.15, 60);
  });

  button2.addEventListener("click", function () {
    updateValue(-0.162, 1.04, 30);
  });

  button3.addEventListener("click", function () {
    updateValue(0.33, 0.008, 25);
  });

  button4.addEventListener("click", function () {
    updateValue(0.28, 0.008, 100);
  });
  noLoop();
}

function draw() {
  background(220);
  loadPixels();
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let iter = 0;
      let x = map(i, 0, width, -2, 2);
      let y = map(j, 0, height, -1, 1);
      let z = {x: x, y: y};
      while (z.x * z.x + z.y * z.y <= 4 && iter < nbr_iter) {
        let nextX = z.x * z.x - z.y * z.y + c.x;
        let nextY = 2 * z.x * z.y + c.y;
        z = {x: nextX, y: nextY};
        iter += 1;
      }
      
      let index = (i + j * width) * 4;
      let brightness = map(iter, 0, nbr_iter, 0, 255);
      
      pixels[index + 0] = brightness;
      pixels[index + 1] = brightness;
      pixels[index + 2] = brightness;
      pixels[index + 3] = 255;
    }
  }
  
  updatePixels();
}

function updateValue(x, y, iter) {
    c = { x: x, y: y };
    nbr_iter = iter;
    redraw();
  }