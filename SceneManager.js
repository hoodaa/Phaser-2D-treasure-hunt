

 var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [FirstScene, SecondScene],
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 300 },
          debug: false,
          
        },
        scene:{
            preload: preload,
            create: create,
            update: update,
           // nextLevel:nextLevel,
          },
    }
    
}
function preload() {
    this.load.image("sky", "assets/background.png");
    this.load.image("platform", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("Castle", "assets/Castle.png");
    this.load.spritesheet("dude", "assets/Player.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
   starPos = {
    x: 100,
    y: 100,
  };
  function create(){}
  function update() {
      
  }
//   function nextLevel() {
//   }
// var platforms;
// var input;
// var player;
// var score = 0;
// var scoreText;
// var castle;

// function create(){
//         this.scene.load(FirstScene);
// }
 var game = new Phaser.Game(config);
