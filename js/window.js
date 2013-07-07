var win = function()
{
    this.width = 0;
    this.height = 0;
    this.x = 0;
    this.y = 0;
    
    this.startUpWin = function(text, character, x, y, z, width, height)
    {
        this.text = text;
        this.character = character;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        var winBorder = new Image();
        winBorder.src = 'Graphics/Windowskins/shadowborder.png';
        context.drawImage(); 
    };
    
    this.shutdownWin = function()
    {
        this.shutdownWin();  
    };
    
};