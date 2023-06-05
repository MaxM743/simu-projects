function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
  }

function draw() {
    const size = random(10, 30);
    const x = random(width);
    const y = random(height);
    const duration = random(1, 5);
  
    fill(255);
    noStroke();
    ellipse(x, y, size, size);
  
    setTimeout(() => {
      background(0);
    }, duration * 1000);
  }
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
function mouseWheel(event){
   

}