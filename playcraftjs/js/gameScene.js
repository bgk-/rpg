/**
 * GameScene
 * A template game scene
 */

GameScene = pc.Scene.extend('GameScene', {}, 
    {
    gameLayer: null,
    tileLayer1:null,
    tileLayer2:null,
    entityFactory:null,
    player:null,
    playerSpatial:null,
    

    init: function() 
    {
        this._super();



        this.entityFactory = new MyEntityFactory();
        //-----------------------------------------------------------------------------
        // game layer
        //-----------------------------------------------------------------------------
        this.loadFromTMX(pc.device.loader.get('test').resource, this.entityFactory);

        this.tileLayer1 = this.get('Tile Layer 1');
        this.tileLayer1.setZIndex(1);
        this.tileLayer2 = this.get('Tile Layer 2');
        this.tileLayer2.setZIndex(2);

        // all we need is the render and effects systems
        this.gameLayer.addSystem(new pc.systems.Render());
        this.gameLayer.addSystem(new pc.systems.Effects());

        this.gameLayer = this.get('entity');
        this.gameLayer.setZIndex(20);

        this.player = this.gameLayer.entityManager.getTagged('PLAYER').first.object();
        this.playerSpatial = this.player.getComponent('spatial');

        // bind some keys/clicks/touches to access the menu
        pc.device.input.bindAction(this, 'menu', 'ENTER');
        pc.device.input.bindAction(this, 'menu', 'ESC');
        pc.device.input.bindAction(this, 'menu', 'MOUSE_BUTTON_LEFT_DOWN');
        pc.device.input.bindAction(this, 'menu', 'TOUCH');

    },

    // handle menu actions
    onAction: function(actionName, event, pos, uiTarget) {
        if (pc.device.game.menuScene.active) return true;

        if (actionName === 'menu') pc.device.game.activateMenu();

        return false; // eat the event (so it wont pass through to the newly activated menuscene
    },

    process: function() {
        // clear the background
        pc.device.ctx.clearRect(0, 0, pc.device.canvasWidth, pc.device.canvasHeight);

        // always call the super
        this._super();
    }
});
