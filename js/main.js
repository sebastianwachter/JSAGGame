/* globals Menu, Game, GameOver */
'use strict';

var game = new Phaser.Game(1260, 700, Phaser.AUTO, 'gameDiv');

game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('GameOver', GameOver);

game.state.start('Menu');
