const canvas = document.getElementById("Game");
const ctx = canvas.getContext('2d');

let speed = 7;

let tileCount = 20;
let tileSize = 25;
let x = 5;
let y = 5;

let ax = 2;
let ay = 2;

let speedx = 5;
let speedy = 5;

 var Snakegrow = function(x,y){
    this.x = x;
    this.y = y;
}
const snakegrow = []
let taillenght = 2;


var score = 0;

function drawGame(){
    snakeMove();
    
    let result = isgameover();
    if(result){
        return;
    }
    screen();
    
    collision();
    apples();
    drawSnake();
    scoreat();
    setTimeout(drawGame,1000/speed)
    

}

function isgameover(){
    let gameOver = false;

    if(x<0){
        gameOver = true
    }
    else if(x>=tileCount){
        gameOver = true
    }
    else if(y < 0){
        gameOver = true
    }
    else if(y >= tileCount){
        gameOver = true
    }
    for( var i = 0; i<snakegrow.length;i++){
        let part = snakegrow[i];
        if(part.x === x && part.y === y){
            gameOver = true;
            break;
        }
    }
    if(gameOver){
        ctx.fillStyle = 'white'
        ctx.fillText("game Over",canvas.width/3,canvas.height/3)
    }
    return gameOver;
}
function screen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}
function scoreat (){
    ctx.fillStyle = "white";
    ctx.fillText(score,canvas.width/5,canvas.height/5)
}
function drawSnake(){
    ctx.fillStyle = "purple"
    ctx.fillRect(x * tileCount,y * tileCount,tileSize,tileSize);

    ctx.fillStyle = "blue"
    for(let i = 0;i<snakegrow.length;i++){
        let part = snakegrow[i];
        ctx.fillRect(part.x * tileCount,part.y * tileCount,tileSize,tileSize)
    };

    snakegrow.push(new Snakegrow(x,y));
    if(snakegrow.length> taillenght){
        snakegrow.shift();
    }

}


function snakeMove(){
    x = x + speedx;
    y = y + speedy;
}
function apples(){
    ctx.fillStyle = "red"
    ctx.fillRect(ax * tileCount,ay * tileCount,tileSize,tileSize)
}
function collision(){
    if(ax === x && ay == y){
        ax = Math.floor(Math.random() * tileCount )
        ay = Math.floor(Math.random() * tileCount)
        taillenght++;
        score++;
    }
}



document.body.addEventListener('keydown',keydown);

function keydown(event){
    if(event.keyCode == 38){
        if(speedy ==+1){
            return;
        }
    speedy = -1;
    speedx = 0;}
    if(event.keyCode == 37){
        if(speedx ==+1){
            return;
        }
    speedy = 0;
    speedx = -1;}
    if(event.keyCode == 39){
        if(speedx ==-1){
            return;
        }
        speedy = 0;
        speedx = +1;}
        if(event.keyCode == 40){
            if(speedy ==-1){
                return;
            }
            speedy = +1;
            speedx = 0;}
    
}

drawGame();