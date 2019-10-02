//variable declaration
//for first scene ball bounce
var opacity;
var ballx;
var bally;
var speed;

//second scene ball explode
var diam;

//scene 3 row of balls
var rainx
var rainy;

//scene 4 rain of balls


function setup() {
  //canvas, background, no stroke
  createCanvas(800,800);
  background(255); 
  noStroke();

  //variable instantiation
	//scene 1
  opacity = 0;
  fill(0,0,0);
	ballx=0;
	bally=height;
	speed=5;
	
	//scene 2
	diam = 0;
	
	//scene 3
	rainx = 15;
	rainy = 0;

}

function draw() {
	fill(255,0,0,opacity); //set fill
	ellipse(ballx,bally,20,20); //make an ellipse at ballx, bally
	speed = speed + 1; //increase speed
	opacity+=0.3; //increase opacity
	ballx+=speed; //move ballx
	bally-=1; //move bally
	if(ballx >= width || ballx<=0){ //reverse direction if ball goes out of bounds
		speed=speed*-1;
		 }
	if(bally<= 0){ //if ball reaches top of screen
		background(255); //clear background
		ellipse(width/2, height/2, diam,diam); //make an ellipse
		diam+=40; //expand ellipse
		 }
	if(diam>=width){//if ball fills screen
		fill(255); //set fill to white
		background(255,0,0); //clear background with red
		for(var i =0; i<=width; i++){ //make ellipses across top of screen
			ellipse(rainx*i,rainy,15,15);
		}
		rainy+=5; //make ellipses fall
	}
	if(rainy>2*height/3){ //if row of balls drops below 2/3 of screen
		fill(255,0,0);//red
		background(255); //clear background with white
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













  



  

