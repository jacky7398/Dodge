var ufo;
var speed = 10;
var basketball = null;
var skirt = null;
var cat = null;
var dantat = null;
var WIDTH = 1200;
var HEIGHT = 600;
var spaceKey;
var game;
var Phaser;
var cursors;
var randomNumber;
var dantat2;
var dantats = [];




var preload = function() {
    game.load.image('ufo', 'stick figure.png');
    game.load.image('basketball', 'basketball.png');
    game.load.image('skirt', 'skirt.png');
    game.load.image('cat', 'cat.png');
    game.load.image('dantat', 'dantat.png');
};   




var generateRandomNumberWithMax = function (maxNumber){
    var randomNumber = Math.floor(Math.random() * maxNumber); 
    return randomNumber;
};

var createNewSprite = function(spriteName) {
    debugger
    var randomX = generateRandomNumberWithMax(1000);
    var randomY = generateRandomNumberWithMax(300);
    
    var myNewSprite = game.add.sprite(randomX, randomY, spriteName);
    debugger
    // game.add.sprite
    game.physics.enable(myNewSprite, Phaser.Physics.ARCADE);
    
    myNewSprite.body.velocity.x = generateRandomNumberWithMax(1000);
    myNewSprite.body.velocity.y = generateRandomNumberWithMax(1000);;
    
    myNewSprite.body.collideWorldBounds = true;
    myNewSprite.body.bounce.setTo(1, 1);
    
    return myNewSprite;
}

var createAllTheDantat = function(numberOfDantat) {
    for (var count = 0; count < numberOfDantat; count++) {
        createNewSprite('dantat');
    }
}

// objects colliding with each other can use for loops


var create = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#FFFFFF';
    
    // basketball = createNewSprite('basketball');
    // dantat = createNewSprite('dantat');
    // skirt = createNewSprite('skirt');
    // cat = createNewSprite('cat');
    
    // createAllTheDantat(10);
    for(var count = 0; count<100; count++) {
        // game.load.image(dantats[count])
        dantats[count] = createNewSprite('dantat');
    }
    
    // Create a ufo sprite as player.
    ufo = game.add.sprite(-100, -100, 'ufo');
    ufo.anchor.setTo(0.5, 0.5);
    game.camera.follow(ufo);
    game.physics.enable(ufo, Phaser.Physics.ARCADE); // XXX
    
    cursors = game.input.keyboard.createCursorKeys();
    spaceKey=this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(togglePause, this);
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
    
    
  
    // if (basketball.y > WIDTH) {
    //     basketball.y = 0;
    // }
    
    
    // if (skirt.y > WIDTH) {
    //     skirt.y = 0;
    // }
    
    // if (cat.y > WIDTH) {
    //     cat.y = 0;    
    // }
    
    // if (dantat.y > WIDTH) {
    //     dantat.y = 0;
    // }
    
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
        

    if (ufo.x > 999) {
        alert("YOU WIN LIFE");
    }
    
    for (var count = 0; count < 3; count++) {
        game.physics.arcade.collide(ufo, dantats[count], collisionHandler);
    }
    
    // game.physics.arcade.collide(skirt, ufo, collisionHandler, null, this);
    // game.physics.arcade.collide(cat, ufo, collisionHandler, null, this);
    // game.physics.arcade.collide(basketball, ufo, collisionHandler, null, this);
    // game.physics.arcade.collide(dantat, ufo, collisionHandler, null, this);
    
    // game.physics.arcade.collide(skirt, basketball);
    // game.physics.arcade.collide(skirt, cat);
    // game.physics.arcade.collide(basketball, cat);
    // game.physics.arcade.collide(skirt, dantat);
    // game.physics.arcade.collide(cat, dantat);
    // game.physics.arcade.collide(basketball, dantat);
    
};
    


var collisionHandler  = function (obj1,obj2) {
    
    // game.stage.backgroundColor = '#00FF00';
    game.state.restart();
};

// var collisionHandler  = function (skirt, ufo) {
    // game.stage.backgroundColor =  '#FF0000';  




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