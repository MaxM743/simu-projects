let sketch1 = function(p1) {
    let nbr_iter = 20;
    let c = {x: -1.4736001, y: 0};
  
    p1.setup = function() {
      p1.createCanvas(600, 600);
      p1.pixelDensity(1);
  
      let button1 = document.getElementById("button1");
      let button2 = document.getElementById("button2");
      let button3 = document.getElementById("button3");
      let button4 = document.getElementById("button4");
  
      button1.addEventListener("click", function() {
        updateValue(-0.79, -0.15, 60);
      });
  
      button2.addEventListener("click", function() {
        updateValue(-0.162, 1.04, 30);
      });
  
      button3.addEventListener("click", function() {
        updateValue(0.33, 0.008, 25);
      });
  
      button4.addEventListener("click", function() {
        updateValue(0.28, 0.008, 100);
      });
  
      p1.noLoop();
    };
  
    p1.draw = function() {
      p1.background(220);
      p1.loadPixels();
      for (let i = 0; i < p1.width; i++) {
        for (let j = 0; j < p1.height; j++) {
          let iter = 0;
          let x = p1.map(i, 0, p1.width, -2, 2);
          let y = p1.map(j, 0, p1.height, -1, 1);
          let z = {x: x, y: y};
          while (z.x * z.x + z.y * z.y <= 4 && iter < nbr_iter) {
            let nextX = z.x * z.x - z.y * z.y + c.x;
            let nextY = 2 * z.x * z.y + c.y;
            z = {x: nextX, y: nextY};
            iter += 1;
          }
  
          let index = (i + j * p1.width) * 4;
          let brightness = p1.map(iter, 0, nbr_iter, 0, 255);
  
          p1.pixels[index + 0] = brightness;
          p1.pixels[index + 1] = brightness;
          p1.pixels[index + 2] = brightness;
          p1.pixels[index + 3] = 255;
        }
      }
  
      p1.updatePixels();
    };
  
    function updateValue(x, y, iter) {
      c = {x: x, y: y};
      nbr_iter = iter;
      p1.redraw();
    }
  };

  let sketch2 = function(p) {
    let nbr_iter = 100;
    let c = {x: -0.79, y: -0.15};
  
    p.setup = function() {
      p.createCanvas(p.windowWidth * 0.6, p.windowHeight * 0.6);
      p.pixelDensity(1);
    };
  
    p.draw = function() {
      c = {
        x: p.map(p.mouseX, 0, p.width, -2, 2),
        y: p.map(p.mouseY, 0, p.height, -1, 1)
      };
      

      if (p.mouseY > 0 && p.mouseY < p.height){
        p.background(220);
        p.loadPixels();
        for (let i = 0; i < p.width; i++) {
          for (let j = 0; j < p.height; j++) {
            let iter = 0;
            let x = p.map(i, 0, p.width, -2, 2);
            let y = p.map(j, 0, p.height, -1, 1);
            let z = {x: x, y: y};
            while (z.x * z.x + z.y * z.y <= 4 && iter < nbr_iter) {
              let nextX = z.x * z.x - z.y * z.y + c.x;
              let nextY = 2 * z.x * z.y + c.y;
              z = {x: nextX, y: nextY};
              iter += 1;
            }
            
            let index = (i + j * p.width) * 4;
            let brightness = p.map(iter, 0, nbr_iter, 0, 255);
            
            p.pixels[index + 0] = brightness;
            p.pixels[index + 1] = brightness;
            p.pixels[index + 2] = brightness;
            p.pixels[index + 3] = 255;
          }
        }
        
        p.updatePixels();
      }else{
        console.log('none')
      }
    };

    p.windowResized = function() {
      p.resizeCanvas(0.6 * p.windowWidth, 0.6 * p.windowHeight);
    };

  };
  
  // Create instances of the sketches
  let sketch1Instance = new p5(sketch1, 'sketch1');
  let sketch2Instance = new p5(sketch2, 'sketch2');
