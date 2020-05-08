let bg;
let alive;
let dead;

let myThings = []; // hozzon letre egy ures listat

let score = 0;
let drag = 0.95;



let speedScale = 1;



// meg mielott barmi tortenne, toltse be ezeket a kepeket
function preload() {
    bg = loadImage("background.png");
    alive = loadImage("alive.png");
    dead = loadImage("dead.png");
}


function setup() {
    // csinaljon egy vasznat a bg.png dimezioi alapjan
    createCanvas(min(bg.width, window.innerWidth), min(bg.height, window.innerHeight));

    // innentol minden kepet kozepre igazitva jelenitsen meg
    imageMode(CENTER);

    // toljon egy uj elemet a lista vegere
    myThings.push(new Thing(width / 2, height / 2));

}



function draw() {
    // rajzolja meg a hatteret
    image(bg, width / 2, height / 2);

    // i kezdodjon nullanal
    // amig i kisebb, mint a listank hossza
    // fusson a kozbenso kod
    // novelje az i-t eggyel
    for (let i = 0; i < myThings.length; i += 1) {

        // es minden elemen futtassa le a sajat draw funkciojat
        myThings[i].draw();
    }

    // igazitsa a szoveget vizszintesen jobbra, fuggolegesen kozepre
    textAlign(RIGHT, CENTER);

    // irja ki a pontszamot a megadott koordinatakon
    text("Score: " + score, width - 10, 10);
}




class Thing {

    // kotelezo function, ez hozza letre az objektumunkat, amikor azt irjuk  hogy "new Thing(x,y)"
    constructor(posX, posY) {
        this.position = [posX, posY];
        this.velocity = [random(-1,1),random(-1,1)];
        this.accel = [random(-1,1), random(-1,1)];
        this.dimensions = [alive.width, alive.height];
        this.isAlive = true;
    }


    draw() {
        // ha el a thing, es az eger meg van nyomva, es meg folotte is van a kurzor
        // is mouse over atkoltozott a thing-en belulre
        if (this.isAlive && mouseIsPressed && this.isMouseOver()) {
            this.isAlive = false; // haljon meg

            // szuljon ket masikat
            myThings.push(new Thing(random(width), random(height)));
            myThings.push(new Thing(random(width), random(height)));

            // vonjon le pontot
            score = score - 2;
        }
        

        // rajzolja ki a megfelelo kepet, fuggoen attol, hogy elo vagy halott
        if (this.isAlive) {
            
            // mivel csak az elo dolgok mozognak:
            
            // generaljon uj gyorsulas erteket az x es y iranyra
            this.accel[0] = random(-1,1);
            this.accel[1] = random(-1,1);
            
            // surlodast szimulalando szorozza meg a sebesseget a surlodas mertekevel (1-nel kisebb ertek, szoval a sebesseg mindig csokkenni fog)
            this.velocity[0] *= drag;
            this.velocity[1] *= drag;
            
            // adja hozza a sebesseghez a gyorsulast
            this.velocity[0] += this.accel[0];
            this.velocity[1] += this.accel[1];
            
            // adja hozza a poziciohoz a sebesseget
            this.position[0] += this.velocity[0]*speedScale;
            this.position[1] += this.velocity[1]*speedScale;
            
            // vizsgalja meg, hogy a pozicio kivul esik e a vaszon hatarain (0 ... width, 0 ... height)
            // es ha igen, helyezze at a vaszon atellene oldalara
            if(this.position[0] > width){
                this.position[0] -= width;
            }
            if(this.position[1] > height){
                this.position[1] -= height;
            }
            if(this.position[0] < 0){
                this.position[0] += width;
            }
            if(this.position[1] < 0){
                this.position[1] += height;
            }
            
            image(alive, this.position[0], this.position[1]);
        } else {
            
            // halott dolognal nincs mas dolgunk, mint kirajzolni
            image(dead, this.position[0], this.position[1]);
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
