var x = 0;
const stars = [];
let cloudX = 100;
let cloudY = 100;

// This sketch uses a nested loop to repeat sprites in a 2d grid.
function setup() {
  createCanvas(800,800);
   for(let i = 0; i < 100; ++i) {
    stars.push([random(width), random(height)]);
   }
  
  //Cloud pattern variables
    cloudsWidth = 400;
  cloudsHeight = 100;
  cloudsPerRow = 3;
  cloudsPerColumn = 6;
  horizontalSpace = 50;
  verticalSpace = 15;
}

function draw() {
  background("midnightblue");
    //Star Field
  background(0,0,20);
  stroke('white');
  strokeWeight(2);
   stars.forEach(star => {
    point(...star);
  });
  
  
    push();
  noLoop();
  // Draw all rows of clouds
  for (let rowsDrawn = 0; rowsDrawn < cloudsPerColumn; rowsDrawn++) {
    // Draw all the columns within a row.
    for (let columnsDrawn = 0; columnsDrawn < cloudsPerRow; columnsDrawn++) {
      // Push this sprite to the right by the appropriate amount.
      let offsetRight = columnsDrawn * (cloudsWidth + horizontalSpace);
      // Push this sprite down by the appropriate amount.
      let offsetDown = rowsDrawn * (cloudsHeight + verticalSpace);
      cloud(offsetRight,offsetDown, random(0.5,2));
    }
  }
 pop();
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
