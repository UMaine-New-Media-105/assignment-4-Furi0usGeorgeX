var x = 0;
const stars = [];
let cloudX = 100;
let cloudY = 100;
let shapeX = 70;
let shapeY = 70;

// This sketch uses a nested loop to repeat sprites in a 2d grid.
function setup() {
  createCanvas(800,800);
   for(let i = 0; i < 100; ++i) {
    stars.push([random(width), random(height)]);
     
       shape = ["cloud", "cloud2"];
  shapesPerRow = 20;
  let offset = width / shapesPerRow;
   }
 }

function draw() {
  noLoop();
  background("midnightblue");
    //Star Field
  background(0,0,20);
  stroke('white');
  strokeWeight(2);
   stars.forEach(star => {
    point(...star);
  });
  
    for (let counter = 0; counter < shapesPerRow; counter++) {
    let randomShape = shape[counter%shape.length];
    chooseShape(randomShape, shapeX * counter, shapeY * counter);
   }
  
  function chooseShape(shapeName, shapeX, shapeY) {
  if (shapeName == "cloud") {
    cloud(shapeX, shapeY);
  } else if (shapeName === "cloud2") {
    cloud2(shapeX, shapeY);
  }
  }
 }
  
  function cloud(cloudX, cloudY,size) {
  scale(size);
  
  push();
  fill(150,0,150)
  noStroke();
  ellipse(cloudX, cloudY, 70, 50);
  ellipse(cloudX + 10, cloudY + 10, 70, 50);
  ellipse(cloudX - 20, cloudY + 10, 70, 50);
  
  fill(250,250,180)
  noStroke();
  ellipse(cloudX-10, cloudY-10, 70, 50);
  ellipse(cloudX , cloudY , 70, 50);
  ellipse(cloudX - 30, cloudY , 70, 50);
  pop();
}

  function cloud2(cloudX, cloudY,size) {
  scale(size);
  
  push();
  fill(150,0,150)
  noStroke();
  ellipse(cloudX, cloudY, 70, 50);
  ellipse(cloudX + 10, cloudY + 10, 70, 50);
  ellipse(cloudX - 20, cloudY + 10, 70, 50);
    ellipse(cloudX + 20, cloudY, 70, 50);
  
  fill(250,250,180)
  noStroke();
  ellipse(cloudX-10, cloudY-10, 70, 50);
  ellipse(cloudX , cloudY , 70, 50);
  ellipse(cloudX - 30, cloudY , 70, 50);
    ellipse(cloudX + 10, cloudY -10, 70, 50);
  pop();
}
