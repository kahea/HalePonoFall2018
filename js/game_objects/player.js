Player = function(game, x, y, key, frame) {
    Phaser.Sprite.call(this, game, x, y, key, frame);
    game.add.existing(this);
    this.direction = "right";
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.create = function() {
    this.body.setSize(21, 23, 3, 11);
    //this.body.setCircle(20);
}

Player.prototype.update = function() {

    //game.debug.body(this);

    // Movement
    if (game.cursors.up.isDown && this.body.touching.down) {
        this.body.velocity.y = -this.settings.jump;
    }
    else if (game.cursors.right.isDown && this.body.x < (game.width - this.width)) {
        this.body.velocity.x = this.settings.speed;
        this.direction = "right";
    } 
    else if (game.cursors.left.isDown && this.body.x > 0) {
        this.body.velocity.x = -this.settings.speed;
        this.direction = "left";
    }
   else {
        this.body.velocity.x = 0;
    }

    // Animations
    if (this.body.touching.down) {
        if (this.body.velocity.x == 0) {
            if (this.direction == "right") {
                this.play("standRight");
            }
            else {
                this.play("standLeft");
            }
        }
        else {
            if (this.direction == "right") {
                this.play("runRight");
            }
            else {
                this.play("runLeft");
            }
        }        
    }
    else {
        if (this.direction == "right") {
            this.play("jumpRight");
        }
        else {
            this.play("jumpLeft");
        }
    }
};