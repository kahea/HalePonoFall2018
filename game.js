
var game = new Phaser.Game(
    400, 
    400, 
    Phaser.AUTO, 
    'ame', 
    { preload: preload, create: create, update: update }
);

var cursors;

function preload() {
}

function create() {
}

function update() {
    if (this.cursors.right.isDown) {
        console.log("down");
    }
}