//create all variables
var bow , arrow,  background, redB, pinkB, greenB ,blueB , bombO , arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage, blue_balloonImage, bomb_obstacleImage, backgroundImage;
var gameOverImage,gameOver;

var score =0;

var PLAY = 1
var END = 0

var gameState = PLAY

function preload(){  
  //load all images
  backgroundImage = loadImage("background0.png");
  
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");

  gameOverImage = loadImage("gameover.png")

  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  bomb_obstacleImage = loadImage("bomb.png");

}

function setup() {
  createCanvas(400, 400);
  
  //creating background
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
  // creating bow to shoot arrow
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;

  gameOver = createSprite(185,200,20,50);
  gameOver.addImage(gameOverImage); 
  gameOver.scale = 0.7;
  gameOver.visible = false;
  
  //reset the scores after every game
  score = 0  

  //create all the groups
  redB= new Group();
  greenB= new Group();
  blueB= new Group();
  pinkB= new Group();
  bombO= new Group();
  arrowGroup= new Group();  
}

function draw() {
  background(0);

  //when the state is in serve state
  if(gameState === PLAY){
    // moving ground
    scene.velocityX = -3 

   //making a infinite ground
   if (scene.x < 0){
   scene.x = scene.width/2;
   }
 
   //moving bow
   bow.y = World.mouseY
 
   // release arrow when space key is pressed
   if (keyDown("space")) {
       createArrow();  
    }
 
   //creating continous enemies
   if (frameCount % 50 ===0 &&gameState === PLAY){
   var select_balloon = Math.round(random(1,5));
   switch(select_balloon){
     case 1: redBalloon();
             break;
     case 2: blueBalloon()
             break;
     case 3: greenBalloon();
             break;
     case 4: pinkBalloon();
             break;
     case 5: bombObstacle();
             break;
     default: break;
   }
   }
 
   //destroy the balloons and the bombs when arrow touches them
   if (arrowGroup.isTouching(redB)) {
   redB.destroyEach();
   arrowGroup.destroyEach();
   score = score + 1;
   }

   if (arrowGroup.isTouching(greenB)) {
   greenB.destroyEach();
   arrowGroup.destroyEach();
   score = score + 1;
   }

   if (arrowGroup.isTouching(blueB)) {
   blueB.destroyEach();
   arrowGroup.destroyEach();
   score= score + 1;
   }

   if (arrowGroup.isTouching(pinkB)) {
   pinkB.destroyEach();
   arrowGroup.destroyEach();
   score = score + 1;
   }
  }
  
   //keep the bow from going outside the screen
   if(bow.y < 40){
   bow.y = 40
   }

   if(bow.y > 360){
   bow.y = 360
   }

   if (arrowGroup.isTouching(bombO)) {
    gameState = END
    scene.destroy();
    bow.destroy();
    redB.destroyEach();
    pinkB.destroyEach();
    blueB.destroyEach();
    greenB.destroyEach();
    arrowGroup.destroyEach();
    bombO.destroyEach();
    gameOver.visible = true;
    }
 
   drawSprites();
   textSize(20)
   fill("red")
   text("Score: "+ score, 300,50);
  }

//write the functions for the balloons and bombs
function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.1;
  redB.add(red);
  red.setCollider("circle",0,-100,250);
  red.debug = true
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.1;
  blueB.add(blue);
  blue.setCollider("circle",0,-100,250);
  blue.debug = true
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.1;
  greenB.add(green);
  green.setCollider("circle",0,-100,250);
  green.debug = true
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 150;
  pink.scale = 1
  pinkB.add(pink);
  pink.setCollider("circle",0,-10,20);
  pink.debug = true
}

function bombObstacle() {
  var bomb = createSprite(0,Math.round(random(20, 370)), 10, 10);
  bomb.addImage(bomb_obstacleImage);
  bomb.velocityX = 3;
  bomb.lifetime = 150;
  bomb.scale = 0.1
  bombO.add(bomb);
  bomb.setCollider("circle",0,-25,250);
  bomb.debug = true
}

// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
  arrow.setCollider("rectangle",0,0,300,75);
  arrow.debug = true
}