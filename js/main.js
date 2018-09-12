var data = {
    tileSize: 16,
    tileColumns: 20,
    tileRows: 14,
    defaults: {
        gravity: 300
    },
    spritesheets: {
        walls: {
            path: 'spritesheets/walls.png',
            width: 16,
            height: 16
        },
        player: {
            path: 'spritesheets/player.png',
            width: 40,
            height: 36
        }
    },
    objects: {
        g: {
               class: Wall,
               immovable: true,
               groups: ['walls'],
               spritesheetName: 'walls',
               spriteFrame: 0 
        },
        G: {
               class: Wall,
               immovable: true,
               groups: ['walls'],
               spritesheetName: 'walls',
               spriteFrame: 1 
        },
        b: {
               class: Wall,
               immovable: true,
               groups: ['walls'],
               spritesheetName: 'walls',
               spriteFrame: 2
        },
        P: {
            class: Player,
            gravity: true,
            groups: ['player'],
            spritesheetName: 'player',
            spriteFrame: 0,
            animations: {
                standRight: [0],
                standLeft: [6],
                runRight: [1,2,3],
                runLeft: [7,8,9],
                jumpRight: [4],
                jumpLeft: [10],
                hitRight: [],
                hitLeft: []
            },
            settings: {
                speed: 100,
                jump: 175
            }
        }
    },
    collisions: {
        walls: 'player'
    },
    startingLevel: "preload",
    levels: {
        preload: {
            class: Preload
        },
        splash: {
            class: Splash,
            map: [
                'P                   ', // 1
                '                    ', // 2
                '    b               ', // 3
                '                    ', // 4
                '                    ', // 5
                '       b          b ', // 6
                '                    ', // 7
                '                    ', // 8
                '             bb     ', // 9
                '                    ', // 10
                '       bb           ', // 11
                '                    ', // 12
                'gggggggggggggggggggg', // 13
                'GGGGGGGGGGGGGGGGGGGG', // 14
            ]
        },
    }
}

var game = new Game(data);
