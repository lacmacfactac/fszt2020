function setup() {
createCanvas(800,401);
}

function draw() {
background(255,0,0,7);
    strokeWeight(0);
    stroke(0);
    smooth();
    rectMode(CENTER);
    blendMode(DIFFERENCE);
    circle(mouseX, mouseY, 17,20);
    
    for (let i = 0; i < 10; i = i+1) {
            blendMode(OVERLAY);
        i * rect(random(width),random(height), random(0,50));
        
    }
    
}