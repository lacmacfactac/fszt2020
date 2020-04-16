function setup() {
    createCanvas(400,200);
    rectMode(CENTER);
}

function draw() {
    background(255,0,0);
    rect(mouseX,mouseY,20,20);
    
    for (let i = 0; i <10; i++){
        for (let k = 0; k < 4; k++){
            rect(i * 30,k * 40,20,20)
        }
    }
}