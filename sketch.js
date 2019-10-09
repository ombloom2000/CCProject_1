//variable declaration

//scene 1
var wallball;
var wallball2;
var wallball3;

//second scene ball expand
var diam;
var opadd;

//scene 3 row of balls
var rainx
var rainy;
var bknd;

//scene 4 rain of balls
var balls;

//scene 5 grid
var c;

function setup() {
  //canvas, background, no stroke
  frameRate(70);
  createCanvas(windowWidth,windowHeight);
  background(0); 
  noStroke();

  //variable instantiation

  //scene 1
  wallball = new WallBall(0,0,height,5, 1);
  wallball2 = new WallBall(5,70,height,10, 2);
  /*opacity = 0;
  ballx=0;
  bally=height;
  speed=5;*/

  //scene 2
  diam = 800;
  opadd = map(diam, 800,0,20,255); //map of diameter of circle to the opactity/alpha value

  //scene 3
  rainx = 15;
  rainy = 0;

  //scene 4
  balls = new Array(800); //array length 400

  for(i=0;i<balls.length;i++){
   balls[i] = new Ball(); //make objects to fill array
  }

}

function draw() {
  if (millis()<7500){
    background(0);
    scene1();
  }
  if (millis()>7500 && millis()<9000) { //if 
    //timeofLastSwitch = currentTime;
    background(0);
    scene2(); //see scene 2 below
  }
  if(millis()>9000 && millis()<10000){ //if the circle's diameter is bigger than the window width
    noStroke();
    background(255); //clear background
    bknd = map(rainy, 0,height,255,0); //set background to a shade of gray mapping to screen height
    background(bknd);
    scene3(); //see function below
     }
  if (millis()>10000 && millis()<14000) { //if row of balls drops below screen
    scene4(); //see function below
  }
  if (millis()>14000 && millis()<17000) { //if counter is 350 (slightly less than the number of balls to be made)
    background(0); //clear background with black
    scene5(width/2,height/2); //see function below, passing width and height of screen as random limits
  }
  if(millis()>17000){
    background(175,0,0);
  }
}


function scene1() {
  wallball.move();
  wallball.show();
  wallball2.move();
  wallball2.show();
}

function scene2() { 
  fill(255,0,0,opadd); //fill with alpha that maps diam
  stroke(255);
  ellipse(700,400, diam,diam); //draw ellipse
  diam -= 20; //decrease diameter
  if(diam<= -windowWidth){ //clear screen if circle fills screen
    background(255);
  }
  opadd+=0.3; //increase opacity
}

function scene3() {
  fill(255,0,0);
  for (var i =0; i<=width; i++) { //make ellipses across top of screen
    ellipse(rainx*i, rainy, 15, 15*i/2);
  }
  rainy+=15; //make ellipses fall
}

//concept of making an array of objects is inspired by a lesson from Learning Processing by 
  //Daniel Shiffman, but has been altered and rewritten in p5.js
function scene4() {
  background(0); //clear background
  for (i = 0; i<balls.length; i++) { //for each Ball object in the array
    balls[i].move(); //move and display the ball
    balls[i].show(); 
  }
}

function scene5(w,h){
  stroke(255);
  strokeWeight(0.3);
  for(i =10;i<=width-20;i+=20){ //create a grid of varying sizes of rectangles
    c = color(random(255),random(10),0); //set a new fill of a random red/orange fir each column
    for(j=10;j<=height;j+=20){
    fill(c);
    rect(i,j,random(w),random(h)); //random size rect based on passed values
    }
  }
}

//class for WallBall scene 1
class WallBall{
  constructor(opacity, ballx, bally, speed, diameter){
    this.opacity = opacity;
    this.ballx = ballx;
    this.bally = bally;
    this.speed = speed;
    this.diameter = diameter;

  }

  move(){
   this.diameter+=0.12;
   this.speed+=2; //increase speed
   this.opacity+=0.8; //increase opacity
   this.ballx+=this.speed; //move ballx
   this.bally-=2; //move bally
   if (this.ballx >= width || this.ballx<=0) { //reverse direction if ball goes out of bounds
    this.speed=this.speed*-1; //reverse direction of speed variable
  }
  }

  show(){
   noStroke();
   fill(random(50,255), 0,0,this.opacity); //set fill to random red/orange
   ellipse(this.ballx, this.bally,this.diameter , this.diameter); //make an ellipse at ballx, bally
   strokeWeight(4);
   for(i=width-15;i>=this.ballx;i-=30){ //make lines from bottom of screen starting at right side and going up to height of ball bouncing
    var m = map(i,width-15,this.ballx,255,50); //map the i val from the position of the ball to the amount of red in the lines
    stroke(m,0,0); //stroke settings
    line(i,height,i,this.bally);
  }
  }
}
 



//class for Ball scene 4
class Ball {
  constructor() { //constructor with variable instantiation
    this.diameter=random(5,35);
    this.x = random(width); //random x position for each ball
    this.y = height; //starting y position of height/bottom of screen for each ball
    this.speed = random(1, 10); //set each ball to a random speed btw 1 and 6
  }

  move() { //move method
    this.y-=this.speed; //subtract random speed to y value of ball so it moves up
  }

  show() { //display method
    fill(random(255), 0, 0); //set ball color to orangey red variation
    noStroke(); //no stroke
    ellipse(this.x, this.y, this.diameter, this.diameter); //make ellipse/ball at random x pos, y pos 0, and width and height of diameter
  }
}