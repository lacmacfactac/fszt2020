let bg;
let alive;
let dead;


let myThings = []; // hozzon letre egy ures listat


let score = 0;

// meg mielott barmi tortenne, toltse be ezeket a kepeket
function preload() {
    bg = loadImage("background.png");
    alive = loadImage("alive.png");
    dead = loadImage("dead.png");
}


function setup() {
    // csinaljon egy vasznat a bg.png dimezioi alapjan
    createCanvas(bg.width, bg.height);

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
        this.dimensions = [alive.width, alive.height];
        this.isAlive = true;
    }


    draw() {

        // ha el a thing, es az eger meg van nyomva, es meg folotte is van a kurzor
        // is mouse over atkoltozott a thing-en belulre
        if (this.isAlive && mouseIsPressed && this.isMouseOver()) {
            this.isAlive = false; // haljon meg

            // szuljon ket masikat
            myThings.push(new Thing(random(400), random(200)));
            myThings.push(new Thing(random(400), random(200)));

            // vonjon le pontot
            score = score - 2;
        }

        // rajzolja ki a megfelelo kepet, fuggoen attol, hogy elo vagy halott
        if (this.isAlive) {
            image(alive, this.position[0], this.position[1]);
        } else {
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
