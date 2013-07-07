function Player()
{
    this.speed = 85;
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    
    this.mapX = 0;
    this.mapY = 0;
    this.loadX = 0;
    this.loadY = 0;

    //if player starts at edges of map, move player not map.
    this.startupPlayer = function(loadX, loadY)
    {
        this.mapY = loadY;
        this.mapX = loadX;
        this.mapW = 2560;
        this.mapH = 1600;
        this.loadY = loadY;         
        //move playerY up when loaded to screen if not centered
        if (this.loadY <= window.innerHeight / 2)
        {
            this.y = this.loadY;
            this.mapY = window.innerHeight / 2 + 5;
            console.log('up');
        }
        //move playerY down when loaded to screen if not centered
        else if (this.loadY >= this.mapH - window.innerHeight / 2)
        {
            this.y = window.innerHeight - (this.mapH - this.mapY);
            this.mapY = this.mapH - window.innerHeight / 2 - 5;
            console.log('down');
        }
        else
        {
            this.mapY = this.loadY;
            this.y = window.innerHeight / 2;
        }
        
        this.loadX = loadX;
        //move playerX to left when loaded to screen if not centered
        if (this.loadX <= window.innerWidth / 2 )
        {
            this.x = this.loadX;
            this.mapX = window.innerWidth / 2 + 5;
            console.log('left');
        }
        //move playerX to right when loaded to screen if not centered
        else if (this.loadX >= this.mapW - window.innerWidth / 2)
        {
            this.x = window.innerWidth - (this.mapW - this.mapX);
            this.mapX = this.mapW - window.innerWidth / 2 - 5; 
            console.log('right');
        }
        else
        {
            this.mapX = this.loadX;
            this.x = window.innerWidth / 2;
        }
        console.log(this.x + ' ' + this.y);
        this.startupAnimatedGameObject(AlasdairDownIdle, this.x, this.y, 4, 1, 10);
        return this;
    };

/*
    this.startupPlayer = function(mapX, mapY)
    {
        this.mapX = mapX;
        this.mapY = mapY;
        
        this.startupAnimatedGameObject(AlasdairDownIdle, window.innerWidth / 2, window.innerHeight / 2, 4, 1, 10);
        return this;
    };
*/
    this.keyDown = function(event)
    {
        var updateRequired = false;
        
        if (event.keyCode == 16)
        {
            this.speed = 150;
        }
        
        if (event.keyCode == 37 && !this.left)
        {
            this.left = true;
            updateRequired = true;
            this.setAnimation(AlasdairLeft, 4, 10);
            this.right=false;
            this.up = false;
            this.down = false;
        }
        
        if (event.keyCode == 39 && !this.right)
        {
            this.right = true;
            updateRequired = true;
            this.setAnimation(AlasdairRight, 4, 10);
            this.left = false;
            this.up = false;
        }
        
        if (event.keyCode == 38 && !this.up)
        {
            this.up = true;
            updateRequired = true;
            this.setAnimation(AlasdairUp, 4, 10);
            this.down = false;
            this.right = false;
            this.left = false;
        }

        if (event.keyCode == 40 && !this.down)
        {
            this.down = true;
            updateRequired = true;
            this.setAnimation(AlasdairDown, 4, 10);            
            this.up = false;
            this.left = false;
            this.right = false;
        }
        if (updateRequired)
            this.updateAnimation();


    };

    this.keyUp = function(event)
    {
        if (event.keyCode == 16)
        {
            this.speed = 75;
        }
        
        // left
        if (event.keyCode == 37)
        {
            this.left = false;
            this.setAnimation(AlasdairLeftIdle, 1, 10);             
        }
        // right
        if (event.keyCode == 39)
        {
            this.right = false;
            this.setAnimation(AlasdairRightIdle, 1, 10);
        }

        if (event.keyCode == 38)
        {
            this.up = false;
            this.setAnimation(AlasdairUpIdle, 1, 10);
        }
        
        if (event.keyCode == 40)
        {
            this.down = false;
            this.setAnimation(AlasdairDownIdle, 1, 10);
        }
        this.updateAnimation();
    };

    /**
        Updates the current animation depending on the movement
        of the player. This accounts for the fact that both
        the left and right arrow keys can be pressed at the
        same time.
    */
    this.updateAnimation = function()
    {
       if (this.right && this.left)
            this.setAnimation(AlasdairLeft, 4, 10);
        else if (this.right)
            this.setAnimation(AlasdairRight, 4, 10);
        else if (this.left)
            this.setAnimation(AlasdairLeft, 4, 10);
            
        if (this.up && this.down)
            this.setAnimation(AlasdairDown, 4, 10);
        else if (this.up)
            this.setAnimation(AlasdairUp, 4, 10);
        else if (this.down)
            this.setAnimation(AlasdairDown, 4, 10);    
    };

    /**
        Updates the object
        @param dt The time since the last frame in seconds
        @param context The drawing context
        @param xScroll The global scrolling value of the x axis
        @param yScroll The global scrolling value of the y axis
    */
  
    this.update = function ( dt, context, xScroll, yScroll)
    {
    this.playerToMapX = this.mapX - ((context.canvas.width / 2) - this.x);
    this.playerToMapY = this.mapY - ((context.canvas.height / 2) - this.y);
    
        //corner movement
        if ((this.playerToMapX <= context.canvas.width / 2 + 5 && this.playerToMapY <= context.canvas.height / 2 + 5)
        || (this.playerToMapX >= this.map.width - context.canvas.width / 2 - 5 && this.playerToMapY <= context.canvas.height / 2 + 5)
        || (this.playerToMapX <= context.canvas.width / 2 + 5 && this.playerToMapY >= this.map.height - context.canvas.height / 2 - 5)
        || (this.playerToMapX >= this.map.width - context.canvas.width / 2 - 5 && this.playerToMapY >= this.map.height - context.canvas.height / 2 - 5)
        )
        {
                if(this.left) this.x -= this.speed * dt;                 
                else if(this.right) this.x += this.speed * dt;            
                else if(this.up) this.y -= this.speed * dt;            
                else if(this.down) this.y += this.speed * dt;
                console.log('corner move');
                
        }

        //top and bottom of map movement
        else if ((this.playerToMapY <= context.canvas.height / 2 + 5)
        || (this.playerToMapY >= this.map.height - context.canvas.height / 2 - 5)   
        )
        {
                this.x = context.canvas.width / 2;
                if(this.up) this.y -= this.speed * dt;            
                else if(this.down) this.y += this.speed * dt;
                else if (this.left) this.mapX -= this.speed * dt;
                else if (this.right) this.mapX += this.speed * dt;
                console.log('top and bottom move');
        }
        
        //sides of map movement
        else if ((this.playerToMapX <= context.canvas.width / 2 + 5)
        || (this.playerToMapX >= this.map.width - context.canvas.width / 2 - 5)
        )
        {
                this.y = context.canvas.height / 2;
                if(this.up) this.mapY -= this.speed * dt;
                else if (this.down) this.mapY += this.speed * dt;
                else if (this.left) this.x -= this.speed * dt;
                else if (this.right) this.x += this.speed * dt;
                console.log('side move');
        }
    
        //regular movement
        else
        {
                this.x = context.canvas.width / 2;
                this.y = context.canvas.height / 2;
                if(this.left) this.mapX -= this.speed * dt;                 
                else if(this.right) this.mapX += this.speed * dt;            
                else if(this.up) this.mapY -= this.speed * dt;            
                else if(this.down) this.mapY += this.speed * dt;
                console.log('map move');
        }
   
        // keep player on screen
        if (this.x > context.canvas.width - this.frameWidth)
        this.x = context.canvas.width - this.frameWidth - 1;
        if (this.x < 1)
        this.x = 2;
        if (this.y > context.canvas.height - this.image.height)
        this.y = context.canvas.height - this.image.height - 1;
        if (this.y < 1)
        this.y = 2;
            
    };

    
}

Player.prototype = new AnimatedGameObject;

window.addEventListener('resize', this.update, false);