
// TODO: initialize positionition depending on registered rackets in this world
// TODO: initialize color depending on current index
function Racket( world ) {

    // default values
    this.DEFAULT_SIZE = 40 * (Math.PI / 180);  // in radians
    this.DEFAULT_WIDTH = 5;
    this.DEFAULT_ACCELERATION = 2; // in radians / sec * sec
    this.DEFAULT_VELOCITY = 7 * (Math.PI / 180); // in radians / sec
    this.DEFAULT_COLOR = [ "#ff0000", "#00ff00", "#0000ff", 
	"#ffff00", "#00ffff", "#ff00ff",
	"#ffaa00", "#00ffaa", "#aa00ff",
	"#aaff00", "#00aaff", "#ff00aa",
	];

    // methods
    this.draw = function(){
	var ctx = this.world.context;
	var map_center = this.world.map.size / 2;

	ctx.save();
	ctx.strokeStyle = "#000000"; //this.color;
	ctx.fillStyle = this.color;
	ctx.lineWidth = this.width;

	// console.log( "map_center = " + map_center + " ; ray = " + ray
	//  + " ; pstop_rad " + this.stop.rad + " ; this.start.rad " + this.start.rad + " )");

	ctx.beginPath();
	ctx.arc( map_center, map_center, this.ray, this.stop.rad, this.start.rad, true );
	ctx.moveTo( this.start.x, this.start.y );
	ctx.lineTo( this.stop.x, this.stop.y );
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	ctx.restore();
    };

    this.update = function(){
	if ( this.world.keys[this.world.KEY_RIGHT] == true ) {
	    this.setCenter( this.center.rad - this.velocity );
	} else if ( this.world.keys[this.world.KEY_LEFT] == true ) {
	    this.setCenter( this.center.rad + this.velocity );
	}

    };

    this.initialize = function() {
	this.setCenter( this.index * 2 * Math.PI / this.world.rackets.length );
	this.color = this.DEFAULT_COLOR[this.index];
    }

    this.setIndex = function( idx ) {
	this.index = idx;
    };

    this.setCenter = function( angle_rad ) {
	var map_center = this.world.map.size / 2;

	this.center.rad = angle_rad;
	this.start.rad = this.center.rad - this.size / 2;
	this.stop.rad = this.center.rad + this.size / 2;

	this.start.x = map_center + this.ray * Math.cos( this.start.rad );
	this.start.y = map_center + this.ray * Math.sin( this.start.rad );
	this.stop.x = map_center + this.ray * Math.cos( this.stop.rad );
	this.stop.y = map_center + this.ray * Math.sin( this.stop.rad );

	this.center.x = (this.start.x + this.stop.x) / 2;
	this.center.y = (this.start.y + this.stop.y) / 2;

	this.dx = this.stop.x - this.start.x;
	this.dy = this.stop.y - this.start.y;
    }

    // constructor
    this.size = this.DEFAULT_SIZE;
    this.width = this.DEFAULT_WIDTH;
    this.velocity = this.DEFAULT_VELOCITY;
    this.world = world;
    this.index = 0;
    this.ray = this.world.map.ray - this.width;

    // auto-generated values
    this.start = { rad: null, x: null, y: null};
    this.stop = { rad: null, x: null, y: null};
    this.center = { rad: null, x: null, y: null };
    this.dx = null;
    this.dy = null;

    world.addRacket( this );
}

