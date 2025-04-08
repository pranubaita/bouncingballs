let WIDTH = 800;
let HEIGHT = 600;

const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let ball;
let stationaryBall;
let speed_y = 2;
let speed_x = 2;
let ball_size = 160;
let lives = 10;
let scoreText;
let gameOverText;

function preload() {
    this.load.image('ball', 'assets/ball.png');
}

function create() {
    ball = this.add.sprite(400, 300, 'ball');
    ball.setDisplaySize(ball_size, ball_size);

    stationaryBall = this.add.sprite(100, 100, 'ball');
    stationaryBall.setDisplaySize(ball_size, ball_size);
    stationaryBall.setTint(0x00FF00);

    scoreText = this.add.text(10, 10, `Lives: ${lives}`,{
        fontSize: '24px',
        fill: '#808080'
    });

    gameOverText = this.add.text(WIDTH/2, HEIGHT/2, `GAME OVER!`, {
        fontSize: '64px',
        fill: '#808080'
    })
    gameOverText.setOrigin(0.5);
    gameOverText.setVisible(false);

    ball.setInteractive();
    ball.on('pointerdown', function(){
        speed_x *= 1.1;
        speed_y *= 1.1;
        ball_size *= 0.9;
        lives += 1;
        scoreText.setText(`Lives: ${lives}`);
        ball.setDisplaySize(ball_size, ball_size);
    });
}

function update() {
    ball.y += speed_y;
    ball.x += speed_x;
    
    if (ball.y > HEIGHT - ball_size / 2 || ball.y <= ball_size / 2) {
        speed_y *= -1;
        ball.setTint(Math.random() * 0xffffff);
        lives -= 1;
        scoreText.setText(`Lives: ${lives}`);
        checkGameLoss();
    }

    if (ball.x > WIDTH - ball_size / 2 || ball.x <= ball_size / 2) {
        speed_x *= -1;
        ball.setTint(Math.random() * 0xffffff);
        lives -= 1;
        scoreText.setText(`Lives: ${lives}`);
        checkGameLoss();
    }
}

function checkGameLoss() {
    if (lives <= 0) {
        lives = 0;
        scoreText.setText('Lives: 0');
        gameOverText.setVisible(true);
        ball.setVisible(false);
    }
}