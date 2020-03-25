class Thing {
    constructor(x, y, w, h) {
        this.sprite;
        this.dimensions = [w, h];
        this.position = [x, y];
        this.velocity = [0, 0];
        this.acceleration = [0, 0];
        this.drag = 1;
        this.rotation = 0;
    }

    display() {
        this.velocity = [(this.acceleration[0] + this.velocity[0]) * this.drag, (this.acceleration[1] + this.velocity[1]) * this.drag];
        this.position = [this.position[0] + this.velocity[0], this.position[1] + this.velocity[1]];
        push();
        translate(this.position[0], this.position[1]);
        rotate(this.rotation + PI / 2);
        image(this.sprite, 0, 0);
        pop();
        if (this.position[0] > canvas.width) {
            this.position[0] -= canvas.width;
        }
        if (this.position[1] > canvas.height) {
            this.position[1] -= canvas.height;
        }
        if (this.position[0] < 0) {
            this.position[0] += canvas.width;
        }
        if (this.position[1] < 0) {
            this.position[1] += canvas.height;
        }
    }

    isAbove(otherPosition = [0, 0]) {
        let diff = [otherPosition[0] - this.position[0], otherPosition[1] - this.position[1]];
        if (diff[0] <= this.dimensions[0] / 2 && diff[0] >= -this.dimensions[0] / 2 && diff[1] <= this.dimensions[1] / 2 && diff[1] >= -this.dimensions[1] / 2) {
            return true;
        } else {
            return false;
        }
    }
};

class Player extends Thing {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.immune = true;
        this.alive = true;
    }

    display() {
        super.display();
        noStroke();
        fill(0, 255, 0);
        if(millis() > 3000){
            this.immune = false;
        }
        //rect(this.position[0], this.position[1], this.dimensions[0], this.dimensions[1]);
    }
};

class Projectile extends Thing {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.life = 500;
        this.createdAt = millis();
    }

    display() {
        this.rotation = atan2(this.velocity[1], this.velocity[0]);
        super.display();
        noStroke();
        fill(255, 255, 0);
        //rect(this.position[0], this.position[1], this.dimensions[0], this.dimensions[1]);
    }

    isAlive() {
        if (millis() - this.createdAt > this.life) {
            return false;
        } else {
            return true;
        }
    }
};


class Enemy extends Thing {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.drag = 0.97;
    }

    display() {
        this.acceleration[0] = random(-.5, .5);
        this.acceleration[1] = random(-.5, .5);
        this.rotation = atan2(this.velocity[1], this.velocity[0]);
        super.display();
        noStroke();
        fill(255, 0, 0);
        //rect(this.position[0], this.position[1], this.dimensions[0], this.dimensions[1]);
    }
};




let player;
let projectiles = [];
let enemies = [];

let weaponArmed = true;

let canvas;

let virusSprite;
let immuneSprite;
let antibodySprite;
let bg;

let score = 0;
let gameOver = false;

function setup() {

    virusSprite = loadImage("Virus.png");
    immuneSprite = loadImage("Immune.png");
    antibodySprite = loadImage("Antibody.png");
    bg = loadImage("bg.jpg");

    canvas = createCanvas(400, 200);
    imageMode(CENTER);

    player = new Player(width / 2, height / 2, 20, 20);
    player.sprite = immuneSprite;

    for (let i = 0; i < 10; i++) {
        let e = new Enemy(random(width), random(height), 20, 20);
        e.sprite = virusSprite;
        enemies.push(e);
    }


}

function draw() {
    image(bg,width/2, height/2);
    fill(255);
    textAlign(RIGHT, CENTER);
    textSize(20);
    text(score, width - 10, 20);

    if (player.alive) {
        player.display();
    }
    print(projectiles.length);

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].display();
        if(player.immune == false && player.isAbove(enemies[i].position)){
            player.alive = false;
        }
    }
    for (let i = projectiles.length - 1; i >= 0; i--) {
        projectiles[i].display();

        if (projectiles[i].isAlive()) {
            for (let k = enemies.length - 1; k >= 0; k--) {
                if (enemies[k].isAbove(projectiles[i].position)) {
                    enemies.splice(k, 1);
                    projectiles.splice(i, 1);
                    score += 100;
                    break;
                }
            }
        } else {
            projectiles.splice(i, 1);
        }
    }
    if (enemies.length == 0) {
        gameOver = true;
        textAlign(CENTER, CENTER);
        textSize(40);
        fill(0, 255, 0);
        text("VÉGE\nA KARANTÉNNAK!", width / 2, height / 2);
    } else if (player.alive == false) {
        gameOver = true;
        textAlign(CENTER, CENTER);
        textSize(40);
        fill(255, 0, 0);
        text(":( :( :( :( :( :( :( :( :( :( :(\n:( :( :( :( :( :( :( :( :( :( :(\n:( :( :( :( ELHÚNYTÁL :( :( :( :(\n:( :( :( :( :( :( :( :( :( :( :(\n:( :( :( :( :( :( :( :( :( :( :(", width / 2, height / 2);

    }


}

function mousePressed() {
    if(player.alive){
    let p = new Projectile(player.position[0], player.position[1], 10, 10);
    p.sprite = antibodySprite;
    let diff = [mouseX - player.position[0], mouseY - player.position[1]];
    let magnitude = dist(0, 0, diff[0], diff[1]);
    p.velocity = [(diff[0] / magnitude) * 10, (diff[1] / magnitude) * 10];
    projectiles.push(p);
    print(projectiles);
}
    if (!gameOver) {
        score -= 10;
    }
}

function keyPressed() {
    player.acceleration = [0, 0];
    switch (key) {
        case 'w':
            player.acceleration[1] = -.1;
            break;
        case 's':
            player.acceleration[1] = .1;
            break;
        case 'a':
            player.acceleration[0] = -.1;
            break;
        case 'd':
            player.acceleration[0] = .1;
            break;
    }
}

function keyReleased() {
    player.acceleration = [0, 0];
}
