let bg;
let alive;
let dead;

let pos = [30,60];

function setup() {
    createCanvas(400,200);
    bg = loadImage("background.png");
    alive = loadImage("alive.png");
    dead = loadImage("dead.png");
    imageMode(CENTER);
}

function draw() {
    image(bg,width /2, height /2);
    
    if (mouseIsPressed && isMouseOver(pos[0],pos[1]) == true){
        image(dead,pos[0],pos[1]);
    } else {
        image(alive,pos[0],pos[1]);
    }
    
    //pos[0] = mouseX;
    //pos[1] = mouseY;
    
    //image(alive,pos[0], pos[1]);
    //image(dead,width /2 + 40, height/2 + 40);
    
    //background(255,0,0);
    //  rect(mouseX,mouseY,20,20);
    
    //for (let i = 0; i <10; i++){
    //    for (let k = 0; k < 4; k++){
    //        rect(i * 30,k * 40,20,20)
    //    }
    //} 
}

function isMouseOver(x,y){
    if (dist(x,y,mouseX,mouseY) < 20){
        return true;
    } else {
        return false;
    }
    
}