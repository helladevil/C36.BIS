var ballon,ballonImage1,ballonImage2;
// crea aquí la base de datos y la variable de posición 
var database;
var position;
var height = 0;

function preload(){
  bg =loadImage("Images/cityImage.png");
  ballonImage1=loadAnimation("Images/hotairballon01.png");
  balloonImage2=loadAnimation("Images/hotairballon01.png","Images/hotairballon01.png",
  "Images/hotairballon01.png","Images/hotairballon02.png","Images/hotairballon02.png",
  "Images/hotairballon02.png","Images/hotairballon03.png","Images/hotairballon03.png","Images/hotairballon03.png");
 }

//Función para configurar el entorno inicial
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  ballon=createSprite(250,650,250,650);
  ballon.addAnimation("hotairballon",ballonImage1);
  ballon.scale=0.5;

  var ballonHeight = database.ref("ballon/height");
  ballonHeight.on("value", readHeight, console.log("error"));
  textSize(20); 
}

function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateheight(-10,0);
    ballon.scale = ballon.scale-0.005;
    ballon.addAnimation(ballonImage2);
    
  }
  else if(keyDown(RIGHT_ARROW)){
    updateheight(10,0);
    ballon.scale = ballon.scale+0.005;
    ballon.addAnimation(ballonImage2);
    
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    ballon.scale = ballon.scale-0.005;
    ballon.addAnimation(ballonImage2);
    
    
  }
  else if(keyDown(DOWN_ARROW)){
    updateheight(0,10);
    ballon.scale = ballon.scale+0.005;
    ballon.addAnimation(ballonImage2);
    
    
  }
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**¡Usa las flechas del teclado para mover el globo aerostático!",40,40);

}


function updateHeight(x,y){
  database.ref('/ballon/height').update({
    'x': height.x + x ,
    'y': height.y + y
  })
}



function readHeight(data){
  // Asigna el valor de "data" como la altura
  height = data.val(); 
  // Asigna el valor de "X" e "y" de la altura a las posiciones "x" e "y" respectivas del globo
  ballon.x = height.x;
  ballon.y = height.y;
  position = data.val();
  
  ballon.x = position.x ;
  ballon.y = position.y ;

}

function showError(){
  console.log("Error la escribir en la base de datos");
}
