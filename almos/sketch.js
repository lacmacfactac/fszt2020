let bg;
let alive;
let dead;


let myThings = [];

function preload() {
    bg = loadImage("background.jpg");
    alive = loadImage("alive.png");
    dead = loadImage("dead.png");
    
function setup() {

    createCanvas(bg.width, bg.height);
    imageMode(CENTER);
    bg = loadImage("background.jpg");
    alive = loadImage("alive.png");
    dead = loadImage("dead.png");
    

 myThings.push(new Thing());

}



function draw() {

    image(bg, width / 2, height / 2);
    for (let i = 0; i < myThings.length; i += 1) {
        myThings[i].draw();
    }

}


function isMouseOver(x, y) {

    if (dist(x, y, mouseX, mouseY) < 20) {
        return true;
    } else {
        return false;
    }
}





class Thing {
    constructor() {
        this.position = [random(400), random(200)];
        this.dimensions = [alive.width, alive.height];
        //this.color = [random(255), random(255), random(255)];
        this.isAlive = true;
    }


    draw() {
        if (this.isAlive && mouseIsPressed && isMouseOver(this.position[0], this.position[1]) == true) {
            this.isAlive = false;
            myThings.push(new Thing());
            myThings.push(new Thing());
        }


        if (this.isAlive == false) {
            image(dead, this.position[0], this.position[1]);
        } else {
            image(alive, this.position[0], this.position[1]);
        }
    }
}
