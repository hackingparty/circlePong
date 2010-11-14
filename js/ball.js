
// TODO: increase ball speed with time

function Ball( world, x, y ) {
    // default values
    this.DEFAULT_SPEED = 7;
    this.DEFAULT_SIZE = 5;
    this.DEFAULT_DIRECTION = 0;
    this.COLLISION_EPSILON = 1/1000;

    // methods
    this.update = function() {
	this.dx = Math.cos( this.direction ) * this.speed;
	this.dy = Math.sin( this.direction ) * this.speed;

	this.x += this.dx;
	this.y += this.dy;
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

    this.collide = function() {
	var map_center = this.world.map.size / 2;
	var map_ray = this.world.map.ray;
	var dist_to_center = Math.sqrt( (map_center - this.x) * (map_center - this.x) 
	    + (map_center - this.y) * (map_center - this.y) );

	// test collision with rackets
	for (var ridx = 0; ridx < this.world.rackets.length; ridx++){
	    var racket = this.world.rackets[ridx];

	    // previous ball position
	    var prev = { 
		x : this.x - this.dx , 
		y : this.y - this.dy 
	    };

	    // intersection  is
	    //   inter = prev + u1 ( this - prev )
	    // and also
	    //   inter = racket.start + u2 ( racket.stop - racket.start )
	    
	    // means that
	    //   prev + u1 ( this - prev ) = racket.start + u2 ( racket.stop - racket.start )
	    
	    // solving that :
	    var det = racket.dy * this.dx - racket.dx * this.dy;
	    
	    // if parallels, skip this racket
	    if ( det < this.COLLISION_EPSILON ) {
		// console.log("skip racket ( det ) " + ridx);
		continue;
	    }
	    //console.log("racket " + ridx + " det = " + det);

	    var u1 = ( racket.dx * ( prev.y - racket.start.y ) - racket.dy * ( prev.x - racket.start.x ) ) / det;
	    var u2 = ( this.dx * ( prev.y - racket.start.y ) - this.dy * ( prev.x - racket.start.x ) ) / det;
	    // if out of bounds, skip this racket
	    if ( ( u1 < 0 ) || ( u1 > 1 ) || ( u2 < 0 ) || ( u2 > 1 ) ) {
		// console.log("skip racket ( bounds ) " + ridx);
		continue;
	    }
	    
	    // haha, we got a collision !
	    // console.log("u1 = "  + u1 );
	    // console.log("u2 = " + u2 );
	    // console.log("collision with racket idx = " + ridx);


	    // fix ball location
	    var intersec = {
		x : racket.start.x + u2 * racket.dx,
		y : racket.start.y + u2 * racket.dy
	    };
	    // intersection + ball size + fix
	    // console.log("inter.x = " + intersec.x + " ; inter.y = " + intersec.y);
	    // console.log("this.dx = " + this.dx + " ; this.dy = " + this.dy);
	    this.x = intersec.x - (1 - u1) * this.dx;
	    this.y = intersec.y - (1 - u1) * this.dy;
	    // console.log("fixed.x = " + this.x + " ; fixed.y = " + this.y);

	    // new direction is the opposite of mirror direction of the ball given racket position
	    this.direction = ( 2 * racket.center.rad)  - ( this.direction + Math.PI );
	    if (this.direction < 0) {
		this.direction = this.direction % ( 2 * Math.PI );
	    }
	}	    

	// collision with the map
	// => distance from the center is greater than map ray
	if ( dist_to_center > map_ray ) {
	    var ball_angle = Math.atan2( this.y - map_center, this.x - map_center );
	    this.direction = 2 * ball_angle - this.direction + Math.PI;
	    if (this.direction < 0) {
		this.direction = this.direction % ( 2 * Math.PI );
	    }

	    var dx = Math.cos( this.direction ) * ( dist_to_center - map_ray );
	    var dy = Math.sin( this.direction ) * ( dist_to_center - map_ray );

	    this.x += dx;
	    this.y += dy;
	}
    };

    this.setIndex = function( idx ) {
	this.index = idx;
    };

    this.initialize = function() {
	// initial position
	this.x = world.map.size / 2;
	this.y = world.map.size / 2;
    }

    // constructor
    this.world = world;

    // initial movement
    this.direction = Math.random() * 2 * Math.PI;
    this.speed = this.DEFAULT_SPEED;
    this.size = this.DEFAULT_SIZE;
    this.index = 0;

    // console.log( "Ball.new( x = " + this.x  + " ; y = " + this.y 
    //	+ " ; direction = " + this.direction + " ; speed = " + this.speed + " )");

    // auto-generated values
    this.x = null;
    this.y = null;
    this.dy = null;
    this.dx = null;

    world.addBall( this );
}
