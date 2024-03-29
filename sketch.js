//variable declaration

//scene 1
var wallballs;

//second scene ball expand
//var concentric;
var concentrics;

//scene 3 row of balls
var rainx
var rainy;
var bknd;

//scene 4 rain of balls
var balls;

//scene 5 grid
var c;

//scene 6 particles
var parts;

//SETUP
function setup() {
  //canvas, background, no stroke
  frameRate(70);
  createCanvas(windowWidth,windowHeight);
  background(255); 
  noStroke();
  //variable instantiation
  //scene 1
  wallballs = []; //array of wall balls
  for(i=0;i<10;i++){ //making an array of 10 objects
    var x_ = 0+160*i; //starting x changes with each new object
    var s_ = random(1,7); //starting speed changes with each new object
    var h_ = random(1,100); //starting height changes with each new object
    var d_ = random(0.5,10);//starting diametr changes with each new object
    wallballs[i] = new WallBall(0,x_,height-h_,s_,d_); //at each array location, make a new ball object with varying paramenters
  }

  //scene 2
  concentrics = [];
  for(i=0;i<9;i++){ //making an array of 9 objects
    var d_ = random(200,800); //starting diameter changes with each new object
    var x_ = 100+300*i; //starting x position changes with each new object
    var y_ = random(height);//starting y position changes with each new object
    concentrics[i] = new Concentric(d_, x_, y_); //at each array location, make a new concentric circle with varying parameters
  }

  //scene 3
  rainx = 15;
  rainy = 0;

  //scene 4
  balls = new Array(800); //array length 400
  for(i=0;i<balls.length;i++){
   balls[i] = new Ball(); //make objects to fill array
  }

  //scene 6
  parts = [];
  for(i=0;i<500;i++){ //make an array of 500 objects at random positions, diameter
     parts[i] = new Particle(random(width),random(height),30);
  }
}

//DRAW
function draw() {
  if (millis()<7500){ //within time range
    scene1();
  }
  if (millis()>7500 && millis()<9000) { //within time range
    //background(0);
    scene2(); 
  }
  if(millis()>9000 && millis()<11000){ //within time range
    noStroke();
    background(255); 
    bknd = map(rainy, 0,height,0,255); //set background to a shade of gray mapping to screen height
    background(bknd);
    scene3();
     }
  if (millis()>11000 && millis()<13500) { //within time range
    scene4(); //see function below
  }
  if (millis()>13500 && millis()<16000) { //within time range
    background(0); 
    scene5(width/2,height/2); //passing width and height of screen as random limits
  }
  if(millis()>16000){//within time range
    background(255);
    scene6();
  }
}


function scene1() {
  for (i = 0; i<wallballs.length; i++) { //for each WallBall object in the array
    wallballs[i].move(); //move and display the ball
    wallballs[i].show(); 
  }
}


function scene2() { 
  for(i=0;i<concentrics.length;i++){
    concentrics[i].move(); //call move and show for each object in the concentrics array
    concentrics[i].show();
  }

}

function scene3() {
  fill(random(200,255),random(150,255),0);
  for (var i =0; i<=width; i++) { //make ellipses across top of screen
    ellipse(rainx*i, rainy+random(0,100), 15, 15*i/2);
  }
  rainy+=random(0,12); //make ellipses fall
}

//concept of making an array of objects is inspired by a lesson from Learning Processing by 
  //Daniel Shiffman, but has been altered to a different syntax and rewritten in p5.js
function scene4() {
  background(255); //clear background
  for (i = 0; i<balls.length; i++) { //for each Ball object in the array
    balls[i].move(); //move and display the ball
    balls[i].show(); 
  }
}

function scene5(w,h){
  stroke(255);
  strokeWeight(0.3);
  for(i =10;i<=width-20;i+=20){ //create a grid of varying sizes of rectangles
    c = color(random(150,255),random(200,255),0); //set a new fill of a random red/orange fir each column
    for(j=10;j<=height;j+=20){
    fill(c);
    rect(i,j,random(w),random(h)); //random size rect based on passed values
    }
  }
}

function scene6(){
  for(i=0;i<parts.length;i++){ //for each object in the array, call move and show
    parts[i].move();
    parts[i].show();
  }
}

//class for WallBall scene 1
class WallBall{
  constructor(opacity, ballx, bally, speed, diameter){ //constrctor and instantiation
    constrain(this.diameter, 0,40); //constraining diam of each ball
    this.opacity = opacity;
    this.ballx = ballx;
    this.bally = bally;
    this.speed = speed;
    this.diameter = diameter;

  }

  move(){
   this.diameter+=0.095; //increase diameter by diff random amount 
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
   fill(255,random(150,255),0,this.opacity); //set fill to a various red-orange with given opacity
   ellipse(this.ballx,this.bally,this.diameter,this.diameter); //make an ellipse at ballx,bally with passed params
  }
}

//class for Concentric scene 2
class Concentric{
  constructor(diam,x,y){ 
    this.diam = diam;
    this.x = x;
    this.y = y;
    this.opadd = map(this.diam, this.diam,0,20,255); //map of diameter of circle to the opactity/alpha value;
  }
  move(){
   this.diam-=random(10,30); //decrease diameter by a random amount
   this.opadd+=0.3; //increase opacity
  }

  show(){
   fill(255,random(100,255),0,this.opadd); //fill with red orange and alpha that maps diam
   stroke(255);
   ellipse(this.x,this.y, this.diam,this.diam); //draw ellipse with passed parameters
   strokeWeight(random(1,4));
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
    fill(random(150,255),random(150,255), 0); //set ball color to orangey red variation
    noStroke(); //no stroke
    ellipse(this.x, this.y, this.diameter, this.diameter); //make ellipse/ball at random x pos, y pos 0, and width and height of diameter
  }
}

class Particle{
  constructor(x,y,d){ //3 parameters
    this.xpos = x;
    this.ypos = y;
    this.d = d;
    this.accel = 0;
    this.alpha = 0;

  }
 
  move(){ //make each object move in random left/right/up/down
    this.accel+=0.05;
    this.alpha+=0.5;
    this.xpos+=random(-this.accel,this.accel);
    this.ypos+=random(-this.accel,this.accel);
    if(this.accel>=6){
      this.accel = 6;
    }
    this.d+=0.1; //increase diameter of each ellipse
    if(this.d>=60){ //particles grow till they reach a diameter of 60
      this.d = 60;
    }
   
  }

  show(){
    fill(random(200,255),random(100,255),0, this.alpha); //make the ellipses
    stroke(0);
    ellipse(this.xpos,this.ypos,this.d,this.d);
  }
}
