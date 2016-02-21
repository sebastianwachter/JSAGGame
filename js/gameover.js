var game_over = {
    
    create: function () {
        $('.gameOverWrapper').show();
        var background = game.add.sprite(0, 0, 'background');
        background.height = game.height;
        background.width = game.width;
        
        $('.button.play').on('click', function () {
            $('.gameOverWrapper').hide();
            game.state.start('Game');
        });
    }
    
}