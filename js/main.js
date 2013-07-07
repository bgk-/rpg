// request animation frame shim (ensures cross browser support and proper fallback to setTimeout)
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

var g_GameObjectManager = null;



// Alasdair
var AlasdairDown = new Image();
AlasdairDown.src = "Graphics/Characters/Alasdair/AlasdairDown.png";
var AlasdairUp = new Image();
AlasdairUp.src = "Graphics/Characters/Alasdair/AlasdairUp.png";
var AlasdairLeft = new Image();
AlasdairLeft.src = "Graphics/Characters/Alasdair/AlasdairLeft.png";
var AlasdairRight = new Image();
AlasdairRight.src = "Graphics/Characters/Alasdair/AlasdairRight.png";
var AlasdairDownIdle = new Image();
AlasdairDownIdle.src = "Graphics/Characters/Alasdair/AlasdairDownIdle.png";
var AlasdairUpIdle = new Image();
AlasdairUpIdle.src ="Graphics/Characters/Alasdair/AlasdairUpIdle.png";
var AlasdairLeftIdle = new Image(); 
AlasdairLeftIdle.src = "Graphics/Characters/Alasdair/AlasdairLeftIdle.png";
var AlasdairRightIdle = new Image();
AlasdairRightIdle.src = "Graphics/Characters/Alasdair/AlasdairRightIdle.png";

//test map
var testmap = new Image();
testmap.src = "Data/Maps/narshe-2560x1600.png";
//testmap.src = "http://i.imgur.com/DirujxR.png";

window.onload = init;


function resize()
{
    // setup resize logic for canvas
    var win = $(window);
    var c = $('#canvas');
    c.css('border', '1px solid #000');
    
    win.resize(function() {
       c.attr('width', win.width());
       c.attr('height', win.height());
       c.css({
           'width': win.width(),
           'height': win.height()
           
       });
    });
    
    win.trigger('resize');
}

function init()
    {
    new GameObjectManager().startupGameObjectManager();   
    resize();
    }
    
window.addEventListener('resize', resize, true);
