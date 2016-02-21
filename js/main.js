var game;

game = new Phaser.Game(1260, 700, Phaser.AUTO, 'gameDiv');

game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('game_over', game_over);

game.state.start('Menu');