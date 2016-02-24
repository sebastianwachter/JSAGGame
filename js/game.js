'use strict';

var Game = {

    preload: function () {
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
        this.direction = 'right';
        this.nextDirection = null;
        this.sated = false;
        this.textRed = { font: 'bold 25px blowbrush', fill: '#F00', align: 'center' };

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
        if (this.cursors.right.isDown && this.direction !== 'left') {
            this.nextDirection = 'right';
        } else if (this.cursors.left.isDown && this.direction !== 'right') {
            this.nextDirection = 'left';
        } else if (this.cursors.up.isDown && this.direction !== 'down') {
            this.nextDirection = 'up';
        } else if (this.cursors.down.isDown && this.direction !== 'up') {
            this.nextDirection = 'down';
        }

        this.speed = Math.min(10, Math.floor(this.score / 5));

        this.delay++;

        if (this.delay % (20 - this.speed) === 0) {
            var firstPart = this.snake[this.snake.length - 1],
                lastPart = this.snake.shift(),
                oldLastPartx = lastPart.x,
                oldLastParty = lastPart.y;

            if (this.nextDirection) {
                this.direction = this.nextDirection;
                this.nextDirection = null;
            }

            if (this.direction === 'right') {
                lastPart.x = firstPart.x + this.size;
                lastPart.y = firstPart.y;
            } else if (this.direction === 'left') {
                lastPart.x = firstPart.x - this.size;
                lastPart.y = firstPart.y;
            } else if (this.direction === 'up') {
                lastPart.x = firstPart.x;
                lastPart.y = firstPart.y - this.size;
            } else if (this.direction === 'down') {
                lastPart.x = firstPart.x;
                lastPart.y = firstPart.y + this.size;
            }

            this.snake.push(lastPart);
            firstPart = lastPart;

            if (this.addNew) {
                this.snake.unshift(game.add.sprite(oldLastPartx, oldLastParty, 'snake'));
                this.addNew = false;
            }

            this.eatFood();
            this.eatSelf(firstPart);
            this.hitWall(firstPart);
        }
    },

    createSnake: function (value) {
        for (var i = 0; i < value; i++) {
            this.snake[i] = game.add.sprite(210, 210, 'snake');
        }
    },

    createFood: function () {
        var xPosition = Math.floor(Math.random() * 18) * this.size,
            yPosition = Math.floor(Math.random() * 10) * this.size;

        this.food = game.add.sprite(xPosition, yPosition, 'food');
    },

    eatFood: function  () {
        for (var i = 0; i < this.snake.length; i++) {
            if (this.snake[i].x === this.food.x && this.snake[i].y === this.food.y) {
                this.addNew = true;
                this.food.destroy();
                this.createFood();
                this.score++;
                this.scoreValue.text = this.score.toString();
            }
        }
    },

    eatSelf: function (firstPart) {
        for (var i = 0; i < this.snake.length - 1; i++) {
            if (firstPart.x === this.snake[i].x && firstPart.y === this.snake[i].y) {
                game.state.start('GameOver');
            }
        }
    },

    hitWall: function (firstPart) {
        if (firstPart.x >= 1280 || firstPart.x < 0 || firstPart.y >= 720 || firstPart.y < 0) {
            game.state.start('GameOver');
        }
    }
}
