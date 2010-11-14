
// TODO: increase ball speed with time

function Ball( world, x, y ) {
    // default values
    this.DEFAULT_SPEED = 7;
    this.DEFAULT_SIZE = 5;
    this.DEFAULT_DIRECTION = 0;

    // methods
    this.update = function() {
	var dx = Math.cos( this.direction ) * this.speed;
	var dy = Math.sin( this.direction ) * this.speed;

	this.x += dx;
	this.y += dy;
    };

    this.draw = function(){
	var ctx = this.world.context;
	ctx.save();

	//draw a circle
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	var bs2 = this.size / 2;
	ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();

	ctx.restore();
    };

    this.collide = function( candidate ) {
	// collision with the map
	// => distance from the center is greater than map ray
	var map_center = this.world.map.size / 2;
	var map_ray = this.world.map.ray;
	var dist = Math.sqrt( (map_center - this.x) * (map_center - this.x) 
	    + (map_center - this.y) * (map_center - this.y) );
	if ( dist > map_ray ) {
	    this.direction += Math.PI;

	    // fix position
	    var dx = Math.cos( this.direction ) * ( dist - map_ray );
	    var dy = Math.sin( this.direction ) * ( dist - map_ray );

	    this.x += dx;
	    this.y += dy;
	}


	// do nothing
    };

    this.setIndex = function( idx ) {
	this.index = idx;
    };

    this.initialize = function() {
	// do nothing
    }

    // constructor
    this.world = world;

    // initial position
    this.x = world.map.size / 2;
    this.y = world.map.size / 2;

    // initial movement
    this.direction = Math.random() * 2 * Math.PI;
    this.speed = this.DEFAULT_SPEED;
    this.size = this.DEFAULT_SIZE;
    this.index = 0;

    // console.log( "Ball.new( x = " + this.x  + " ; y = " + this.y 
    //	+ " ; direction = " + this.direction + " ; speed = " + this.speed + " )");

    world.addBall( this );
}
