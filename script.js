const FPS = 40; // frames per second
const SHIPE_SIZE = 30;
const TURN_SPEED = 360;
const SHIP_THRUST = 3; // accel pixel per pixel
const FRICTION = 0.7;
const ROID_NUM = 3; // starting number of asteroids

/** @type {HTMLCanvasElement} */
var canv = document.getElementById("gameCanvas");
var ctx = canv.getContext("2d");

var ship = {
    x: canv.width/2, 
    y: canv.height/2,
    r: SHIPE_SIZE/2, 
    a: 90 / 180*Math.PI, 
    rot: 0, 
    thrusting: false, 
    thrust: {
        x: 0, 
        y: 0
    }
}

// set up asteroids 
var roids = [];
// createAsteroidBelt();




// set up event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);


// Set up the game loop
setInterval(update, 1000/FPS)


// function createAsteroidBelt(){
//     roid = [];
//     for (var i = 0; i < ROID_NUM; i++){
//         roids.push(newAsteroid());
//     };
// }



function keyDown(/** @type {KeyboardEvent}*/ ev){
    switch(ev.keyCode){
        case 37: // left
            ship.rot = TURN_SPEED / 180 * Math.PI / FPS;
            break;
        case 38: // up
            ship.thrusting = true;
            break;
        case 39: // right
            ship.rot = -TURN_SPEED / 180 * Math.PI / FPS;
            break;
    }


}

function keyUp(/** @type {KeyboardEvent}*/ ev){
    switch(ev.keyCode){
        case 37: // stop left
            ship.rot = 0;
            break;
        case 38: // up
            ship.thrusting = false;
            break;
        case 39: // right
            ship.rot = 0;
            break;
    }


}

// funtion newAsteroid(x, y){
//     var roid = {
//         x: x,
//         y:y, 


//     };
// }

function update(){
    // draw space background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height)

    // thrust ship
    if (ship.thrusting){
        ship.thrust.x += SHIP_THRUST * Math.cos(ship.a)/FPS;
        ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a)/FPS;

        // draw the thruster
        ctx.fillStyle = 'blue';
        ctx.strokeStyle = "red";
        ctx.lineWidth = SHIPE_SIZE/10;
        ctx.beginPath();
        ctx.moveTo( // rear left
            ship.x - ship.r * (2/3*Math.cos(ship.a) + 0.5*Math.sin(ship.a)),
            ship.y + ship.r * (2/3*Math.sin(ship.a) - 0.5*Math.cos(ship.a))
        );
        ctx.lineTo( // rear center
            ship.x - ship.r * (5 / 3 * Math.cos(ship.a)),
            ship.y + ship.r * (5 / 3 * Math.sin(ship.a))

        )
        ctx.lineTo( // rear right
            ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - 0.5*Math.sin(ship.a)),
            ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + 0.5*Math.cos(ship.a))

        )
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

    } else{
        ship.thrust.x -= FRICTION*ship.thrust.x/FPS;
        ship.thrust.y -= FRICTION*ship.thrust.y/FPS;
    }

    // draw triangle ship
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.lineWidth = SHIPE_SIZE/20;
    ctx.beginPath();
    ctx.moveTo( // nose ship
        ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
        ship.y - 4 / 3 * ship.r * Math.sin(ship.a)
    );
    ctx.lineTo( // rear left
        ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + Math.sin(ship.a)),
        ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - Math.cos(ship.a))

    )
    ctx.lineTo( // rear right
        ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - Math.sin(ship.a)),
        ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + Math.cos(ship.a))

    )
    ctx.closePath();
    ctx.fill();
    ctx.stroke();


    // rotate ship
    ship.a += ship.rot;

    // move ship
    ship.x += ship.thrust.x;
    ship.y += ship.thrust.y;

    // handle edge of the screen
    if (ship.x < 0 - ship.r){
        ship.x = canv.width + ship.r;
    } else if (ship.x > canv.width + ship.r){
        ship.x = 0 - ship.r;
    }

    if (ship.y < 0 - ship.r){
        ship.y = canv.height + ship.r;
    } else if (ship.y > canv.height + ship.r){
        ship.y = 0 - ship.r;
    }


    // ceter dot
    ctx.fillStyle = "red";
    // ctx.fillRect(ship.x-1, ship.y-1, 2, 2)
}