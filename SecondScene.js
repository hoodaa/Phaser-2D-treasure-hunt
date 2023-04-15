var movingplatform;
var Movingleft = true;
var SceneStart = false;
function nextLevel(player, castle) {
    score += 10;
    scoreText.setText("Score: " + score);
  }
class SecondScene extends Phaser.Scene {
    constructor(){
        super("SecondScene")
    }



 create() {
    var button = this.add.image(800-16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();

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
  console.log("HEY FISRT IM SECOND");
  this.add.image(400, 300, "Castlelevel").setScale(1.5); 
  this.add.image(20, 250, "platform");
  this.add.image(120, 400, "platform");
  this.add.image(700, 300, "platform");
  this.add.image(700, 100, "platform").setScale(0.5);
  this.add.image(400, 600 - 16, "platform").setScale(2);

  platforms = this.physics.add.staticGroup();
  platforms.create(120, 400, "platform").refreshBody();
  platforms.create(700, 300, "platform").refreshBody();
  platforms.create(20, 250, "platform").refreshBody();
  platforms.create(700, 100, "platform").refreshBody();
  platforms.create(400, 600 - 16, "platform").setScale(2).refreshBody();

  //   for (let x = 0; x < 5; x++) {
  //     var star = this.physics.add.image(starPos.x, starPos.y, "star");
  //     star.setCollideWorldBounds (true);
  //     this.physics.add.collider(star, platforms);
  //     starPos.x += 150;
  //   }
  castle = this.physics.add.image(750, 50, "Castle").setScale(0.1);
  castle.setCollideWorldBounds(true);
  stars = this.physics.add.group({
    key: "star",
    repeat: 11,
    setXY: { x: 80, y: 0, stepX: 60 },
  });
  stars.children.iterate(function (child) {
  
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));

});
  movingplatform = this.physics.add.sprite(700, 175, "platform").setScale(0.5);
  player = this.physics.add.sprite(400, 400, "dude").setScale(1.5);
  player.setCollideWorldBounds(true);
  movingplatform.setCollideWorldBounds(true);
  //player.setBounce(1);
  this.physics.add.collider(castle, platforms);
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(movingplatform, player);
  this.physics.add.overlap(player, stars, collectStar);
  this.physics.add.overlap(player, castle, nextLevel);
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 13, end: 21 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 13 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 13, end: 21 }),
    frameRate: 10,
    repeat: -1,
  });
  scoreText = this.add.text(10, 10, "Score: 0", {
    font: "32px Courier",
    fill: "gold",
  });

  input = this.input.keyboard.createCursorKeys();
}

 collectStar(player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText("Score: " + score);
  }
 
  
 update() {
    movingplatform.setVelocityY(-5);
    //  if (!SceneStart ){
    //      movingplatform.setVelocityX(-50);    
    //      SceneStart = true;  
    //  }
      if (movingplatform.body.x <=  30){
        movingplatform.setVelocityX(100);
     }
     else if (movingplatform.body.x  >= 600 ) {
        movingplatform.setVelocityX(-100);
     }

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
if (score >=250){
    alert("You WON !!");
    console.log("YAY");
}
  
}
}