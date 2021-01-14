var path,boy,cash,diamonds,jewellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;

var treasureCollection = 0;

var cashG,diamondsG,jewelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload()
{
      pathImg = loadImage("Road.png");
      boyImg = loadAnimation("Runner-1.png","Runner-2.png");
      cashImg = loadImage("cash.png");
      diamondsImg = loadImage("diamonds.png");
      jewelleryImg = loadImage("jwell.png");
      swordImg = loadImage("sword.png");
      endImg =loadAnimation("gameOver.png");
}

function setup()
{
  
      createCanvas(windowWidth,windowHeight);
  
      // Moving background
      path=createSprite(width/2,200);
      path.addImage(pathImg);
      path.velocityY = 4;


      //creating boy walking
      boy = createSprite(width/2,height-20,20,20);
      boy.addAnimation("BoyRunning",boyImg);
      boy.scale=0.08;

      //grouping
      cashG=new Group();
      diamondsG=new Group();
      jewelleryG=new Group();
      swordGroup=new Group();

}

function draw() 
{

        if(gameState===PLAY)
        {

        //background
        background(0);
        boy.x = World.mouseX;

        //edges
        edges= createEdgeSprites();
        boy.collide(edges);

        //reseting the background
        if(path.y > height )
        {
          path.y = height/2;
        }

        createCash();
        createDiamonds();
        createJewellery();
        createSword();

        //functions to be processed
        if (cashG.isTouching(boy)) 
        {
          cashG.destroyEach();
          treasureCollection=treasureCollection + 50;
        }
        else if (diamondsG.isTouching(boy)) 
        {
          diamondsG.destroyEach();
          treasureCollection=treasureCollection + 100;

        }else if(jewelleryG.isTouching(boy)) 
        {
          jewelleryG.destroyEach();
          treasureCollection= treasureCollection + 150;

        }else{
          if(swordGroup.isTouching(boy)) 
          {
        gameState=END;
        
        //animation
        boy.addAnimation("BoyRunning",endImg);
        boy.x=width/2;
        boy.y=height/2;
        boy.scale=0.6;
        
        //destroying objects when touched
        cashG.destroyEach();
        diamondsG.destroyEach();
        jewelleryG.destroyEach();
        swordGroup.destroyEach();
        
        //adding velocity after ending
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jewelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
         if(mousePressedOver(endImg))
         {
         reset();
         }
         }

  }
  
      drawSprites();

      textSize(20);
      fill(255);
      text("Treasure: "+ treasureCollection,width-150,30);
      }
}

function reset()
{ 
  gameState= PLAY;
  gameOver.visible= false;
  cashG.destroyEach();
  jewelleryGroup.destroyEach();
  diamondGroup.destroyEach();
  treasureCollection= 0;
}

//creating cash
function createCash() 
{
      if (World.frameCount % 200 == 0)
      {
      var cash =createSprite(Math.round(random(50,width-50),40,10,10));
      cash.addImage(cashImg);
      cash.scale=0.12;
      cash.velocityY =3;
      cash.lifetime = 150;
      cashG.add(cash);
      }
}

//creating diamonds
function createDiamonds() 
{
      if (World.frameCount % 320 == 0) 
      {
      var diamonds =createSprite(Math.round(random(50,width-50),40,10,10));
      diamonds.addImage(diamondsImg);
      diamonds.scale=0.03;
      diamonds.velocityY = 3;
      diamonds.lifetime = 180;
      diamondsG.add(diamonds);
      }
}

//creating jewellery
function createJewellery()
{
      if (World.frameCount % 410 == 0) 
      {
      var jewellery =createSprite(Math.round(random(50,width-50),40,10,10));
      jewellery.addImage(jewelleryImg);
      jewellery.scale=0.13;
      jewellery.velocityY =3;
      jewellery.lifetime = 180;
      jewelleryG.add(jewellery);
      }
}

//creating sword
function createSword()
{
      if(World.frameCount % 530 == 0) 
      {
      var sword =createSprite(Math.round(random(50,width-50),40,10,10));
      sword.addImage(swordImg);
      sword.scale=0.1;
      sword.velocityY =3;
      sword.lifetime = 180;
      swordGroup.add(sword);
      }
}
