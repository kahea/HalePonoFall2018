class Preload extends Level {
    preload() {
        super.preload('preload');
        game.loadSpritesheets();
        game.load.image('background', 'spritesheets/purplebground.png');
    }

    create() {
        super.create();
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;
    }

    update() {
        game.startLevel('splash');
    }
}