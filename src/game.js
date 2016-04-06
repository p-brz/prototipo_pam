function Game() {}

Game.prototype.preload = function () {
    console.log('preload!');
    this.game.load.image('cenario', 'assets/cenario.png');
    this.game.load.spritesheet('torchic', 'assets/Torchic_move.png', 24, 170/5.0);

};

Game.prototype.create = function () {
  this.input.onDown.add(this.onInputDown, this);

  this.game.world.setBounds(0, 0, 1920, 1920);

  this.game.add.sprite(0, 0, 'cenario').scale.setTo(1.8, 1.8);

  player = this.game.add.sprite(this.game.width/2.0,this.game.height/2.0, 'torchic');
  player.animations.add('move', [12, 13, 14, 15], 10, true);
  player.animations.add('up'  , [0, 1, 2, 3], 10, true);
  player.animations.add('down', [4, 5, 6, 7], 10, true);
  player.anchor.setTo(0.5, 0.5); //puth player 'anchor' on his center
  this.player = player

  this.game.physics.arcade.enable(player);
  this.game.physics.arcade.gravity.y = 0;

  this.game.camera.follow(player);

  //  The deadzone is a Rectangle that defines the limits at which the camera will start to scroll
  //  It does NOT keep the target sprite within the rectangle, all it does is control the boundary
  //  at which the camera will start to move. So when the sprite hits the edge, the camera scrolls
  //  (until it reaches an edge of the world)
  xOffset = this.game.width * 0.15
  yOffset = this.game.height * 0.20
  this.game.camera.deadzone = new Phaser.Rectangle(xOffset, yOffset, this.game.width - (2*xOffset), this.game.height - (2*yOffset));

  this.game.camera.scale.setTo(2.0,2.0)

  //  Our controls.
  this.cursors = this.game.input.keyboard.createCursorKeys();

  console.log(player.animations.currentAnim);
};

Game.prototype.update = function () {
    player = this.player;
    //  Reset the players velocity (movement)
    var vx = 0, vy =0;
    var anim = '';
    var dirx = 1;

    if (this.cursors.left.isDown || this.cursors.right.isDown)
    {
        dirx = this.cursors.left.isDown ? -1 : 1;
        vx =  dirx * 150;
        anim = 'move';
    }
    if (this.cursors.down.isDown){
        anim = 'down'
        vy = 150;
    }
    else if(this.cursors.up.isDown) {
        anim = 'up';
        vy = -150;
    }

    if(vx != 0 || vy != 0){
        player.scale.x = -dirx;
        player.animations.play(anim);
    }
    else
    {
        //  Stand still
        player.animations.stop(null, true);

        // if(typeof player.animations.currentAnim.frames !== "undefined"){
            // player.frame = 0;
        // }
    }

    player.body.velocity.x = vx;
    player.body.velocity.y = vy;
};

Game.prototype.onInputDown = function () {
  this.game.state.start('menu');
};

module.exports = Game;
