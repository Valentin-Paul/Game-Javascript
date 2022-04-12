
class Main {
    constructor(className, xAxis, yAxis, width, height,e){
        this.className = className;
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.width = width;
        this.height = height;
        this.element = null;
        this.e = e;
        this.obstacle = null;
        this.bullets = [];
        // this.shooter = null;
    }

    creating(className){
        let game = document.getElementById('game');
        let newDiv = document.createElement('div');
        newDiv.className = className;
        game.appendChild(newDiv);
        return newDiv;
    };

    displaying(e){
        e.element.style.left = `${e.xAxis}%`;
        e.element.style.bottom = `${e.yAxis}%`;
        e.element.style.width = `${e.width}%`;
        e.element.style.height = `${e.height}%`;
    };
 
    startGame(){

        /// obstacle ///
        this.obstacle = new Obstacle();
        this.obstacle.element = this.creating('obstacle');
        this.displaying(this.obstacle);
        

        
        setInterval(()=>{
            if((Math.round(this.obstacle.xAxis * 100) / 100) ===  0){
                this.obstacle.wall = 'left';
            }
            else if((Math.round((this.obstacle.xAxis + this.obstacle.width) * 100) / 100) === 100.0){
                this.obstacle.wall = 'right';
            }
    
            if(this.obstacle.wall === 'left'){
                this.obstacle.moveObstacleRight();
            }
            else if(this.obstacle.wall === 'right'){  
                this.obstacle.moveObstacleLeft();
            }
            console.log(this.obstacle.xAxis + this.obstacle.width);
            this.displaying(this.obstacle)
        }, 5)

        

    } /// end start game ///

     /// shooter ///
   /// intervall for the shot ///
   shootBullet(element){
    if(element === 'shoot'){
        this.shooter = new Shooter;
        this.shooter.element = this.creating('bullet');
        this.displaying(this.shooter);
        this.bullets.push(this.shooter)
        
        setInterval(()=>{
            this.bullets.forEach((bullet) =>{
                bullet.shoot();
                this.displaying(bullet);
            })
        },10)
    }
}
    //  this.shooter = new Shooter();
    //  this.shooter.element = this.creating('shooter');
    //  this.displaying(this.shooter)

     

  

}

///// Obstacle-Clas //////
class Obstacle extends Main{
    constructor(){
        super('obstacle', 0, 75, 15, 5,)
        this.wall = null;
    }
   
    moveObstacleRight(){
        this.xAxis += 0.1;
    }

    moveObstacleLeft(){
        this.xAxis -= 0.1;
    }
    
}

//// Shooter-Class/////
class Shooter extends Main{
    constructor(){
        super('shooter', 50, 0, 0.5, 15);
        this.bullets = []
    this.shooter = null;
    }

    shoot(){
        if(Math.round(this.yAxis * 100) / 100 < 100){
            this.yAxis += 0.1;
        }
    }

           

}






const play = new Main();
play.startGame();

/// shoot on spacebar ///
document.addEventListener("keydown",(event)=>{
    if(event.code === 'Space') {
        console.log('hello');
        play.shootBullet('shoot');
    }
})