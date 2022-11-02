let mySupersantos = [];
let clicks = 0;
let analyzer;
let myMusic;
let volume = 0;
let myFont;

function preload(){
  calcetto = loadImage("./assets/images/250.jpeg");
  supersantos = loadImage("./assets/images/supersantos.png");
  myMusic = loadSound("./assets/sound/music.mp3");
  myFont = loadFont('./assets/fonts/Mattone-150.otf');
}

function setup() {
  createCanvas(windowWidth,windowHeight)

  analyzer = new p5.Amplitude();
  analyzer.setInput(myMusic);

//myMusic.play();
//myMusic.loop();
//myMusic.setVolume(0.09);


  for (let i = 0; i < 0; i++) {
    if (clicks <= 249) {
      addSupersanto();
    }
    else {
    mySupersantos[i].stop();
  }
}

}


function draw() {
  background("blue");
  
  if (myMusic.isPlaying() === false) {
    myMusic.play();
  }
  
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 100, 400);
  
  
  //calling functions
  revealAnswer();
  answered();
  
  //text
  push()
    noStroke();
    fill('white');
    textSize(80);
    textFont(myFont);
    textAlign(CENTER, CENTER);
    text(clicks, width/2, height/2);
    pop()
    push()
    noStroke();
    fill('white');
    textSize(20);
    textFont(myFont);
    text("Do you know how many thousands of Supersantos were sold on average each year from 1961 to 2021?\nClick until you find out!\n\nIf you get tired, just press 'S' to know the answer.", 50, 50);
    pop()
  
  
    //supersantos
    push()
  
    for(let i = 0; i < mySupersantos.length; i++) {
  
      mySupersantos[i].run();
  
    }
  pop()
  
  }
  
  function mousePressed() {
  addSupersanto();
  clicks ++;
  }


  
  function addSupersanto(){
  const aNewSupersanto = new Supersanto(mouseX, mouseY)
  mySupersantos.push(aNewSupersanto);
  }
  
  
  class Supersanto {
  constructor(temp_x,temp_y) {
    this.x=temp_x;
    this.y=temp_y;
  }
  
  display() {
    push();
    image(supersantos,this.x,this.y, 100, 100);
    pop();
  }
  
  updatePosition() {
    this.x += random(volume/30, -volume/30)
    this.y += random(volume/30, -volume/30)
  }
  
  run() {
    this.updatePosition();
    this.display();
  }
  }
  
  //reveal answer
  function revealAnswer() {
    if (key == 'S' || key == 's') {
    clicks = 250;

  }
  }
  
  //answered
  function answered () {
    if (clicks > 249) {
      imageMode(CENTER);
      image(calcetto,windowWidth/2, windowHeight/2, 600, 600);
      //calcetto.filter(POSTERIZE, 3);
      push()
      textAlign(CENTER);
      noStroke();
      fill('white');
      textSize(20);
      textFont(myFont);
      text("Not considering all the fake copies!",windowWidth/2, 870 );
  pop()
  }
  }
  
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }