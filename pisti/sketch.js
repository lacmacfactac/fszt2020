let bg;
let alive;
let dead;



let myThings = [];


function setup() {

    createCanvas(400, 200);
    bg = loadImage("BG_SKIN.png");
    alive = loadImage("MOSQ_SMALL.png");
    dead = loadImage("BLOOD.png");
    imageMode(CENTER);

    myThings.push(new Thing());

        myThings[i] = new Thing(width/2, height/2));
    }

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
        this.color = [random(255), random(255), random(255)];
        this.isAlive = true;
    }


    draw() {
        if (this.isAlive && mouseIsPressed && isMouseOver(this.position[0], this.position[1]) == true) {
            this.isAlive = false;
            myThings.push(new Thing(random(400), random(200)));
            myThings.push(new Thing(random(400), random(200)));
             score = score-2;
        }

        
        if (this.isAlive == false) {
            image(dead, this.position[0], this.position[1]);
        } else {
            image(alive, this.position[0], this.position[1]);
        }
    }
}