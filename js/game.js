var Game = {
    
    preload: function () {
        game.load.image('background', './assets/background.png');
        game.load.image('snake', './assets/snakePart.png');
        game.load.image('food', './assets/food.png');
    }, 
    
    create: function () {
        this.snake = [];
        this.food = {};
        this.size = 70;
        this.score = 0;
        this.speed = 0;
        this.delay = 0;
        this.direction = 'left';
        this.nextDirection = null;
        this.sated = false;
        this.textRed = { font: 'bold 25px Arial', fill: '#F00', align: 'center' };
        
        this.cursors = game.input.keyboard.createCursorKeys();
        
        var background = game.add.sprite(0, 0, 'background');
        background.height = game.height;
        background.width = game.width;
        
        this.createSnake(5);
        
        this.createFood();
        
        game.add.text(10, 10, 'SCORE:', this.textRed);
        this.scoreValue = game.add.text(115, 10, this.score.toString(), this.textRed);
    },
    
    update: function () {
        
    },
    
    createSnake: function (value) {
        for (var i = 0; i < value; i++) {
            this.snake[i] = game.add.sprite((game.world.width / 2 + i * this.size) - this.size / 2, game.world.height / 2 - this.size / 2, 'snake');
        }
        console.log(this.snake);
    },
    
    createFood: function () {
        var xPosition = 10 + Math.floor(Math.random() * 18) * this.size,
            yPosition = 10 + Math.floor(Math.random() * 10) * this.size;
            
        this.food = game.add.sprite(xPosition, yPosition, 'food');
    }
}