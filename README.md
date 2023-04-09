# assignment-4-Furi0usGeorgeX
assignment-4-Furi0usGeorgeX created by GitHub Classroom

Assignment 4 covers the use of loops and arrays to create patterns.

Question 1 asks to create a radially symmetric shape using a function. I chose to create the illusion of sun rays orbiting the sun from my pirate catcher game. The sun ray code can be seen below

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

The sun rays can be adjusted by their coordinate, size, and color.

In order to get the rays to orbit the sun, I utilized William Kim's rotating shape code, as seen below.

//Above setup
rot = 19;
//Inside draw
 push();
  translate(1150, 650);
  for (let linesDrawn = 0; linesDrawn < 19; linesDrawn++) {
    rotate(rot);
    rays(20, 20, 5, 255, 230, 0);
  }
  pop();
  rot = rot + 0.003;
  
  Question 2 asked that a combination of shapes be repeated in a grid-like pattern. I chose to do so using only one shape - a cloud - but having it scale randomly. I chose to do this on a separate canvas, as having the clouds stay still requires noLoop, which stops every other part of the pirate catcher game from working.  I specifically chose to go with a single shape of cloud as that is what makes the most sense in the context of my pirate game, and will work to adjust the code so that they work with the game. Below are the variables used to set up the cloud "pattern".
    //Cloud pattern variables
    cloudsWidth = 400;
  cloudsHeight = 100;
  cloudsPerRow = 3;
  cloudsPerColumn = 6;
  horizontalSpace = 50;
  verticalSpace = 15;
}

The variables were adjusted in order to make the clouds appear more random, increasing/decreasing the column or row counts causes the clouds to appear more structured, which feels less natural. Below is the code that lives in the draw function.

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

This creates a field of clouds that appear randomly in relation to each other, and vary in size.
