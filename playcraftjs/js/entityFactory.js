MyEntityFactory = pc.EntityFactory.extend('MyEntityFactory',
{ },
{
    playerSheet:null,

    init:function ()
    {
        // setup sprites

        this.playerSheet = new pc.SpriteSheet(
            { image:pc.device.loader.get('player').resource, frameWidth:34,
              frameHeight:48, useRotation:false });
        
        
        this.playerSheet.addAnimation({
            name: 'walking down',
            frameCount: 4,
            time: 1000
        });
        this.playerSheet.addAnimation({
            name: 'walking left',
            frameX: 0,
            frameY: 1,
            frameCount: 4,
            time: 1000
        });
        this.playerSheet.addAnimation({
            name: 'walking up',
            frameX: 0,
            frameY: 2,
            frameCount: 4,
            time: 1000
        });
        this.playerSheet.addAnimation({
            name: 'walking right',
            frameX: 0,
            frameY: 1,
            frameCount: 4,
            scaleX: -1,
            time: 1000
        });


    },

    createEntity:function (layer, type, x, y, dir)
    {
        var e = null;

        switch (type)
        {
            case 'player':
                e = pc.Entity.create(layer);

                // add the sprite
                e.addComponent(pc.components.Sprite.create( { spriteSheet:this.playerSheet }));

                // add spatials
                e.addComponent(pc.components.Spatial.create({x:x, y:y, dir:dir,
                    w:this.playerSheet.frameWidth, h:this.playerSheet.frameHeight}));

                return e;

        }
    }
});