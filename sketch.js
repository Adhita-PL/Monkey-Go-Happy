var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var invisibleground;
var START;
var PLAY;
var gameState;
var scrollSpeed = 2;
var x1 = 0;
var x2;
function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_collided =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  bgImage = loadImage("Forest_Image.jpg");
}

function setup() {
  createCanvas(500,500);
  
  monkey = createSprite(80, 290);
  monkey.addAnimation("monkey",monkey_running); 
  monkey.addAnimation("monkey",monkey_collided); 
  monkey.scale = 0.15;
  
  invisibleground = createSprite(200, 470,400,10);
  invisibleground.visible = false;
  
  bananaGroup = createGroup();
  stonesGroup = createGroup();
  
  monkey.setCollider("circle",0,0,180);
  monkey.debug = true;
  
  ban = createSprite(315,19);
  ban.addImage("ban",bananaImage);
  ban.scale=0.15;
  x2 = width;
  survaivalTime = 0;
  score = 0;
}

function draw() {
  background("green");   
  image(bgImage, x1, 0, width, height);
  image(bgImage, x2, 0, width, height);
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  if (x1 < -width){
    x1 = width;
  }
  if (x2 < -width){
    x2 = width;
  }
  monkey.velocityY = monkey.velocityY + 0.5;
  
  monkey.collide(invisibleground);
  
  if(keyWentDown("space")&&monkey.y >=400){
    monkey.velocityY = -12 ;
  }
  if(monkey.isTouching(stonesGroup)) {
     monkey.changeAnimation("monkey",monkey_collided);
     monkey.scale = 0.10;
  }
  if(monkey.isTouching(bananaGroup)) {
     monkey.changeAnimation("monkey",monkey_running);
     monkey.scale = 0.18;
  }
  if(monkey.isTouching(bananaGroup)) {
     bananaGroup.destroyEach();
     score = score + 1;
  }
  stroke("black");
  textSize(20);
  fill("black");
  survaivalTime = Math.ceil(frameCount/frameRate());
  text("Survaival Time:"+ survaivalTime,100,30);
  
  stroke("black");
  textSize(15);
  fill("black");
  text("score       = "+ score,300,30);
  
  Banana();
  stones();
  
  drawSprites();
  
}
function Banana(){
  if(World.frameCount%80===0){
    var banana=createSprite(500,Math.round(random(250,350))); 
    banana.addImage("banana",bananaImage);
    banana.velocityX=-6
    banana.lifetime=100;
    banana.scale=0.1;
    bananaGroup.add(banana);
  }
}
function stones(){
   if (frameCount % 150 === 0){
     var stone = createSprite(500,Math.round(random(460,460)));
     stone.addImage("stone",obstaceImage);
     stone.scale = 0.1;
     stone.velocityX = -4;
     stone.lifetime=100;
     stonesGroup.add(stone);
  }
}