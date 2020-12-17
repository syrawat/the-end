
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var backGroundImage
var gameState = "play"
function preload(){
 
 backGroundImage=loadImage("jungle.jpg")
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkeyimg = loadAnimation("sprite_0.png")
 
}



function setup() {
createCanvas(400,400)
  
  
  
  ground=createSprite(200,380,800,5)
  ground2=createSprite(200,200)
  ground2.addImage(backGroundImage);
  fruitGroup=new Group();
  obstacleGroup=new Group();
   monkey=createSprite(50,350,10,10) 
monkey.addAnimation("running",monkey_running)
 monkey.scale=0.1

//  ground2.velocityX=-3
}


function draw() {
background("white")
drawSprites() ;
if(gameState === "play"){
camera.x = monkey.x;
camera.y = monkey.y; 
  survivaltime=Math.ceil(frameCount/frameRate())
  if(keyDown("space")){
    monkey.velocityY=-10;
  }
monkey.velocityY=monkey.velocityY+0.5  
if(keyDown("left")){
  monkey.x=monkey.x-5;
}
if(keyDown("right")){
  monkey.x=monkey.x+5;
}
monkey.collide(ground)
  if(monkey.x>400 ){
    monkey.x=100
    
  }
  if(monkey.x < 20 ){
    monkey.x=100
    
  } 
  
  switch(score){
    case 10: player.scale=0.12;
      break;
      case 20 :player.scale=0.14;
      break;
      case 30: player.scale=0.16;
      break;
      case 40: player.scale=0.18;
      break;
    default:break;
  }
     if(fruitGroup.isTouching(monkey)) {
       fruitGroup.destroyEach();
     }
      if(obstacleGroup.isTouching(monkey)){
       
        gameState = "end"
      }
  
  fruits();
  obstacle();
 
    }else if(gameState === "end"){
      monkey.velocityX=0;
      monkey.velocityY=0;
      obstacleGroup.destroyEach();
      fruitGroup.destroyEach();
      // monkey.changeAnimation("monkey",monkeyimg)
      // monkey.scale = 0.2
      monkey.destroy()
      textSize(30);
      fill("white")
      text("GAME OVER", 180,250)
    }
    
  textSize(20)
  
  text("survival time:"+survivaltime,100,50)
}
function fruits(){
  
  if(frameCount%80===0){
    fruit=createSprite(400,Math.round(random(120,200)),10,10)
    fruit.addImage(bananaImage)
    fruit.velocityX=-3
    fruit.scale=0.1
    fruit.lifetime=135
    fruitGroup.add(fruit)
  }
}
function obstacle(){
  
  if(frameCount%300===0){
    obs=createSprite(400,340,10,10)
    obs.addImage(obstacleImage)
    obs.velocityX=-3
    obs.scale=0.2
    obs.lifetime=135
    obstacleGroup.add(obs)
  }
}




