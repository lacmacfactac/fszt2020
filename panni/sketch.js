function setup() {
    createCanvas(400,200);
    rectMode(CENTER);
}

function draw() {
background(240,180,180);
    fill (255);
    strokeWeight(0);
    rect(random(width), random(height), 20,20,200);
    
    fill (255);
    rect(mouseX, mouseY,20,20);
        
    
    for(let i = 0; i < 20; i = i+1){
    fill (200,240,220);
    rect(i * 30,height/2,10,40);   
    }   
    
}