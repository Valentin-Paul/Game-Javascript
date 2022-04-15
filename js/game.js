class Main {
    constructor(className, xAxis, yAxis, width, height, e) {
    this.className = className;
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.width = width;
    this.height = height;
    this.element = null;
    this.e = e;
    this.obstacle = null;
    this.shooter = null;
    this.wall = null;
    this.moveObstacleRight = () => {
      this.xAxis += 0.25;
    };
    this.moveObstacleLeft = () => {
      this.xAxis -= 0.25;
    };
    this.counter = counter;
    this.gameover = false;
    this.hit = false;
    this.stickyPositionX = null;
    this.stickyPositionY = null;
    this.bullets = [];
    this.shotCounter = 0;
    this.relativeXPositions = [];
    this.relativeYPositions = [];
    this.positionCounter = 0;
    this.stickyBullets = [];
    this.colissionBullet = false;
    this.counterBullets = document.getElementById("counter")
    this.displayGameover = () => {
      document.getElementById("gameover").innerHTML = "game over";
    };
    this.displayNextLevel = () => {
        document.getElementById('gameover').innerHTML = `Level ${gameCounter}`
    };
    this.blockingShooting = false;
    this.deleting = () => {
        this.shooter.element.remove();
        this.obstacle.element.remove();
        document.querySelectorAll('.stickyBullet').forEach(e => e.remove());

        document.getElementById("gameover").innerHTML = "";
        this.counterBullets.innerHTML = "";
        //this.counterBullets.remove()
        this.displaying(this.stickyBullets);
        // this.displaying(this.counterBullets)
    }
  }

  gameOver() {
    this.displayGameover()
    setTimeout(this.deleting,2000)
    setTimeout(restartingGameover, 2100);
    this.blockingShooting = true;
  }

  nextLevel(){
    this.displayNextLevel();
    increasing();
    setTimeout(this.deleting,2000)
    setTimeout(restartingNextLevel, 2100);
    this.blockingShooting = true;
    // this.counterBullets.innerHTML = `Shots: ${this.counter}`;
  }

  creating(className) {
    let game = document.getElementById("game");
    let newDiv = document.createElement("div");
    newDiv.className = className;
    game.appendChild(newDiv);
    return newDiv;
  }

  displaying(e) {
    e.element.style.left = `${e.xAxis}%`;
    e.element.style.bottom = `${e.yAxis}%`;
    e.element.style.width = `${e.width}%`;
    e.element.style.height = `${e.height}%`;
  }

  removing(el) {
    el.element.remove();
  }

  intersectRect(shot) {
    if (
      this.obstacle.xAxis < shot.xAxis + shot.width &&
      this.obstacle.xAxis + this.obstacle.width > shot.xAxis &&
      this.obstacle.yAxis + this.obstacle.height > shot.yAxis &&
      this.obstacle.yAxis < shot.yAxis + shot.height
    ) {
      this.stickyPositionX = shot.xAxis;
      this.stickyPositionY = shot.yAxis;
      this.hit = true;
      this.stickToObstacle();
      this.removing(shot);
      shot.xAxis = 0;
      shot.yAxis = 0;
      return this.stickyPositionX, this.stickyPositionY, this.hit, true;
    }
  }

  colissionDetectionBullets(bullStuck) {
    if (
      bullStuck.xAxis < this.shooter.xAxis + this.shooter.width &&
      bullStuck.xAxis + bullStuck.width > this.shooter.xAxis &&
      bullStuck.yAxis + bullStuck.height > this.shooter.yAxis &&
      bullStuck.yAxis < this.shooter.yAxis + this.shooter.height
    ) {
    this.counter = 0;
    this.gameOver();
    this.colissionBullet = true;
    }
  }

  shooting(bullArr) {
    bullArr.forEach((bullet) => {
      this.shootingInterval = setInterval(() => {
        if (this.intersectRect(bullet) === true) {
          console.log(bullArr);
          bullArr.shift();
          console.log(bullArr);
          clearInterval(this.shootingInterval);
          this.shotCounter--;
        } else if (bullet.yAxis === 100) {
            this.counter = 0;
            this.gameOver();
          bullArr.shift();
          clearInterval(this.shootingInterval);
        } else if (this.colissionBullet === true) {
          this.removing(bullet);
        } else {
          bullet.shoot();
          this.displaying(bullet);
        }
        console.log(bullet.yAxis);
      }, 5);
    });
  }


  shootBullet(element) {
    if (element === "shoot" && this.counter > 0 && this.bullets.length === 0 && this.blockingShooting === false ) {
      this.counter--;
      this.counterBullets.innerHTML = `Shots: ${this.counter}`; //update UI
      this.shotCounter++;
      this.shooter = new Shooter();
      this.shooter.element = this.creating("bullet");
      this.bullets.push(this.shooter);
      clearInterval(this.shootingInterval);
      this.shooting(this.bullets);
    }
    else if(this.counter === 0 && this.blockingShooting === false){
        this.nextLevel();
    }
    else if (this.blockingShooting === true){

    }
  }

  stickToObstacle() {
    if (this.hit === true) {
      this.positionCounter++;
      const stickyBullet = new StickedBullet();
      stickyBullet.element = this.creating("stickyBullet");
      stickyBullet.relativePositionX =
        this.stickyPositionX - this.obstacle.xAxis;
      stickyBullet.relativePositionY =
        this.stickyPositionY - this.obstacle.yAxis;
      stickyBullet.xAxis = this.obstacle.xAxis + this.relativePositionX;
      stickyBullet.yAxis = this.obstacle.yAxis + this.relativePositionY;
      this.stickyBullets.push(stickyBullet);


    }
  }


  sticking() {
    this.displaying(this);
  }

  startGame() {

    /// obstacle ///
    this.obstacle = new Obstacle();
    this.obstacle.element = this.creating("obstacle");
    this.displaying(this.obstacle);
    this.counterBullets.innerHTML = `Shots: ${this.counter}`;

    setInterval(() => {
      /// counter ///

      if (this.obstacle.xAxis === 0) {
        this.obstacle.wall = "left";
      } else if (this.obstacle.xAxis + this.obstacle.width === 100) {
        this.obstacle.wall = "right";
      }
      if (this.obstacle.wall === "left") {
        this.obstacle.moveObstacleRight();
      } else if (this.obstacle.wall === "right") {
        this.obstacle.moveObstacleLeft();
      }
      this.displaying(this.obstacle);

      this.stickyBullets.forEach((stickBull) => {
        this.colissionDetectionBullets(stickBull);
        stickBull.xAxis = this.obstacle.xAxis + stickBull.relativePositionX;
        stickBull.yAxis = this.obstacle.yAxis + stickBull.relativePositionY;
        this.displaying(stickBull);
      });
    }, 10);

  } /// end start game ///

} /// end class Main ///






///// Obstacle-Clas //////
class Obstacle extends Main {
  constructor() {
    super("obstacle", 0, 75, 25, 2);
    this.wall = null;
  }
}

//// Shooter-Class/////
class Shooter extends Main {
  constructor() {
    super("shooter", 50, 0, 0.5, 15);
  }

  shoot() {
    if (Math.round(this.yAxis * 100) / 100 < 100) {
      this.yAxis += 2;
    } 
    // else if (Math.trunc(this.yAxis) >= 100) {
    //   console.log("gameover");
    // }
  }
}


//// StickedBullet-Class ////
class StickedBullet extends Main {
  constructor() {
    super("stickedBullet", 0, 0, 0.5, 15);
  }
  
}



////////////////


let gameCounter = 2;
let counter = 4;


let play = new Main();
play.startGame();

function increasing(){
    gameCounter++;
    counter += 2;
    play.counter = counter;
} 

const restartingGameover = function restarting(){
    location.reload()
}

const restartingNextLevel = function restartingNextLevel(){
play = new Main();
play.startGame();
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    play.shootBullet("shoot");
  }
});


