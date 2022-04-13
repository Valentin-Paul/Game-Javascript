
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
      this.xAxis += 0.5;
    };
    this.moveObstacleLeft = () => {
      this.xAxis -= 0.5;
    };
    this.counter = 8;
    this.gameover = false;
    this.hit = false;
    this.stickyPositionX = null;
    this.stickyPositionY = null;
    this.bullets = [];
    
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
    if ( this.obstacle.xAxis < shot.xAxis + shot.width &&
         this.obstacle.xAxis + this.obstacle.width > shot.xAxis &&
         this.obstacle.yAxis + this.obstacle.height > shot.yAxis &&
         this.obstacle.yAxis < shot.yAxis + shot.height ) {
        this.stickyPositionX = shot.xAxis;
        this.stickyPositionY = shot.yAxis
        
        // this.removing(shot);
        // shot.xAxis = 0;
        // shot.yAxis = 0;
        console.log(this.stickyPositionX);
        console.log(this.stickyPositionY);
          
        return this.stickyPositionX, this.stickyPositionY, true;
    }
  }


  shooting(element) {    
    setInterval(() => {
            element.shoot();
            this.displaying(element);
         if(this.intersectRect(element)===true)
             this.remove(element);
    }, 30);  
  }

  shootBullet(element) {
    if (element === "shoot" && this.counter > 0) {
      this.counter--;
      this.shooter = new Shooter();
      this.shooter.element = this.creating("bullet");
      this.shooting(this.shooter);
    }
  }

  startGame() {
   
    /// obstacle ///
    this.obstacle = new Obstacle();
    this.obstacle.element = this.creating("obstacle");
    this.displaying(this.obstacle);

    
    setInterval(() => {
        /// counter ///
    document.getElementById("counter").innerHTML = `Shots: ${this.counter}`;


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

      if(this.intersectRect(this.shooter) === true){
        
          console.log('hit');
          this.removing(this.shooter)
      }
      this.intersectRect(this.shooter)

}, 30); 
      
    //   if(this.intersectRect(this.shooter) === true){ 
    //       this.stickedBullet = new StickedBullet();
    //       this.stickedBullet.element = this.creating("stickedBullet");
    //         this.stickedBullet.xAxis = this.stickyPositionX;
    //         this.stickedBullet.yAxis = this.stickyPositionY;
            // this.removing(this.shooter);
            // console.log('hello');
            // this.hit = false;
            // return this.hit;
    //   }
    //   this.displaying(this.stickedBullet);
    //   this.stickToObstacle(this.stickedBullet, this.obstacle);
    
  } /// end start game ///





//   stickToObstacle(element1, element2){
//     element1.xAxis = element2.xAxis + (element1.xAxis - element2.xAxis);
//     element1.yAxis = element2.yAxis + (element1.yAxis - element2.yAxis);
// }

  /// intervall for the shot ///

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
    }

    shoot(){
        if(Math.round(this.yAxis * 100) / 100 <= 100){
            this.yAxis += 1;
        }  
        // else if(this.intersectRect(this.shooter)===true){
        //     this.removing(this)
        // }
        // else{
        //     this.removing(this)
        // }
    }  
}


class StickedBullet extends Main{
    constructor(xAxis, yAxis){
        super('stickedBullet', xAxis, yAxis,0.5, 15)
        this.xAxis = xAxis;
        this.yAxis = yAxis;
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