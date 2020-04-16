function setup() {
createCanvas(400,200);
    rectMode(CENTER);
}

function draw() {
background(255,100,2);
 
    
    fill(0,255,0);
    noStroke();

    for (let i = 0; i < 10; i = i + 1) {
        for (let k = 0; k < 4; k = k + 1) {
            rect(i * 30, k * 40, 20, 20);
        }
    }
    
    fill(0,0,255);
    noStroke();
    
    rect(mouseX, mouseY, 20, 20);
}