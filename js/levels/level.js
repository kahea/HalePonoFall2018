class Level extends Phaser.State {
    constructor(name, map) {
        super();
        this.name = name;
        this.map = map;
        this.groups = {};
        this.sprites = {};
    }

    preload() {
    }

    create() {
       //game.input.keyboard.onUpCallback = this.onKeyUp;
        game.cursors = game.input.keyboard.createCursorKeys();

        if (typeof this.map == "undefined") {
            return;
        }
    
        // Create Sprites
        for (var i=0; i < game.data.tileColumns * game.data.tileRows; i++) {
            var x = (i % game.data.tileColumns );
            var y = Math.floor(i/game.data.tileColumns);

            var symbol = this.map[y][x];

            if (symbol == " ") {
                continue;
            }

            if (typeof symbol == "undefined") {
                continue;
            }

            var object = game.data.objects[symbol];

            if (typeof object == "undefined") {
                console.log('Level: ' + this.name + '\nNo object with symbol "' + symbol + '"');
                continue;
            }

            if (typeof game.data.spritesheets[object.spritesheetName] == "undefined") {
                console.log('Spritesheet: ' + object.spritesheetName + ' not found');
                continue;
            }

            // Sprite
            var sprite = new object.class(
                game,
                game.data.spritesheets[object.spritesheetName]['width'] * x,
                game.data.spritesheets[object.spritesheetName]['height'] * y,
                object.spritesheetName,
                object.spriteFrame
            );
            sprite.create();
            sprite.settings = object.settings;
            sprite.body.immovable = object.immovable;
            if (object.gravity == true) {
                sprite.body.gravity.y = game.data.defaults.gravity;
            }

            // Groups
            for (var j in object.groups) {
                var groupName = object.groups[j];
                if (!(groupName in this.groups)) {
                    this.groups[groupName] = game.add.group();
                }
                this.groups[groupName].add(sprite);
            }

            // Animations
            for (var animName in object.animations) {
                sprite.animations.add(
                    animName,
                    object.animations[animName],
                    10,
                    true
                )
            }

            // Add Sprite to Level
            if (!(sprite.constructor.name in this.sprites)) {
                this.sprites[sprite.constructor.name] = [];
            }
            this.sprites[sprite.constructor.name].push(sprite);
        }
    }

    update() {
        for (var groupName1 in this.game.data.collisions) {
            var groupName2 = this.game.data.collisions[groupName1];
            game.physics.arcade.collide(
                this.groups[groupName1],
                this.groups[groupName2]
            )
        }

        for (var c in this.sprites) {
            for (var i in this.sprites[c]) {
                this.sprites[c][i].update();
            }
        }
    }


}