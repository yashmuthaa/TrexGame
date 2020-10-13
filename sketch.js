var trex , trexImg , ground , groundImg , iG , obstacleGroup , ob1, ob2 , ob3 , ob4, b5 , ob6 , cL , cI  , PLAY = 1 , END = 0,gameState = PLAY , trexC , gameOver , gameOverImage ,restart,restartImage ;
function preload(){
  trexImg = loadAnimation("trex1.png","trex3.png", "trex4.png");
groundImg = loadImage("ground2.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  cI = loadImage("cloud.png");
trexC = loadImage("trex_collided.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}


function setup() {
  createCanvas(400, 400);
  trex = createSprite(50,340);
  trex.addAnimation("trexImg", trexImg);
  trex.debug=true;
  trex.setCollider("rectangle",-10,-10, 30,70)
trex.addAnimation("trexC",trexC);
  trex.scale=0.5;
  ground = createSprite(400,360);
  ground.addImage("groundImg" , groundImg);
  iG = createSprite(200,370 ,400,10);
  iG.visible = false;
  obstacleGroup = new Group();
  cL=new Group();
  gameOver = createSprite(200,200);
  gameOver.addImage(gameOverImage );
  gameOver.visible=false;
  restart = createSprite(200,250);
  restart.addImage(restartImage);
  restart.visible=false;
}

function draw() {
  background("white");
 if(gameState ===PLAY){
  trex.visible=true;
   ground.visible=true;
   ground.velocityX=-3;
     if(ground.x<0){
    ground.x = ground.width /2; }
  
  if(keyDown("space")&& trex.y >=340){
    trex.velocityY=-11;
     }
   trex.velocityY=trex.velocityY+0.8;
   spawnOb();
  spawnClouds();
   if(trex.isTouching(obstacleGroup)){
    
     gameState=END
   }
    }else if (gameState===END){
          trex.velocityY=0;
      ground.velocityX=0;
      cL.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
      cL.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
      trex.changeAnimation("trexC",trexC);
    gameOver.visible=true;
      restart.visible=true;
    
     
      
    }
  
   restartGame();
 trex.collide(iG);
 

  
  drawSprites();       
}
function spawnOb(){
 if(frameCount%60===0){
  var obstacle = createSprite(400, 350 );
   obstacle.velocityX=-3;
   var rand = Math.round(random(1,6));
   switch(rand){
       case 1: obstacle.addImage(ob1);
       break;
       case 2: obstacle.addImage(ob2);
       break;
       case 3: obstacle.addImage(ob3);
       break;
       case 4: obstacle.addImage(ob4);
       break;
       case 5: obstacle.addImage(ob5);
       break;
       case 6: obstacle.addImage(ob6);
       break;
       default:break;
       
   }
   
   
   obstacle.lifetime=200;
   obstacle.scale=0.4;
   obstacleGroup.add(obstacle);
}

}
function spawnClouds (){
 if(frameCount%60===0){
   
    var clouds = createSprite (400,200 );
  var rand=Math.round(random(150,300));
 clouds.y=rand;
   clouds.addImage(cI);
    clouds.velocityX=-3;
   clouds.depth=trex.depth;
   trex.depth++;
 clouds.lifetime=200;
  restart.depth=clouds.depth;
   restart.depth++;
   gameOver.depth=clouds.depth;
   gameOver.depth++;
   cL.add(clouds);
   
 
 }
 
  
}
function restartGame (){
 if(mousePressedOver(restart)){
   obstacleGroup.setLifetimeEach(0);
  cL.setLifetimeEach(0);
trex.visible=false;
  ground.visible=false;
   gameOver.visible=false;
   restart.visible=false;
   trex.changeAnimation("trexImg",trexImg);
   gameState=PLAY;
 } 
}