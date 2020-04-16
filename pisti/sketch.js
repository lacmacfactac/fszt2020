function setup() {
    createCanvas(1000,500);
}

function draw() {
    background(233,120,0);
    rect(mouseX,mouseY,20,20);
    
    fill(0,20,20);
    noStroke();
    
    for (let i = 0; i < 50; i = i+1) {
       for (let k = 0; k < 40; k = k + 1) {
           fill(0,100,120);
           noStroke();
            rect(i*30, k*40, 20,20);
       }
    }
    
}