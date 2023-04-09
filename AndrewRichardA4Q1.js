//Ship movement variables
let objPos,
  objVel,
  targetPos,
  accelerationRate,
  maxSpeed,
  decelerationRate,
  stoppingDistance;

var c1, c2; //Gradient color variables
let yoff = 0.0; // 2nd dimension of perlin noise
rot = 19;
function setup() {
  createCanvas(1200, 800);
  angleMode(DEGREES);

  //Ship movement variables
  objPos = createVector(width / 2, height / 2);
  objVel = createVector(0, 0);
  accelerationRate = 0.01;
  maxSpeed = 1;
  minSpeed = 0.01;
  decelerationRate = 0.2;
  stoppingDistance = 10;

  //Pirate movement variables
  mateyX = random(1200);
  mateyY = -30;
  mateySpeed = 3;
  mateyIsFalling = false;
  mateyCaught = false;
}

//To Do: background islands?; pirate caught counter

function draw() {
  // Define colors
  c1 = color(140, 140, 255);
  c2 = color(255, 100, 100);
  setGradient(c1, c2);

  //Sun Rays
  push();
  translate(1150, 650);
  for (let linesDrawn = 0; linesDrawn < 19; linesDrawn++) {
    rotate(rot);
    rays(20, 20, 5, 255, 230, 0);
  }
  pop();
  rot = rot + 0.003;

  //Sun
  fill(255, 230, 0);
  noStroke();
  ellipse(1150, 650, 200);

  //Background Wave
  fill(0, 70, 120);
  beginShape();
  let xoff2 = 0; // Option #1: 2D Noise
  for (let x = 0; x <= width; x += 20) {
    // Iterate over horizontal pixels
    let y = map(noise(xoff2, yoff), 0, 1, 200, 350); // Calculate a y value according to noise
    vertex(x, y + 410); // Set the vertex
    xoff2 += 0.03; // Increment x dimension for noise
  }
  yoff += 0.003; // increment y dimension for noise
  vertex(width, height);
  vertex(1, height);
  endShape(CLOSE);

  //Pirate
  stroke(1);
  drawMatey(mateyX, mateyY, 0.6);

  //HMS Procrastinator
  stroke(1);
  updateObject();
  drawShip();
  noStroke();

  //Midground Wave
  fill(0, 100, 150);
  beginShape();
  let xoff = 0;
  for (let x = 0; x <= width; x += 15) {
    let y = map(noise(xoff, yoff), 0, 0.5, 285, 305);
    vertex(x, y + 395);
    xoff += 0.02;
  }
  yoff += 0;
  vertex(width, height);
  vertex(1, height);
  endShape(CLOSE);

  //Foreground Wave
  fill(0, 130, 180);
  beginShape();
  let xoff1 = 0;
  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff1, yoff), 0, 1, 220, 350);
    vertex(x, y + 435);
    xoff1 += 0.03;
  }
  yoff += 0;
  vertex(width, height);
  vertex(1, height);
  endShape(CLOSE);

  //Intro Text
  if (mateyIsFalling == false) {
    fill(0);
    textFont("Georgia", 20);
    text("HIT YER SPACEBARRRRR MATEY", 95, 135);
    text("SAVE YER CREW FROM DAVEY JONES' LOCKERRRRR", 115, 165);
  }

  //When you hit the space bar, the pirate will start falling
  if (keyCode == 32 && mateyIsFalling == false) {
    mateyIsFalling = true;
  }

  //Sets the conditions for the pirate falling
  if (mateyIsFalling == true) {
    mateyY = mateyY + mateySpeed;
  }

  //Resets the pirate's position to the top when he drowns
  if (mateyY > 750) {
    mateyY = -30;
    mateyX = random(1200);
    mateySpeed = 3;
  }

  //Slows pirate when he "deploys parachute"
  if (mateyY > 150) {
    mateySpeed = 1;
  }

  //Slows pirate when he hits the water
  if (mateyY > 690) {
    mateySpeed = 0.2;
  }

  let shipCatchMatey = dist(mateyX, mateyY, objPos.x, objPos.y);
  if (shipCatchMatey < 90) {
    mateyCaught = true;
  } else {
    mateyCaught = false;
  }
}

function mousePressed() {
  targetPos = createVector(mouseX, mouseY);
}
function updateObject() {
  if (targetPos) {
    let dir = p5.Vector.sub(targetPos, objPos);
    let dist = dir.mag();
    let speed = maxSpeed;

    if (dist < stoppingDistance) {
      speed = map(dist, 0, stoppingDistance, 0, maxSpeed);
    }

    if (dist > 0) {
      dir.normalize();
      objVel.add(dir.mult(accelerationRate));
      objVel.limit(speed);
    } else {
      objVel.mult(0);
    }

    if (dist < 1) {
      targetPos = undefined;
      objVel.mult(0);
    } else if (dist < stoppingDistance) {
      objVel.mult(map(dist, 0, stoppingDistance, 0, 1 - decelerationRate));
    }
  } else {
    objVel.mult(0);
  }

  objPos.add(objVel);
}

function drawShip(x, y, width, height, r, g, b) {
  push();
  translate(objPos.x, 540);
  scale(width, height);
  fill(100, 60, 0);

  //Dictates direction of ship depending on which half of the screen the mouse is on
  if (targetPos > objPos) {
    scale(1, 1); //Facing right
  } else {
    scale(-1, 1); //Facing left
  }

  //Ship Body

  //Adds a pirate to the ship's deck if the pirate is caught
  if (mateyCaught == true) {
    stroke(0);
    drawMatey(10, 130, 0.6);
  }

  beginShape();
  vertex(-100, 130);
  vertex(-100, 140);
  vertex(-80, 140);
  vertex(-70, 150);
  vertex(-50, 160);
  vertex(-20, 170);
  vertex(60, 170);
  vertex(90, 160);
  vertex(110, 140);
  vertex(150, 130);
  vertex(150, 125);
  vertex(110, 135);
  vertex(100, 135);
  vertex(90, 140);
  vertex(60, 140);
  vertex(60, 80);
  vertex(90, 80);
  vertex(90, 75);
  vertex(60, 75);
  vertex(60, 60);
  vertex(55, 60);
  vertex(55, 75);
  vertex(25, 75);
  vertex(25, 80);
  vertex(55, 80);
  vertex(55, 140);
  vertex(0, 140);
  vertex(0, 45);
  vertex(30, 45);
  vertex(30, 40);
  vertex(0, 40);
  vertex(0, 20);
  vertex(-5, 20);
  vertex(-5, 40);
  vertex(-35, 40);
  vertex(-35, 45);
  vertex(-5, 45);
  vertex(-5, 140);
  vertex(-20, 135);
  vertex(-35, 120);
  vertex(-90, 120);
  endShape(CLOSE);

  //Guns
  fill(50);
  ellipse(-40, 150, 5);
  ellipse(-20, 150, 5);
  ellipse(0, 150, 5);
  ellipse(20, 150, 5);
  ellipse(40, 150, 5);
  ellipse(60, 150, 5);
  ellipse(80, 150, 5);

  if (objVel.mag() > 0.1) {
    //If the ship is moving
    //Sails Open
    fill(255, 255, 245);

    //Back Sail
    beginShape();
    vertex(30, 45);
    vertex(40, 60);
    vertex(30, 85);
    vertex(-40, 85);
    vertex(-30, 60);
    curveVertex(-35, 45);
    endShape(CLOSE);

    //Front Sail
    beginShape();
    vertex(90, 80);
    vertex(100, 95);
    vertex(90, 115);
    vertex(20, 115);
    vertex(30, 95);
    curveVertex(25, 80);
    endShape(CLOSE);
  } else {
    //Sails Closed
    fill(255, 255, 245);

    //Back Sail
    beginShape();
    vertex(30, 45);
    vertex(35, 50);
    vertex(-35, 50);
    vertex(-30, 45);
    endShape(CLOSE);

    //Front Sail
    beginShape();
    vertex(90, 80);
    vertex(95, 85);
    vertex(25, 85);
    vertex(30, 80);
    endShape(CLOSE);
  }

  //Keeps the text "HMS PROCRASTINATOR" from reversing when the ship faces left
  if (targetPos > objPos) {
    //Moniker
    scale(1, 1);
    fill(255);
    textFont("Georgia", 6);
    text("HMS PROCRASTINATOR", -95, 135);
  } else {
    scale(-1, 1);
    fill(255);
    textFont("Georgia", 6);
    text("HMS PROCRASTINATOR", 25, 135);
  }

  pop();
}

//The Pirate
function drawMatey(x, y, size) {
  push();
  translate(x, y);
  scale(size);

  //Parachute
  if (mateyY >= 150 && mateyY <= 690) {
    strokeWeight(1);
    fill(255, 255, 245);
    beginShape();
    vertex(-15, -20);
    vertex(-20, -70);
    vertex(-60, -60);
    vertex(-50, -90);
    vertex(0, -100);
    vertex(50, -90);
    vertex(60, -60);
    vertex(20, -70);
    vertex(15, -20);
    vertex(20, -70);
    curveVertex(-20, -70);
    endShape(CLOSE);
  }

  strokeWeight(1);
  fill(255, 200, 200);
  ellipse(-15, -10, 3, 15); //LeftForearm
  ellipse(15, -10, 3, 15); //RightForearm

  fill(255, 200, 200);
  ellipse(-10, -5, 15, 5); //LeftBicep
  ellipse(10, -5, 15, 5); //RightBicep

  fill(255, 200, 200);
  ellipse(-15, -20, 5, 5); //LeftHand
  ellipse(15, -20, 5, 5); //RightHand

  fill(60, 60, 60);
  ellipse(-5, 25, 3, 15); //LeftCalf
  ellipse(5, 25, 3, 15); //RightCalf

  fill(0, 150, 200);
  ellipse(-5, 15, 6, 15); //LeftThigh
  ellipse(5, 15, 6, 15); //RightThigh

  fill(20, 20, 20);
  ellipse(-5, 35, 5, 5); //RightFoot
  ellipse(5, 35, 5, 5); //RightFoot

  fill(255, 100, 100);
  ellipse(0, 0, 10, 20); //Torso

  fill(255, 200, 200);
  ellipse(0, -10, 10, 10); //Head

  fill(0);
  ellipse(2, -11, 3); //Eyepatch
  line(-2, -15, 5, -8);
  pop();
}

//Sun Rays
function rays(x, y, size, r, g, b) {
  push();
  translate(x, y);
  fill(r, g, b);
  scale(size);
  //fill(255, 230, 0);
  noStroke();
  beginShape();
  vertex(0, 0);
  vertex(10, 10);
  vertex(60, 40);
  vertex(80, 60);
  vertex(120, 80);
  vertex(160, 120);
  vertex(180, 130);
  curveVertex(270, 180);
  endShape();
  pop();
}

function cloud(cloudX, cloudY, size) {
  scale(size);

  push();
  fill(150, 0, 150);
  noStroke();
  ellipse(cloudX, cloudY, 70, 50);
  ellipse(cloudX + 10, cloudY + 10, 70, 50);
  ellipse(cloudX - 20, cloudY + 10, 70, 50);

  fill(250, 250, 180);
  noStroke();
  ellipse(cloudX - 10, cloudY - 10, 70, 50);
  ellipse(cloudX, cloudY, 70, 50);
  ellipse(cloudX - 30, cloudY, 70, 50);
  pop();
}

//Setup for Gradient
function setGradient(c1, c2) {
  // noprotect
  noFill();
  for (var y = 0; y < height; y++) {
    var inter = map(y, 0, height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

//Gradient script by REAS (https://editor.p5js.org/REAS/sketches/S1TNUPzim)
//Wave script by Daniel Shiffman (https://p5js.org/examples/math-noise-wave.html)
//"Move to clicked point" script created by ChatGPT
//"rot" Rotate script by WilliamKim1edu
