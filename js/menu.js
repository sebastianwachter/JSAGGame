var Menu = {
    
    preload: function () {
        game.load.image('background', './assets/background.png');
    },
    
    create: function () {
        $('.menuWrapper').show();
        var background = game.add.sprite(0, 0, 'background');
        background.height = game.height;
        background.width = game.width;
        
        $('.button.play').on('click', function () {
            $('.menuWrapper').hide();
            game.state.start('Game');
        });
    }
        
}