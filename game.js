var game = new Phaser.Game(600, 600);

var mainState = {
    preload: function() {
        game.load.image('player', 'assets/block_purple.png');
        game.load.image('wall', 'assets/block_brown.png');
        game.load.image('coin', 'assets/block_gold.png');
        game.load.image('lava', 'assets/block_red.png');
    },

    create: function() {
        // Set the backgroud color
        game.stage.backgroundColor = '#aaaaaa';

        // Set score text
        this.scoreText = game.add.text(20, 20, "score: 0", { fill: 'white', font: '20px courier'});
        this.score = 0;

        // Start physics for movemnts and collisions
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add physics to all game objects
        game.world.enableBody = true;

        // Variable to store key presses
        this.cursor = game.input.keyboard.createCursorKeys();
    
        // Create player
        this.player = game.add.sprite(0, 0, 'player');

        

        // Create groups
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.lavas = game.add.group();

        // Settings
        this.settings = {
            gravity: 1000,
            playerSpeed: 220,
            playerJump: 500
        }

        // Create Level
        var level = [
            '               ',
            '             o ',
            '               ',
            '               ',
            '           x   ',
            '    !     !    ',
            '    xx         ',
            '               ',
            '          xxx  ',
            '               ',
            '               ',
            '   xxxx        ',
            '               ',
            ' !             ',
            'xxxxxxxxxxxxxxx',
        ]

        // Add graity to player
        this.player.body.gravity.y = this.settings.gravity;

        // Create level from array
        for (var i=0; i < level.length; i++) {
            for (var j=0; j < level[i].length; j++) {

                // Create wall and add it to 'walls' group
                if (level[i][j] == 'x') {
                    var wall = game.add.sprite(40 * j, 40 * i, 'wall');
                    this.walls.add(wall);
                    wall.body.immovable = true;
                }

                // Create coin and add it to 'coins' group
                if (level[i][j] == 'o') {
                    var coin = game.add.sprite(40 * j, 40 * i, 'coin');
                    this.coins.add(coin);
                    coin.body.immovable = true;
                }

                // Create lava and add it to 'lava' group
                if (level[i][j] == '!') {
                    var lava = game.add.sprite(40 * j, 40 * i, 'lava');
                    this.lavas.add(lava);
                    lava.body.immovable = true;
                }
            }
        }
    },

    update: function() {
        // Handle Collisions
        game.physics.arcade.collide(this.player, this.walls);

        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);
        
        game.physics.arcade.overlap(this.player, this.lavas, this.hitLava, null, this);

        // Move the player when an arrow key is pressed
        if (this.cursor.left.isDown && this.player.body.x > 0) {
            this.player.body.velocity.x = -this.settings.playerSpeed;
        }
        else if (this.cursor.right.isDown && this.player.body.x < 560) {
            this.player.body.velocity.x = this.settings.playerSpeed;
        }
        else {
            this.player.body.velocity.x = 0;
        }

        // Make the player jump if he is touching the ground
        if (this.cursor.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -this.settings.playerJump;
        }
    },

    takeCoin: function(player, coin) {
        this.score += 1;
        this.scoreText.text = "score: " + this.score;
        this.player.body.x = 0;
        this.player.body.y = 0;
    },

    hitLava: function(player, lava) {
        game.state.start('main');
    }
}

game.state.add('main', mainState);
game.state.start('main');