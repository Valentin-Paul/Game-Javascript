
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
    this.bullets = [];
    this.shooter = null;
    this.obstacles = [];
    this.bulletInterval;
    this.wall = null; 
    this.moveObstacleRight = ()=>{this.xAxis += 0.5};
    this.moveObstacleLeft = ()=>{this.xAxis -= 0.5};
    this.counter = 8;
    this.gameover = false;
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

  removing(arr, el){
        if (el.yAxis >= 100) {
          arr.pop();
          el.element.remove();
        }
     
  }
 

  startGame() {

    /// counter ///
    setInterval(()=>{
     document.getElementById('counter').innerHTML = `Shots: ${this.counter}`;
    },100)
    

    /// obstacle ///
    this.obstacle = new Obstacle();
    this.obstacle.element = this.creating("obstacle");
    this.displaying(this.obstacle);
    this.obstacles.push(this.obstacle);

    setInterval(() => {
    this.obstacles.forEach((obstacle) => {
        if (obstacle.xAxis  === 0){
            obstacle.wall = 'left'
        }
        else if((obstacle.xAxis + obstacle.width) === 100){
            obstacle.wall = "right";
        }
    
          if (obstacle.wall === "left") {
            obstacle.moveObstacleRight();
          } else if (obstacle.wall === "right") {
            obstacle.moveObstacleLeft();
          }
          this.displaying(obstacle);
    })

    }, 50);
  } /// end start game ///

  intersectRect(shot) {
 if(  this.obstacle.xAxis < shot.xAxis + shot.width && 
      this.obstacle.xAxis + this.obstacle.width > shot.xAxis && 
      this.obstacle.yAxis + this.obstacle.height > shot.yAxis &&
      this.obstacle.yAxis < shot.yAxis + shot.height){
        shot.wall = this.obstacle.wall;
        this.obstacles.push(shot);
        return true;
         }
 } 

  /// intervall for the shot ///
  shootBullet(element) {
    if (element === "shoot" && this.counter > 0 && this.bullets.length === 0 ) {
      this. counter--;
      this.shooter = new Shooter();
      this.shooter.element = this.creating("bullet");
      this.displaying(this.shooter);
      this.bullets.push(this.shooter);
    }; 

    this.bulletInterval = setInterval(()=>{
        this.bullets.forEach((bullet) => {
        this.intersectRect(bullet);
          if(this.intersectRect(bullet) === true){
              this.bullets.shift();
          }
          else if(bullet.yAxis === 100){
            this.removing(this.bullets,bullet)
            document.getElementById('gameover').innerHTML = `game over`;
          }
          else{
            bullet.shoot();
            this.displaying(bullet);
          }
        });
      }, 50)
  }
  

} /// end class Main ///

///// Obstacle-Clas //////
class Obstacle extends Main{
    constructor(){
        super('obstacle', 0, 75, 18, 2,)
        this.wall = null;
    }
}

//// Shooter-Class/////
class Shooter extends Main{
    constructor(){
        super('shooter', 50, 0, 0.5, 15);
        this.bullets = []
    // this.shooter = null;
    }

    shoot(){
        if(Math.round(this.yAxis * 100) / 100 <= 100){
            this.yAxis += 0.5;
        }  
    }  
}



///// start game /////
const play = new Main();
play.startGame();

/// shoot on spacebar ///
document.addEventListener("keydown",(event)=>{
    if(event.code === 'Space') {
        play.shootBullet('shoot');
    }
});

/// counter ///

// game.appendChild(counter);




//// storage ////
// setInterval(() => {
// if (this.obstacle.xAxis  === 0){
//     this.obstacle.wall = 'left'
// }
// else if((this.obstacle.xAxis + this.obstacle.width) === 100){
//     this.obstacle.wall = "right";
// }

//   if (this.obstacle.wall === "left") {
//     this.obstacle.moveObstacleRight();
//   } else if (this.obstacle.wall === "right") {
//     this.obstacle.moveObstacleLeft();
//   }
//   this.displaying(this.obstacle);

// }, 50);


//// rounded ////
  //   if (Math.round(this.obstacle.xAxis * 100) / 100 === 0) {
    //     this.obstacle.wall = "left";
    //   } else if (
    //     Math.round((this.obstacle.xAxis + this.obstacle.width) * 100) / 100 === 100.0) {
    //     this.obstacle.wall = "right";
    //   }