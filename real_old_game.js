var ufo;
var speed = 10;
var WIDTH = 1000;
var HEIGHT = 500;
var spaceKey;
var game;
var Phaser;
var cursors;
var sprites = [];
var skirt;
var basketball;
var dantat;
var cat;
var newSprite;

var ufo;


var generateRandomNumberWithMax = function(maxNumber) {
    
    var randomNumber = Math.floor(Math.random() * maxNumber); 
    return randomNumber;
};

var preload = function() {
    game.load.image('ufo', 'stick figure.png');
    game.load.image('basketball', 'basketball.png');
    game.load.image('skirt', 'skirt.png');
    game.load.image('cat', 'cat.png');
    game.load.image('dantat', 'dantat.png');
};   


var createNewSprite = function(spriteName) {
    
    var randomX = generateRandomNumberWithMax(1001);
    var randomY = generateRandomNumberWithMax(501);
    
    newSprite = game.add.sprite(randomX, randomY, spriteName);
    game.physics.enable(newSprite, Phaser.Physics.ARCADE);
    
    newSprite.body.velocity.x = generateRandomNumberWithMax(1000);
    newSprite.body.velocity.y = generateRandomNumberWithMax(1000);
    
    newSprite.body.collideWorldBounds = true;
    newSprite.body.bounce.setTo(1, 1);
    
    return newSprite;
};



var create = function() {
    game.stage.backgroundColor = '#FFFFFF';
    ufo = game.add.sprite(0, 240, 'ufo');
    ufo.anchor.setTo(0.5, 0.5);
    game.camera.follow(ufo);
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    cursors = game.input.keyboard.createCursorKeys();
    game.physics.enable(ufo, Phaser.Physics.ARCADE);
    
    spaceKey=this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(togglePause, this);
    
    skirt = createNewSprite('skirt');
    basketball = createNewSprite('basketball');
    dantat = createNewSprite('dantat');
    cat = createNewSprite('cat');
    
    sprites[0] = skirt;
    sprites[1] = basketball;
    sprites[2] = dantat;
    sprites[3] = cat;
    
    
    
    
};




var update = function() {
    
    var gameIsRunning = game.physics.arcade.isPaused === false;

    if (gameIsRunning)  {
        
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
          
    }
    
    
    ufo.y += 0;
    if (ufo.y > HEIGHT) 
        ufo.y = 0;  
        
    ufo.x += 0;
    if (ufo.y < 0) {
        ufo.y = 500;
    }
    
    ufo.y += 0;
    if (ufo.x > WIDTH) 
        ufo.x = 0;  
        

    if (ufo.x > 980) {
        alert("YOU WIN LIFE");
    }
    
    
    for (var count = 0; count < 4; count++) {
        game.physics.arcade.collide(ufo, sprites[count], collisionHandler, null, this);
    }
    
    // game.physics.arcade.collide(skirt, ufo, collisionHandler, null, this);
    // game.physics.arcade.collide(cat, ufo, collisionHandler, null, this);
    // game.physics.arcade.collide(basketball, ufo, collisionHandler, null, this);
    // game.physics.arcade.collide(dantat, ufo, collisionHandler, null, this);
    
    game.physics.arcade.collide(skirt, basketball);
    game.physics.arcade.collide(skirt, cat);
    game.physics.arcade.collide(basketball, cat);
    game.physics.arcade.collide(skirt, dantat);
    game.physics.arcade.collide(cat, dantat);
    game.physics.arcade.collide(basketball, dantat);
    
};
    


var collisionHandler  = function (obj1,obj2) {
    game.state.restart();
};


var togglePause = function() {
    
    game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;
    
};



function render() {
    
}

var mainState = {};
mainState.preload = preload;
mainState.create = create;
mainState.render = render;
mainState.update = update;
game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');