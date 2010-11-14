

/*
 function cleanContext( func ){
 return function(){
 tx.saveContext();
 func();
 ctx.restoreContext();
	   }
       }*/

window.onload = function(){
    var world = new World();
    var map = new Map( world, "map");
    var hole = new Hole( world, map.size / 2, map.size / 2 );
    var ball = new Ball( world );
    var racket1 = new Racket( world );
    var racket2 = new Racket( world );
    var interval = setInterval( function() { world.tick(); }, 40 );
    //var interval = setTimeout( function() { world.tick(); }, 40 );
    document.onkeydown = function(e){ world.keydown(e); };
    document.onkeyup = function(e){ world.keyup(e); };

    world.initialize();
}

