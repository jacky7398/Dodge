var ufo;
var leftBtn;
var rightBtn;
var speed = 10;
var basketball = null;
var skirt=null;
var WIDTH = 500;
var HEIGHT = 500;


var preload = function() {
    game.load.image('ufo', 'stick figure.png');
    game.load.image('basketball', 'basketball.gif');
    game.load.image('skirt', 'skirt.png');
}

var create = function() {
    game.stage.backgroundColor = '#FFFFFF';

    // Create a ufo sprite as player.
    ufo = game.add.sprite(0, 240, 'ufo');
    ufo.anchor.setTo(0.5, 0.5);
    basketball = game.add.sprite(320, 240, 'basketball');
    skirt = game.add.sprite(120, 240, 'skirt');

    // Make the default camera follow the ufo.
    game.camera.follow(ufo);
    
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.enable([basketball, skirt, ufo], Phaser.Physics.ARCADE);
    
    basketball.body.velocity.y=500;
    basketball.body.velocity.x=500;
    
    skirt.body.velocity.y=500;
    skirt.body.velocity.x=500;
    
    skirt.body.collideWorldBounds = true;
    skirt.body.bounce.set(1);
    
    basketball.body.collideWorldBounds = true;
    basketball.body.bounce.set(1);
    
    
    

}




var update = function() {

    // Check key states every frame.
    // Move ONLY one of the left and right key is hold.

    if (game.input.keyboard.isDown(Phaser.Keyboard.W))
    {
        ufo.y -= speed;
        ufo.angle = 180;
        ufo.alpha = 1;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.S))
    {
        ufo.y += speed;
        ufo.angle = 180;
        ufo.alpha = 1;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
        ufo.x -= speed;
        ufo.angle = 90;
        ufo.alpha = 1;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
        ufo.x += speed;
        ufo.angle = -90;
        ufo.alpha = 1;
    }    
    else 
    {
        ufo.rotation = 0;
    
    }
    
    basketball.y += 1;
    if (basketball.y > WIDTH) {
        basketball.y = 0;
    }
    
    skirt.y += 1;
    if (skirt.y > WIDTH) {
        skirt.y = 0;
    }
    
    ufo.y += 0
    if (ufo.y > WIDTH) 
        ufo.y = 0;  
        
    ufo.y += 0
    if (ufo.x > WIDTH) 
        ufo.x = 0;  
        
    ufo.x += 0
    if (ufo.y < 0) {
        ufo.y = 500;
    }
        
    ufo.x += 0
    if (ufo.x < 0) {
        ufo.x = 500;

    }
    
    game.physics.arcade.overlap(basketball, ufo, collisionHandler, null, this);
    
    game.physics.arcade.overlap(skirt, ufo, collisionHandler, null, this);
    
}
    


var collisionHandler  = function (basketball, ufo) {
    // alert("rar");
    game.stage.backgroundColor = '#00FF00';
    
}

var collisionHandler  = function (skirt, ufo) {
    game.stage.backgroundColor =  '#FF0000';  

}


    

 





function render() {


    game.debug.body(ufo);
    game.debug.body(basketball);
    

}

var mainState = {};
mainState.preload = preload;
mainState.create = create;
mainState.render = render;
mainState.update = update;
game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');