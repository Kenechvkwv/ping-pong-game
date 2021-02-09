var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  physics: {
    default: "arcade"
  },
  scene: {
    preload: preloadGame,
    create: createGame,
    update: updateGame
  }
};

var game = new Phaser.Game(config);
var cursor;
var blue;
var red;
var ball;
var velocityX = Phaser.Math.Between(-100, 100);
var velocityY = 100;
var scoreBlue = 0;
var scoreRed = 0;
var scoreTextBlue;
var scoreTextRed;

function preloadGame() {
  this.load.image("ground", "assets/ground.png");
  this.load.image("blue", "assets/bluebar.png");
  this.load.image("red", "assets/redbar.png");
  this.load.image("ball", "assets/ball.png");
}

function createGame() {
  this.add.image(400, 200, "ground");

  cursor = this.input.keyboard.createCursorKeys();
  console.log(cursor);

  this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

  blue = this.physics.add.sprite(780, 200, "blue");
  red = this.physics.add.sprite(20, 200, "red");
  ball = this.physics.add.sprite(400, 200, "ball");

  blue.setCollideWorldBounds(true);
  red.setCollideWorldBounds(true);
  ball.setCollideWorldBounds(true);
  ball.setBounce(1);

  ball.setVelocityY(velocityY);
  ball.setVelocityX(velocityX);

  this.physics.add.collider(ball, blue, hitBlue, null, this);
  this.physics.add.collider(ball, red, hitRed, null, this);

  scoreTextRed = this.add.text(16, 16, "score: 0", {
    fontSize: "20px",
    fill: "#F00"
  });
  scoreTextBlue = this.add.text(700, 16, "score: 0", {
    fontSize: "20px",
    fill: "#00F"
  });
}

function updateGame() {
  //movement for the blue bar
  if (cursor.up.isDown) {
    // move up if the up key is pressed
    blue.setVelocityY(-150);
  } else if (cursor.down.isDown) {
    // move down if the down key is pressed
    blue.setVelocityY(150);
  } //stop if no key is pressed.
  else {
    blue.setVelocityY(0);
  }

  //movement for the red bar
  if (this.keyW.isDown) {
    //move up if the W key is pressed
    red.setVelocityY(-150);
  } else if (this.keyS.isDown) {
    //move down if the S key is pressed
    red.setVelocityY(150);
  } //stop if no key is pressed
  else {
    red.setVelocityY(0);
  }

  //score when red scores, and activating the reset function
  if (ball.x == 796) {
    scoreRed += 1;
    scoreTextRed.setText("Score: " + scoreRed);
    reset();
  }
  // score when blue scores, and activating the reset function
  if (ball.x == 4) {
    scoreBlue += 1;
    scoreTextBlue.setText("Score: " + scoreBlue);
    reset();
  }
}

//function for the ball hitting the blue bar
function hitBlue(ball, blue) {
  velocityX = velocityX + 50;
  velocityX = velocityX * -1;
  console.log(velocityX);

  ball.setVelocityX(velocityX);

  if (velocityY < 0) {
    velocityY = velocityY * -1;
    ball.setVelocityY(velocityY);
  }
  blue.setVelocityX(-1);
}

//function for the ball hitting the red bar
function hitRed(ball, red) {
  velocityX = velocityX - 50;
  velocityX = velocityX * -1;
  console.log(velocityX);

  ball.setVelocityX(velocityX);

  if (velocityY < 0) {
    velocityY = velocityY * -1;
    ball.setVelocityY(velocityY);
  }
  red.setVelocityX(1);
}

//duhhhh, the reset function
function reset() {
  velocityX = Phaser.Math.Between(-100, 100);
  velocityY = 100;
  ball.x = 400;
  ball.y = 200;
  blue.x = 780;
  blue.y = 200;
  red.x = 20;
  red.y = 200;
  ball.setVelocityX(velocityX);
  ball.setVelocityY(velocityY);
}
