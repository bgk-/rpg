/**
    A class that display a repeating texture that can optionall be offset in either
    the x or y axis
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
*/
var map = function ()
/*
{   
    put tiled map in the startupMap function.
*/

{

	this.width = 0;

    this.height = 0;

    this.scrollFactor = 1;
	
    this.startupMap = function(image, x, y, z, width, height, scrollFactor)
    {
        this.startupVisualGameObject(image, x, y, z);
        this.width = width;
        this.height = height;
        this.scrollFactor = scrollFactor;
        return this;        
    };

    this.shutdownstartupMap = function()
    {
        this.shutdownMap();
    };

    this.draw = function(dt, context, xScroll, yScroll)
    {        
        var playerX = this.player.mapX;
        var playerY = this.player.mapY;
        
        var canvasW = context.canvas.width;
        var canvasH = context.canvas.height;
        
        var mapX = playerX - canvasW / 2;
        var mapY = playerY - canvasH / 2;
        
        // draw the image
        
        context.drawImage(this.image, mapX, mapY, canvasW, canvasH, 0, 0, canvasW, canvasH);        
    };
        
};

map.prototype = new VisualGameObject();