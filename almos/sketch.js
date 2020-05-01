let bg;
let alive;
let dead;


let myThings = [];

function preload() {
    bg = loadImage("background.jpg");
    alive = loadImage("alive.png");
    dead = loadImage("dead.png");

}

function setup() {

    createCanvas(min(bg.width, window.innerWidth), min(bg.height, window.innerHeight));
    imageMode(CENTER);


    myThings.push(new Thing());

}



function draw() {

    image(bg, width / 2, height / 2);
    for (let i = 0; i < myThings.length; i += 1) {
        myThings[i].draw();
    }

}





class Thing {
    constructor() {
        this.position = [random(width), random(height)];
        this.dimensions = [alive.width, alive.height];
        //this.color = [random(255), random(255), random(255)];
        this.isAlive = true;
    }


    draw() {
        if (this.isAlive && mouseIsPressed && this.isMouseOver() == true) {
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

    isMouseOver() {

        /*
        POSx - DIMx/2 < MouseX < POSx + DIMx/2
        POSy - DIMy/2 < MouseY < POSy + DIMy/2
        */

        if (mouseX > this.position[0] - this.dimensions[0] / 2 &&
            mouseX < this.position[0] + this.dimensions[1] / 2 &&
            mouseY > this.position[1] - this.dimensions[1] / 2 &&
            mouseY < this.position[1] + this.dimensions[1] / 2) {
            return true;
        } else {
            return false;
        }
    }
}
