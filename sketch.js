//variable declaration
var timeStarted;
//for first scene ball bounce
var opacity;
var ballx;
var bally;
var speed;

//scene 1 lines
var y2;

//second scene ball expand
var diam;
var opadd;

//scene 3 row of balls
var rainx
var rainy;
var bknd;

//scene 4 rain of balls
var balls;
var numballs;
var count;

//scene 5 grid
var c;

function setup() {
  //canvas, background, no stroke
  frameRate(70);
  createCanvas(windowWidth,windowHeight);
  background(0); 
  noStroke();

  //variable instantiation
  timeStarted = millis(); //time started is how long the program has been running
  //scene 1
  opacity = 0;
  fill(0, 0, 0);
  ballx=0;
  bally=height;
  speed=5;

  //scene 1 lines
  y2=height;

  //scene 2
  diam = 800;
  opadd = map(diam, 800,0,6,255); //map of diameter of circle to the opactity/alpha value

  //scene 3
  rainx = 15;
  rainy = 0;

  //scene 4
  balls = new Array(400); //make an array length 400
  numballs = 0;
  count = 0; 

}

function draw() { 
  /*switch (timeStarted){ //here, I tried to use millis and switch based on when millis() starts, and get can't that to work 
    case timeStarted>0:
      scene1();
      scene1lines();
    break;
  }*/

  switch (true){ //here, I tried to use millis and switch another way with a boolean
    case timeStarted>0 && timeStarted<8500:
      scene1();
      scene1lines();
    break;
    case timeStarted>8500 && timeStarted<11000:
      scene2();
      break;
  }

  /*scene1lines();//see function below
  scene1(); //see function below
  if (bally<= 0) { //if ball reaches top of screen
   scene2(); //see scene 2 below
  }
  if(diam<=-windowWidth){ //if the circle's diameter is bigger than the window width
    noStroke();
    background(255); //clear background
    bknd = map(rainy, 0,height,255,0); //set background to a shade of gray mapping to screen height
    background(bknd);
    scene3(); //see function below
     }
  if (rainy>height) { //if row of balls drops below screen
    scene4(); //see function below
  }
  if (count >= 350) { //if counter is 350 (slightly less than the number of balls to be made)
    background(0); //clear background with black
    scene5(width/2,height/2); //see function below, passing width and height of screen as random limits
  }*/
}


/*function scene1(opacity,ballx,bally,speed) { //can't get function to run now that variables are local
  noStroke();
  fill(255, 0, 0, opacity); //set fill
  ellipse(ballx, bally, 20, 20); //make an ellipse at ballx, bally
  speed = speed + 2; //increase speed
  opacity+=0.8; //increase opacity
  ballx+=speed; //move ballx
  bally-=2; //move bally
  if(ballx>=width || ballx<=0){
    speed = speed * -1;
  }
}*/

function scene1() {
  noStroke();
  //fill(255, 0, 0, opacity); //set fill
  ellipse(ballx, bally, 20, 20); //make an ellipse at ballx, bally
  speed = speed + 2; //increase speed
  opacity+=0.8; //increase opacity
  ballx+=speed; //move ballx
  bally-=2; //move bally
  for(i = 0; i<width;i++){
    ellipse(ballx, bally, 20, 20); //make an ellipse at ballx, bally //tried to turn this into a for loop, opacity doesn't change for some reason
    fill(255, 0, 0, opacity); //set fill
  }
  if(ballx>=width || ballx<=0){
    speed = speed * -1;
  }
}

function scene1lines(){
  //stroke(255,0,0); //stroke settings
  strokeWeight(4);
  for(i=width-15;i>=ballx;i-=30){ //make lines from bottom of screen starting at right side and going up to height of ball bouncing
    var m = map(i,width-15,ballx,255,50); //map the i val from the position of the ball to the amount of red in the lines
    stroke(m,0,0); //stroke settings
    line(i,height,i,y2);
  
  }
    y2-=2; //incrememnt y2 to make lines come up the screen @ same rate the ball comes up the screen
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
  rainy+=8; //make ellipses fall
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

//class for Ball
class Ball {
  constructor() { //constructor with variable instantiation
    this.diameter=random(5,35);
    this.x = random(width); //random x position for each ball
    this.y = height; //starting y position of height/bottom of screen for each ball
    this.speed = random(1, 20); //set each ball to a random speed btw 1 and 6
  }

  move() { //move method
    this.y-=this.speed; //subtract random speed to y value of ball so it moves up
    //print("im moving");
  }


  display() { //display method
    fill(random(255), 0, 0); //set ball color to orangey red variation
    noStroke(); //no stroke
    ellipse(this.x, this.y, this.diameter, this.diameter); //make ellipse/ball at random x pos, y pos 0, and width and height of diameter
    //print("im displaying");
  }
}

 

















