function GameObjectManager()
    {
        this.gameObjects = new Array();
        this.lastFrame = new Date().getTime();
        this.xScroll = 0;
        this.yScroll = 0;
        this.applicationManager = null;
        this.canvas = null;
        this.context2D = null;
        this.backBuffer = null;
        this.backBufferContext2D = null;
        

    
        this.startupGameObjectManager = function()
        {
            g_GameObjectManager = this;
            document.onkeydown = function(event){g_GameObjectManager.keyDown(event);}
            document.onkeyup = function(event){g_GameObjectManager.keyUp(event);}

            this.canvas = document.getElementById('canvas');



            if (this.canvas.getContext)
            {
                this.canvasSupported = true;
                this.context2D = this.canvas.getContext('2d');
            
            }
            
            this.applicationManager = new ApplicationManager().startupApplicationManager();
    
            //setInterval(function(){g_GameObjectManager.draw();}, SECONDS_BETWEEN_FRAMES);

            // trigger first draw
            this.draw();
            
            return this;
        };
 
        this.draw = function ()
        {
            var that = this;
            window.requestAnimationFrame(function(time) {
                var dt = (time - that.lastFrame) / 1000;
                that.lastFrame = time;
    
                //that.backBufferContext2D.clearRect(0, 0, that.backBuffer.width, that.backBuffer.height);
                that.context2D.clearRect(0, 0, that.canvas.width, that.canvas.height);
    
                for (x in that.gameObjects)
                {
                    if (that.gameObjects[x].update)
                    {
                        that.gameObjects[x].update(dt, /*that.backBufferContext2D*/ that.context2D, that.xScroll, that.yScroll);
                    }
                }
                    
                for (x in that.gameObjects)
                {
                    if (that.gameObjects[x].draw)
                    {
                        that.gameObjects[x].draw(dt, /*that.backBufferContext2D*/ that.context2D, that.xScroll, that.yScroll);         
                    }
                }
                
                // copy the back buffer to the displayed canvas
                //that.context2D.drawImage(that.backBuffer, 0, 0);
                that.draw();                
            });
        };

        this.addGameObject = function(gameObject)
        {
            this.gameObjects.push(gameObject);
            this.gameObjects.sort(function(a,b){return a.zOrder - b.zOrder;});
        };

        this.removeGameObject = function(gameObject)
        {
            this.gameObjects.removeObject(gameObject);
        };
 
        this.keyDown = function(event)
        {
            for (x in this.gameObjects)
            {
                if (this.gameObjects[x].keyDown)
                {
                    this.gameObjects[x].keyDown(event);
                }
            }
        };

        this.keyUp = function(event)
        {
            for (x in this.gameObjects)
            {
                if (this.gameObjects[x].keyUp)
                {
                this.gameObjects[x].keyUp(event);
                }
            }
        };
        
    }