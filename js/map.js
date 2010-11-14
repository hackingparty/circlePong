
function Map( world, container ) {
    this.DEFAULT_SIZE = 300;
    this.DEFAULT_RAY = 140;

    this.world = world;
    this.size = this.DEFAULT_SIZE;
    this.ray = this.DEFAULT_RAY;
    this.container = document.getElementById( container );
    this.container.style.width = this.DEFAULT_SIZE;
    this.container.style.height = this.DEFAULT_SIZE;
    this.container.width = this.DEFAULT_SIZE;
    this.container.height = this.DEFAULT_SIZE;
    world.map = this;
    world.context = this.container.getContext('2d');
    world.canvas = this.container;

    this.update = function() {
	// do nothing
    };

    this.draw = function() {
	var ctx = this.world.context;
	ctx.save();

	//draw a circle
	ctx.fillStyle = "#ffffff";
	ctx.beginPath();
	ctx.arc( this.size/2, this.size/2, this.ray, 0, Math.PI*2, true );
	//		ctx.rotate(p_deg * Math.PI / 180);
	ctx.closePath();
	ctx.fill();

	ctx.restore();
    };

    this.collide = function( candidate ) {

    }
}
