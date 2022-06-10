var abelha, abelhaImg;
var águia_1, águia_1Img, obstacleGroup;
var águia, águiaImg, obstacleGroup;
var enxame, enxameImg, obstacleGroup;
var floresta, florestaImg;
var PLAY = 0;
var END = 1;
var PAUSE = 2;
var gameState = PAUSE;
var score = 0;
var gameover, gameoverImg;
 
function preload(){
    abelhaImg = loadImage("abelha.png");
    águia_1Img = loadImage("águia1.png");
    águiaImg = loadImage("águia.png");
    enxameImg = loadImage("enxame.png");
    florestaImg = loadImage("fundo-floresta.jpg");
    gameoverImg = loadImage("game_over_PNG.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    floresta = createSprite(width/2,height/2.5);
    floresta.addImage("floresta", florestaImg);
    floresta.scale = 1.5;

    abelha = createSprite(width/5,height/2);
    abelha.addImage("abelha", abelhaImg);
    abelha.scale = 0.1;
    abelha.debug = false;

    obstacleGroup = new Group();
}

function draw() {
    background("white");
    drawSprites();
    
    fill("black");
    textSize(30);
    text("Pontuação: "+ score,width/2.2,50);
    score += 2;

    if(gameState == PAUSE){
        textSize(50)
        text("Aperte 'space' para começar", width/2.9, height/2 )
        floresta.velocityX = 0;
        abelha.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        obstacleGroup.setVelocityYEach(0);
        score = 0;
        
        if(keyDown("space")){
            gameState = PLAY;
        }
    }

    if(gameState == PLAY){

        if(floresta.x < 780){
            floresta.x = 1000;
        }
        floresta.velocityX = -1;
    
        if(touches.lenght > 0 || keyDown("space")){
            abelha.velocityY = -10;
            touches = [];
        }

        abelha.velocityY += 0.9;

        if(obstacleGroup.isTouching(abelha)){
            gameState = END;
            gameover = createSprite(width/2,height/2);
            gameover.addImage("gameover", gameoverImg);
            gameover.scale = 0.5;
        }

        if(abelha.y > 937 || abelha.y < -15 ){
            gameState = END;
            gameover = createSprite(width/2,height/2);
            gameover.addImage("gameover", gameoverImg);
            gameover.scale = 0.5;
        }

        if(score > 2500){
            águia.velocityX = -34;
            águia.velocityY = 6;
            águia_1.velocityX = -40;
            águia_1.velocityY = -2;
            enxame.velocityX = -60;
        }
    }
    else if(gameState == END){
        floresta.velocityX = 0;
        abelha.velocityY = 0;
        obstacleGroup.setVelocityEach(0);
        obstacleGroup.setLifetime(-1);
    }
    
    abelha.collide(obstacleGroup);
    createObs();

    abelha.setCollider("rectangle", 80, 200, 550, 800, 55);
}

function createObs(){
    if(frameCount%250 == 0){
        águia_1 = createSprite(3500,450);
        águia_1.addImage("águia_1",águia_1Img);
        águia_1.velocityX = -20;
        águia_1.velocityY = -1;
        águia_1.y = Math.round(random(height/2-300,height/2+400));
        águia_1.debug = false;
        
        águia = createSprite(2500,1000);
        águia.addImage("águia",águiaImg);
        águia.velocityX = -17;
        águia.velocityY = 3;
        águia.y = Math.round(random(height/2-500,height/2-5));
        águia.debug = false;

        enxame = createSprite(7000,450);
        enxame.addImage("enxame",enxameImg);
        enxame.velocityX = -30;
        enxame.y = Math.round(random(height/2-300,height/2+300));
        enxame.scale = 0.5;
        enxame.debug = false;

        águia.lifetime = 2000;
        águia_1.lifetime = 2000;
        enxame.lifetime = 2000;

        obstacleGroup.add(águia_1);
        obstacleGroup.add(águia);
        obstacleGroup.add(enxame);
    }
} 