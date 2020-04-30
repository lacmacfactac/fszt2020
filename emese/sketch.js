let bg;
let alive;
let dead;

let position = [30,60];

function setup() {
    createCanvas(400,200);
    bg = loadImage("background.png");
    alive = loadImage("alive.png");
    dead = loadImage("dead.png");
    imageMode(CENTER);
    
}

function draw() {
    image(pic, width / 2, height / 2);
    
    
    image(alive, position[0], position[1]);
    
}

function isMouseOver(){

 if(dist(x,y,mouseX, mouseY) < 20){
        
     return true;   
    } else {  
        return false;
    }


}

