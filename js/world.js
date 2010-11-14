
function World() {
    this.MODE_INTRO = 0;
    this.MODE_CONFIG = 1;
    this.MODE_GAME = 2;
    this.MODE_END_VICTORY = 3;
    this.MODE_END_DEFEAT = 4;

    this.KEY_LEFT = 37;
    this.KEY_RIGHT = 39;
    this.KEY_UP = 38;
    this.KEY_DOWN = 40;

    this.balls = [];
    this.holes = [];
    this.rackets = [];
    this.map = null;
    this.context = null;
    this.canvas = null;
    this.keys = [];

    this.ACTION_RACKET1_MOVE_LEFT = 0;
    this.ACTION_RACKET1_MOVE_RIGHT = 1;
    this.ACTION_RACKET2_MOVE_LEFT = 2;
    this.ACTION_RACKET2_MOVE_RIGHT = 3;

    this.addBall = function( elem ){
	this.balls[ this.balls.length ] = elem;
    }

    this.addHole = function( elem ){
	this.holes[ this.holes.length ] = elem;
    }

    this.addRacket = function( elem ){
	this.rackets[ this.rackets.length ] = elem;
    }

    this.keydown = function( e ){
	var e = window.event || e;
	//alert("keycode " + e.keyCode);
	this.keys[e.keyCode] = true;
    }

    this.keyup = function( e ){
	var e = window.event || e;
	//alert("keycode " + e.keyCode);
	this.keys[e.keyCode] = false;
    }

    this.tick = function() {
	this.update();
	this.collide();
	this.draw();
    }


    this.update = function() {
	// console.log("World.update - " + this);
	// console.log("World.update -- start !");

	// get all registered objects & update everybody
	// console.log("World.update -- stop !");

	this.map.update();
	for( var i = 0; i < this.balls.length ; i++ ) {
	    this.balls[i].update();
	}
	for( var i = 0; i < this.rackets.length ; i++ ) {
	    this.rackets[i].update();
	}
    };

    this.draw = function() {
	this.map.draw();
	for( var i = 0; i < this.holes.length ; i++ ) {
	    this.holes[i].draw();	
	}
	for( var i = 0; i < this.balls.length ; i++ ) {
	    this.balls[i].draw();	
	}
	for( var i = 0; i < this.rackets.length ; i++ ) {
	    this.rackets[i].draw();	
	}
    }; 

    this.collide = function() {
	for( var i = 0; i < this.balls.length ; i++ ) {
	    this.balls[i].collide();
	}
    }
}
