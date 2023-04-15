//import Phaser from "phaser";
var stars;
var platforms;
var castle;
var input;
var player;
var score = 0;
var scoreText;

function collectStar(player, star) {
  star.disableBody(true, true);
  score += 10;
  scoreText.setText("Score: " + score);
  
}
function nextLevel(player, castle) {
  score +=10;
  this.scene.start("SecondScene");
  console.log("HEY");
}

class FirstScene extends Phaser.Scene {
  constructor() {
    super({
      key:"FirstScene",
    });
  }

  preload() {
    this.load.image("sky", "assets/background.png");
    this.load.image("platform", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("Castle", "assets/Castle.png");
    this.load.image("Castlelevel", "assets/Castlelevel.png");
    this.load.spritesheet("dude", "assets/Player.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
  create() { var button = this.add.image(800-16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();

  button.on('pointerup', function () {

      if (this.scale.isFullscreen)
      {
          button.setFrame(0);

          this.scale.stopFullscreen();
      }
      else
      {
          button.setFrame(1);

          this.scale.startFullscreen();
      }

  }, this);
    //this.scene.start("SecondScene");
    console.log("first");
    this.add.image(400, 300, "sky").setScale(0.6);
    this.add.image(20, 250, "platform");
    this.add.image(120, 400, "platform");
    this.add.image(700, 300, "platform");
    this.add.image(400, 600 - 16, "platform").setScale(2);

    platforms = this.physics.add.staticGroup();
    platforms.create(120, 400, "platform").refreshBody();
    platforms.create(700, 300, "platform").refreshBody();
    platforms.create(20, 250, "platform").refreshBody();
    platforms
      .create(400, 600 - 16, "platform")
      .setScale(2)
      .refreshBody();

    castle = this.physics.add.image(40, 150, "Castle").setScale(0.1);
    castle.setCollideWorldBounds(true);
    stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 80, y: 0, stepX: 60 },
    });
    stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
    });

    player = this.physics.add.sprite(400, 400, "dude").setScale(1.5);
    player.setCollideWorldBounds(true);

    //player.setBounce(1);
    this.physics.add.collider(castle, platforms);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar);
    this.physics.add.overlap(player, castle, function nextLevel(player, castle) {
      console.log("HEY");
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 12, end: 20 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 12 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 12, end: 20 }),
      frameRate: 10,
      repeat: -1,
    });
    scoreText = this.add.text(10, 10, "Score: 0", {
      font: "32px Courier",
      fill: "gold",
    });

    input = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (input.left.isDown) {
      player.setVelocityX(-100);
      player.flipX = true;
      player.anims.play("left", true);
    } else if (input.right.isDown) {
      player.setVelocityX(100);
      player.flipX = false;
      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("idle", true);
    }
    if (input.up.isDown && player.body.touching.down) {
      player.setVelocityY(-350);
    }
    if (score >= 120){
      this.scene.start("SecondScene");
    }
  }
}
