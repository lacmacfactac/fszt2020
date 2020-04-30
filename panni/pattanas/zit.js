let backgroundImage;
let alive;
let dead;

function preload() {
    alive = loadImage("alive.png");
    dead = loadImage("dead.png");
    backgroundImage = loadImage("background.png");
}

class Zit {

    constructor() {
        this.aliveSprite = alive;
        this.deadSprite = dead;
        this.position = [random(400), random(200)];
        this.size = [this.aliveSprite.width, this.aliveSprite.height];
        this.isAlive = true;
    }

    display() {
        this.isMouseOver();
        if (this.isAlive) {
            image(this.aliveSprite, this.position[0], this.position[1]);
        } else {
            image(this.deadSprite, this.position[0], this.position[1]);
        }
    }

    isMouseOver() {
        if (this.isAlive && mouseIsPressed && dist(mouseX, mouseY, this.position[0], this.position[1]) <= this.size[0] / 2) {
            this.isAlive = false;
            zits.push(new Zit());
        }
    }

}

let zits = [];

function setup() {
    createCanvas(backgroundImage.width, backgroundImage.height);
    imageMode(CENTER);
    zits.push(new Zit());
}


function draw() {
    image(backgroundImage, width / 2, height / 2);
    for (let i = 0; i < zits.length; i++) {
        zits[i].display();
    }

}
