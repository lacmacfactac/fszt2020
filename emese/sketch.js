function setup() {
    createCanvas(400,200);
    rectMode(CENTER);
}

function draw() {
    background(167,175,216);
    
    
    for (let i = 0; i < 10; i = i + 1) {
        for (let k = 0; k < 4; k = K + 1) {
            rect(i * 30, k * 40, 20, 20);
    }
    
}
    fill(0,0,255);
    noStroke();
    
    rect(mouseX, mouseY,20,20);
}