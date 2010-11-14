
function Hole( world, x,y ) {
    this.DEFAULT_SIZE = 12;

    this.update = function(){
	// do nothing
    };

    this.draw = function(){
	// do nothing
	var ctx = this.world.context;
	ctx.save();

	//draw a circle
	ctx.fillStyle = "#cccccc";
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();

	ctx.restore();
    };

    this.collide = function( candidate ) {
	// do nothing
    };

    this.setIndex = function( idx ) {
	this.index = idx;
    };


    // constructor
    this.world = world;
    this.x = x;
    this.y = y;
    this.size = this.DEFAULT_SIZE;
    this.index = 0;

    world.addHole( this );
}


