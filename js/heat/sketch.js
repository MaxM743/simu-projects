let cameraCtrl;
let controller;
let axis;
let heat;
let divButtons;
let divSliders;

function setup() {
  let canvas = createCanvas(600, 600, WEBGL);
  canvas.parent('p5sketch');
  axis = new Axis();
  cameraCtrl = new Camera();
  controller = new Controls();

  divSliders = createDiv('');
  divSliders.parent('widgets');
  let NxText = createP("Nx: " + controller.simuCtrl.NxSlider.value());
  controller.simuCtrl.NxSlider.input(() => {NxText.html("Nx: " + controller.simuCtrl.NxSlider.value());});
  divSliders.child(NxText);
  divSliders.child(controller.simuCtrl.NxSlider);
  let NyText = createP("Ny: " + controller.simuCtrl.NySlider.value());
  controller.simuCtrl.NySlider.input(() => {NyText.html("Ny: " + controller.simuCtrl.NySlider.value());});
  divSliders.child(NyText);

  divSliders.child(controller.simuCtrl.NySlider);
  let DText = createP("D: " + controller.simuCtrl.DSlider.value());
  controller.simuCtrl.DSlider.input(() => {DText.html("D: " + controller.simuCtrl.DSlider.value());});
  divSliders.child(DText);
  divSliders.child(controller.simuCtrl.DSlider);

  let TtopText = createP("Ttop: " + controller.simuCtrl.TtopSlider.value());
  controller.simuCtrl.TtopSlider.input(() => {TtopText.html("Ttop: " + controller.simuCtrl.TtopSlider.value());});
  divSliders.child(TtopText);
  divSliders.child(controller.simuCtrl.TtopSlider);

  let TbottomText = createP("Tbottom: " + controller.simuCtrl.TbottomSlider.value());
  controller.simuCtrl.TbottomSlider.input(() => {TbottomText.html("Tb: " + controller.simuCtrl.TbottomSlider.value());});
  divSliders.child(TbottomText);
  divSliders.child(controller.simuCtrl.TbottomSlider);

  let TleftText = createP("Tleft: " + controller.simuCtrl.TleftSlider.value());
  controller.simuCtrl.TleftSlider.input(() => {TleftText.html("Tb: " + controller.simuCtrl.TleftSlider.value());});
  divSliders.child(TleftText);
  divSliders.child(controller.simuCtrl.TleftSlider);

    let TrightText = createP("Tright: " + controller.simuCtrl.TrightSlider.value());
  controller.simuCtrl.TrightSlider.input(() => {TrightText.html("Tb: " + controller.simuCtrl.TrightSlider.value());});
  divSliders.child(TrightText);
  divSliders.child(controller.simuCtrl.TrightSlider);

  divSliders.child(controller.simuCtrl.selectQ);

  divButtons = createDiv('');
  divButtons.parent('widgets');

  divButtons.child(controller.animCtrl.runButton);
  divButtons.child(controller.animCtrl.resetButton);
}


function draw() {
  background(220);
  cameraCtrl.update();
  axis.show();
  controller.simuCtrl.update();
  
  
  
  if (controller.animCtrl.run == 2){
    heat = new heatObject(controller.simuCtrl); 
  }
  if (controller.animCtrl.run == 0){
    
  }
  if (controller.animCtrl.run == 1){
    heat.compute();
  }
  heat.show3D()
}

function mouseWheel(event){
  if (keyIsPressed){
    event.preventDefault()
    cameraCtrl.rotation(event);
  }
  else if(mouseIsOverCanvas()){
    event.preventDefault()
    cameraCtrl.zoom(event); // Zoom in/out the scene.
  }

}

function mousePressed() {
  if (mouseIsOverCanvas()){
    cameraCtrl.mousePressed();
  } 
}

function mouseDragged() {
  if (mouseIsOverCanvas()){
  cameraCtrl.translation();
  }
}

function mouseIsOverCanvas(){
  return (
    mouseX >= 0 &&
    mouseY >= 0 &&
    mouseX <= canvas.width &&
    mouseY <= canvas.height)
}


