class Game extends Phaser.Game {
    constructor(data) {
        super(
            data.tileSize * data.tileColumns,
            data.tileSize * data.tileRows,
            Phaser.AUTO,
            'game',
            null,
            false,
            false
        )
        this.data = data;
        this.createLevels();
    }

    loadSpritesheets() {
        for (var name in this.data.spritesheets) {
            this.load.spritesheet(
                name,
                this.data.spritesheets[name].path,
                this.data.spritesheets[name].width,
                this.data.spritesheets[name].height
            )
        }
    }

    createLevels() {
        this.levels = {};
        for (var name in this.data.levels) {
            this.levels[name] = new this.data.levels[name].class(
                name,
                this.data.levels[name].map
            );
            this.state.add(name, this.levels[name], false);
        }
        this.startLevel(this.data.startingLevel);
    }

    startLevel(levelName) {
        this.currentLevel = this.levels[levelName];
        this.state.start(levelName);
    }
}
