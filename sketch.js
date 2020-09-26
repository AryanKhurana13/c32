const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";

function preload() {
  getBackground();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});

    //getTime();
}

function draw(){
    
    if(backgroundImg){       //only if backgroundImg exists
        background(backgroundImg);
    }
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
       // slingshot.attach(bird.body);
    }
}

async function getBackground(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");

    var responseJSON = await response.json();  //extract the data in JSON format
    console.log(responseJSON);

    var dt = responseJSON.datetime;
    console.log(dt);

    var hour = dt.slice(11, 13);
    console.log(hour);

    if(hour >= 06 && hour <= 19){
        //day background
        backgroundImg = loadImage("sprites/bg.png");
    }
    else{
        //night background
        backgroundImg = loadImage("sprites/bg2.jpg");
    }
}

/*
Arrays - data structure - holds multiple values
- []

JSON - JS Object Notation
- created inside {..}
- Multiple values of same or different data types
- {Index_name: Index_value, Index_name2: Index_value2}
- {Name: "Aryan", Age: 11, Class: "7th"}


API - Application Program Interface
API calls from a website - worltimeapi.org

fetch() 
    1. Sends a request to the website
    2. Collect the response from the website

await - makes JS wait for the statement to be completed

-JS runs synchronously - keeps jumping to the next statement after another
- await makes the specific asynchronous --> JS waits for some lines to be completed before jumping to the next

*/