//variable declaration
//for first scene ball bounce
var opacity;
var ballx;
var bally;
var speed;

//scene 1 lines
var y2;

//second scene ball explode
var diam;

//scene 3 row of balls
var rainx
var rainy;
var bknd;

//scene 4 rain of balls
var balls;
var numballs;
var count;

function setup() {
  //canvas, background, no stroke
  createCanvas(windowWidth,windowHeight);
  background(0); 
  noStroke();

  //variable instantiation
  //scene 1
  opacity = 0;
  fill(0, 0, 0);
  ballx=0;
  bally=height;
  speed=5;

  //scene 1 lines
  y2=height;

  //scene 2
  diam = 0;

  //scene 3
  rainx = 15;
  rainy = 0;

  //scene 4
  balls = new Array(400); //make an array length 400
  numballs = 0;
  count = 0; 
}

function draw() { 
  scene1lines();//see function below
  scene1(); //see function below
  if (ballx >= width || ballx<=0) { //reverse direction if ball goes out of bounds
    scene1reversedir(); //see function below
  }
  if (bally<= 0) { //if ball reaches top of screen
    scene2(); //see scene 2 below
  }
  if (diam>=width) {//if ball fills screen
    fill(255); //set fill to white
    //background(255, 0, 0); //clear background with red
    bknd = map(rainy, 0,height,0,255);
    background(bknd);
    scene3(); //see function below
  }
  if (rainy>height) { //if row of balls drops below screen
    scene4(); //see function below
  }
  if (count >= 350) { //if counter is 350 (slightly less than the number of balls to be made)
    background(255,0,0); //clear background with black
  }
}


function scene1() {
  noStroke();
  fill(255, 0, 0, opacity); //set fill
  ellipse(ballx, bally, 20, 20); //make an ellipse at ballx, bally
  speed = speed + 1; //increase speed
  opacity+=0.3; //increase opacity
  ballx+=speed; //move ballx
  bally-=1; //move bally
}

function scene1reversedir() { 
  speed=speed*-1; //reverse direction of speed variable
}

function scene1lines(){
  stroke(255,0,0); //stroke settings
  strokeWeight(4);
  for(i=width-15;i>=ballx;i-=30){ //make lines from bottom of screen starting at right side and going up to height of ball bouncing
    line(i,height,i,y2);
  
  }
    y2-=1; //incrememnt y2 to make lines come up the screen @ same rate the ball comes up the screen
}

function scene2() {
  background(0); //clear background
  ellipse(width/2, height/2, diam, diam); //make an ellipse //scene 2
  diam+=40; //expand ellipse
}

function scene3() {
  for (var i =0; i<=width; i++) { //make ellipses across top of screen
    ellipse(rainx*i, rainy, 15, 15);
  }
  rainy+=10; //make ellipses fall
}

function scene4() {
  background(0); //clear background with white
  //concept of making an array of objects is inspired by a lesson from Learning Processing by 
  //Daniel Shiffman, but has been altered and rewritten in p5.js
  //I followed his tutorial and made sure the objects worked independently on openProcessing live coding, then integrated them into this js sketch
  //to work with the rest of my code
  balls[numballs] = new Ball(); //create a new Ball object at array position of numballs 
  numballs++; //increase numballs by 1
  count++; //increase count each time a new ball is made
  if (numballs>=balls.length) { //if number of balls is greater than the array length
    numballs = 0; //set numballs to 0
  }

  for (i = 0; i<numballs; i++) { //for each Ball object in the array //scene 4
    balls[i].move(); //move and display the ball
    balls[i].display();
  }
}

//class for Ball
class Ball {
  constructor() { //constructor with variable instantiation
    this.diameter=15;
    this.x = random(width); //random x position for each ball
    this.y = height; //starting y position of height/bottom of screen for each ball
    this.speed = random(1, 6); //set each ball to a random speed btw 1 and 6
  }

  move() { //move method
    this.y-=this.speed; //subtract random speed to y value of ball so it moves up
    //print("im moving");
  }


  display() { //display method
    fill(255, 0, 0); //set ball color
    noStroke(); //no stroke
    ellipse(this.x, this.y, this.diameter, this.diameter); //make ellipse/ball at random x pos, y pos 0, and width and height of diameter
    //print("im displaying");
  }
}

 
 



/*function circles(){
 diam = 600;
 frameRate(rate);
 ellipse(width/2, width/2, diam,diam);
 diam -= 40;
 rate+=0.25;
 opacity+=40;
 if(diam >= 700){
 background(255);
 }
 }*/

















