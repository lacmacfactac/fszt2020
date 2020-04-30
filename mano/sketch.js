let bg;
let alive;
let dead;


let position = [30, 60];




let myThings = [];


function setup() {

    createCanvas(400, 200);
    bg = loadImage("background mine.png");
    alive = loadImage("szemüveg 1.png");
    dead = loadImage("szemüveg 2.png");
    imageMode(CENTER);



    for (let i = 0; i < 10; i += 1) {
        myThings[i] = new Thing();
    }

}



function draw() {

    image(bg, width / 2, height / 2); // draw me the background

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
        this.color = [random(255), random(255), random(255)];
        this.isAlive = true;
    }


    draw() {
        if(this.isAlive && mouseIsPressed && isMouseOver(this.position[0], this.position[1]) == true){
            this.isAlive = false;    
            myThings.push(new Thing());
        }
        
        
        if (this.isAlive == false) {
            image(dead, this.position[0], this.position[1]);
        } else {
            image(alive, this.position[0], this.position[1]);
        }
    }

    changeColor() {
        this.color = [random(255), random(255), random(255)];
    }
}