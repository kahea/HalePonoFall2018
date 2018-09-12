class Splash extends Level {
    preload() {
        super.preload();
    }

    create() {
        game.add.sprite(60, 0, 'background');

        super.create();
        game.stage.backgroundColor = '#333333';
    }
}
