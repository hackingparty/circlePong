
// TODO: initialize position depending on registered rackets in this world
// TODO: initialize color depending on current index
function Racket( world ) {

    // default values
    this.DEFAULT_SIZE = 40;
    this.DEFAULT_WIDTH = 5;
    this.DEFAULT_STEP = 7;
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
	    this.pos -= this.step;
	} else if ( this.world.keys[this.world.KEY_LEFT] == true ) {
	    this.pos += this.step;
	}

	var map_center = this.world.map.size / 2;

	var pstart = this.pos - this.size / 2;
	var pstop = this.pos + this.size / 2;

	this.start.rad = pstart * Math.PI / 180;
	this.stop.rad = pstop * Math.PI / 180;

	this.start.x = map_center + this.ray * Math.cos( this.start.rad );
	this.start.y = map_center + this.ray * Math.sin( this.start.rad );
	this.stop.x = map_center + this.ray * Math.cos( this.stop.rad );
	this.stop.y = map_center + this.ray * Math.sin( this.stop.rad );

	this.dx = this.stop.x - this.start.x;
	this.dy = this.stop.y - this.start.y;
    };

    this.initialize = function() {
	this.pos = this.index * 360 / this.world.rackets.length;
	this.color = this.DEFAULT_COLOR[this.index];
    }

    this.setIndex = function( idx ) {
	this.index = idx;
    };


    // constructor
    this.size = this.DEFAULT_SIZE;
    this.width = this.DEFAULT_WIDTH;
    this.step = this.DEFAULT_STEP;
    this.world = world;
    this.pos = 0;
    this.index = 0;
    this.ray = this.world.map.ray - this.width;

    // auto-generated values
    this.start = { rad: null, x: null, y: null};
    this.stop = { rad: null, x: null, y: null};
    this.dx = null;
    this.dy = null;

    world.addRacket( this );
}

