Wall = function(game, x, y, key, frame) {
    Phaser.Sprite.call(this, game, x, y, key, frame);
    game.add.existing(this);
}

Wall.prototype = Object.create(Phaser.Sprite.prototype);
Wall.prototype.constructor = Wall;

Wall.prototype.create = function() {
    
}

Wall.prototype.update = function() {

};
