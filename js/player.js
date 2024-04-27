class Player {
    constructor(gameScreen, left, top, width, height, imgSrc){
        this.gameScreen = gameScreen;
        this.left = left;
        this.top = top;
        this.width = 50;
        this.height = 70;
        this.directionX = 0;
        this.directionY = 0;

        this.element = document.createElement("img");
        this.element.src = imgSrc;

        //Position the player on the screen
        this.element.style.position = "absolute";

        //Size of the player
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;

        //Position the player
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        //When we create a player, we are adding it to the div game-screen
        this.gameScreen.appendChild(this.element)
    }

    move(){
        // this.directionX = 0 || -3 || 3
        // this.left = 50 += -1 -> 49
    
        this.left += this.directionX
        this.top += this.directionY
    
        //borderCollision
        //here we are forcing for the player to go after 10, the player will come back to 10
        if(this.left < 10){
            this.left = 10;
        }
        if(this.top < 10){
            this.top = 10;
        }

        //right
        if(this.left > this.gameScreen.offsetWidth - this.width - 10){
            this.left = this.gameScreen.offsetWidth - this.width - 10
        }

        //bottom
        if(this.top > this.gameScreen.offsetHeight - this.height - 10){
            this.top = this.gameScreen.offsetHeight - this.height - 10
        }

        this.updatePosition()
      }
    
      updatePosition(){
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
      }

    //getBoudingClientRect is giving us the four sides to check if the obstacle and player have collided
    didCollide(obstacle){
        const playerRect = this.element.getBoundingClientRect()
        const obstacleRect = obstacle.element.getBoundingClientRect()

//{left: 50, top: 50, right: 150, bottom: 150}

        if(playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top){
                return true;
            } else {
                return false
            }
    }

//checking if collided with a book
didCollideWithBook(book) {
    const playerRect = this.element.getBoundingClientRect();
    const bookRect = book.element.getBoundingClientRect();

    if (
        playerRect.left < bookRect.right &&
        playerRect.right > bookRect.left &&
        playerRect.top < bookRect.bottom &&
        playerRect.bottom > bookRect.top
    ) {
        return true;
    } else {
        return false;
    }
}

}