var spaceship, angle,spaceshipImage,rockImage,thrustImage,play;
var grouperock,groupelaser ;
var vie;
var etat = "start";

function preload(){
  spaceshipImage = loadImage("spaceship.png");
  rockImage = loadImage("rock.png");
  thrustImage = loadImage("thrust.png");
  laserImage = loadImage("laser.png");
  nebulaImage = loadImage("nebula.png");
  playImage = loadImage("play.png");
}

function setup() {
  createCanvas(400, 400);
  
  nebula = createSprite(200,200,200,200);
  nebula.addImage(nebulaImage);
  nebula.scale = 1.2;
  
  spaceship = createSprite(200,200,40,40);
  spaceship.addAnimation("spaceship",spaceshipImage);
  spaceship.addAnimation("thrust",thrustImage);
  spaceship.scale = 0.2;
  spaceship.setCollider("circle",0,0,210);
  
  play = createSprite(200,300);
  play.addImage(playImage);  
  play.scale=0.1;
  
  angle = 90;
  
  grouperock = createGroup();
  groupelaser = createGroup();
  
  vie = 3;
}

function draw() {
  background("white");
  
  drawSprites();
  
  if(etat==="start"){
    play.visible= true;
    if(mousePressedOver(play)){
      play.visible = false;
      etat = "play";
    }
  }
  
  if(etat==="play"){
    creer_rock();
  }
  
  if(keyDown("space")){
    creer_laser();
  }
  
   //tourne le vaisseau
  spaceship.rotation = angle; 
  
  
  if(keyDown("right")){
    angle += 10;
  }
  
  if(keyDown("left")){
    angle -= 10;
    
  } 
  //avancer le vaisseau
  if(keyDown("up")){
    spaceship.velocityX = Math.cos(radians(angle))*15;
    spaceship.velocityY = Math.sin(radians(angle))*15;  
    spaceship.changeAnimation("thrust", thrustImage);
  }
  
  if(keyWentUp("up")){
   spaceship.changeAnimation("spaceship",spaceshipImage);
    
  }
  spaceship.velocityX /= 1.05;
  spaceship.velocityY /= 1.05;
  traverser(spaceship);
  
  //collision rock vaisseau
  for (var i = 0; i < grouperock.length; i++){
    //groupercok.length = longueur du grouperock
    //get(i) = rocher position i
    traverser(grouperock.get(i));
      if(grouperock.get(i).isTouching(spaceship)){
        //destroy = detruire
        grouperock.get(i).destroy(); 
        vie -=1;
      }
     
   }
  
  //collision laser rock
  for(var j = 0; j < groupelaser.length; j++){
    for (var i = 0; i < grouperock.length; i++){
      traverser(grouperock.get(i));
      if(grouperock.get(i).isTouching(groupelaser.get(j))){
        grouperock.get(i).destroy(); 
        groupelaser.get(j).destroy();
     }
    } 
  }  
  
  fill("Red");
  textFont();
  textSize(20);
  text("Vie : "+vie,37,28);
 
  
}

function creer_rock(){
  if(World.frameCount %90===0){
    var rock_posX = Math.random()*400;
    var rock_posY = Math.random()*400;
    
    var rock = createSprite(rock_posX,rock_posY,5,20);
    rock.lifetime = 400;
    rock.addImage(rockImage);
    rock.scale = 0.15;
    rock.rotationSpeed = Math.random()*5;
    rock.velocityX = Math.random()*10 -5;
    rock.velocityY = Math.random()*10 -5;
    grouperock.add(rock);
    rock.setCollider("circle",0,0,200);
    //rock.debug = true;
  }  
}   

function creer_laser(){
  if(groupelaser.length <6){
    var laser;
    laser = createSprite(spaceship.x,spaceship.y);
    laser.addImage(laserImage);
    laser.lifetime = 50;
    laser.rotation = angle; 
    groupelaser.add(laser);
    laser.scale = 0.5;
    
    laser.velocityX = Math.cos(radians(angle))*16;
    laser.velocityY = Math.sin(radians(angle))*16;  
    laser.setCollider("rectangle",0,0,130,60);
 }
}


function traverser(sprite){
  if(sprite.x > 400){
    sprite.x = 0;
  } 
    if(sprite.x < 0){
    sprite.x = 400;
  } 
     if(sprite.y > 400){
    sprite.y = 0;
  } 
     if(sprite.y < 0){
    sprite.y = 400  ;
  } 
}