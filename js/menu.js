'use strict';

var Menu = {

    preload() {
        game.load.image('background', './assets/background.png');
    },

    create() {
        $('.menuWrapper').show();
        var background = game.add.sprite(0, 0, 'background');
        background.height = game.height;
        background.width = game.width;

        $('.button.play').on('click', () => {
            $('.menuWrapper').hide();
            game.state.start('Game');
        });
    }

}
