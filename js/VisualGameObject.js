function VisualGameObject()
{
    this.image = null;
    
    this.draw = function(/**Number*/ dt, /**CanvasRenderingContext2D*/ context, /**Number*/ xScroll, /**Number*/ yScroll)
    {
        context.drawImage(this.image, this.x, this.y);
    };
    
    this.startupVisualGameObject = function(/**Image*/ image, /**Number*/ x, /**Number*/ y, /**Number*/ z)
    {
        this.startupGameObject(x, y, z);
        this.image = image;
        return this;
    };
    
    this.shutdownVisualGameObject = function()
    {
        this.shutdownGameObject();
    };
}
VisualGameObject.prototype = new GameObject;