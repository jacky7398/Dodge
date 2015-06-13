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
    game.physics.enable(myNewSprite, Phaser.Physics.ARCADE);
    
    myNewSprite.velocity.x = generateRandomNumberWithMax(1000);
    myNewSprite.velocity.y = generateRandomNumberWithMax(1000);;
    
    myNewSprite.body.collideWorldBounds = true;
    myNewSprite.body.bounce.setTo(1, 1);
    
    return myNewSprite;
}


var create = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#FFFFFF';
    
    debugger
    basketball = createNewSprite('basketball');
    dantat = createNewSprite('dantat');
    
    // Create a ufo sprite as player.
    ufo = game.add.sprite(0, 240, 'ufo');
    ufo.anchor.setTo(0.5, 0.5);
    

    var randomY = generateRandomNumberWithMax(300);
    var randomX = generateRandomNumberWithMax(1000);
    var basketball1 = game.add.sprite(randomX, randomY, 'basketball'); // XXX
    
    debugger
    var basketball2 = createNewSprite('basketball');

    skirt = game.add.sprite(randomX, randomY, 'skirt');
    cat = game.add.sprite(randomX, randomY, 'cat');
    dantat = game.add.sprite(randomX, randomY, 'dantat');
    
    // Make the default camera follow the ufo.
    game.camera.follow(ufo);
    

    game.physics.enable([basketball, skirt, ufo, cat, dantat], Phaser.Physics.ARCADE); // XXX
    game.physics.enable(skirt, Phaser.Physics.ARCADE); // XXX
    

    basketball.body.velocity.y=700; // XXX
    basketball.body.velocity.x=700; // XXX
    
    skirt.body.velocity.y=700;
    skirt.body.velocity.x=600;
    
    cat.body.velocity.y=300;
    cat.body.velocity.x=450;
    
    dantat.body.velocity.y=200;
    dantat.body.velocity.x=1000;
    
    skirt.body.collideWorldBounds = true;
    skirt.body.bounce.setTo(1, 1);
    
    basketball.body.collideWorldBounds = true; // XXX
    basketball.body.bounce.setTo(1, 1); // XXX
    
    cat.body.collideWorldBounds = true;
    cat.body.bounce.setTo(1, 1);
    
    dantat.body.collideWorldBounds = true;
    dantat.body.bounce.setTo(1, 1);
    
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
    
    
  
    if (basketball.y > WIDTH) {
        basketball.y = 0;
    }
    
    
    if (skirt.y > WIDTH) {
        skirt.y = 0;
    }
    
    if (cat.y > WIDTH) {
        cat.y = 0;    
    }
    
    if (dantat.y > WIDTH) {
        dantat.y = 0;
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
        

    if (ufo.x > 999) {
        alert("YOU WIN LIFE");
    }
    
    
    
    game.physics.arcade.collide(skirt, ufo, collisionHandler, null, this);
    game.physics.arcade.collide(cat, ufo, collisionHandler, null, this);
    game.physics.arcade.collide(basketball, ufo, collisionHandler, null, this);
    game.physics.arcade.collide(dantat, ufo, collisionHandler, null, this);
    
    game.physics.arcade.collide(skirt, basketball);
    game.physics.arcade.collide(skirt, cat);
    game.physics.arcade.collide(basketball, cat);
    game.physics.arcade.collide(skirt, dantat);
    game.physics.arcade.collide(cat, dantat);
    game.physics.arcade.collide(basketball, dantat);
    
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