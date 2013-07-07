
function GameObject()
    {
        this.zOrder = 0;
        this.x = 0;
        this.y = 0;

        this.startupGameObject = function(/**Number*/ x, /**Number*/ y, /**Number*/ z)
        {
        this.zOrder = z;
        this.x = x;
        this.y = y;
        g_GameObjectManager.addGameObject(this);
        return this;
        
        };

        this.shutdownGameObject = function()
        {
            g_GameObjectManager.removeGameObject(this);
        };
    }