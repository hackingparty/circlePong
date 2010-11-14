
// TODO: initialize position depending on registered rackets in this world
// TODO: initialize color depending on current index
function Racket( world, initPos ) {
    // default values
    this.DEFAULT_SIZE = 40;
    this.DEFAULT_WIDTH = 5;
    this.DEFAULT_STEP = 7;

    // constructor
    this.world = world;
    this.pos = initPos;
    this.size = this.DEFAULT_SIZE;
    this.width = this.DEFAULT_WIDTH;
    this.step = this.DEFAULT_STEP;
    world.addRacket( this );


    this.draw = function(){
	var ctx = this.world.context;

	var pstart = this.pos - this.size / 2;
	var pstop = this.pos + this.size / 2;

	/*
	console.log("pstart = " + pstart 
	    + " ; pstop = " + pstop);
	*/

	var pstart_rad = pstart * Math.PI / 180;
	var pstop_rad = pstop * Math.PI / 180;

	var map_center = this.world.map.size / 2;
	var ray = this.world.map.ray - this.width;

	ctx.save();
	ctx.strokeStyle = "#ff0000";
	ctx.fillStyle = "#ff0000";
	ctx.lineWidth = this.width;


	pstart_x = map_center + ray * Math.cos( pstart_rad );
	pstart_y = map_center + ray * Math.sin( pstart_rad );
	pstop_x = map_center + ray * Math.cos( pstop_rad );
	pstop_y = map_center + ray * Math.sin( pstop_rad );

	/*
	console.log( "map_center = " + map_center 
	    + " ; ray = " + ray
	    + " ; pstop_rad " + pstop_rad 
	    + " ; pstart_rad " + pstart_rad
	    + " )");
	*/

	ctx.beginPath();
	ctx.arc( map_center, map_center, ray, pstop_rad, pstart_rad, true );
	ctx.moveTo( pstart_x, pstart_y );
	ctx.lineTo( pstop_x, pstop_y );
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
    };
}

