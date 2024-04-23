class Game {
    constructor(){
        this.startScreen = document.getElementById("game-intro")
        this.gameScreen = document.getElementById("game-screen")
        this.gameEndScreen = document.getElementById("game-end")
        this.player = new Player(this.gameScreen, 200, 500, 100, 150, "../Images/Girl.png");
        this.height = 600;
        this.width = 500;
        this.obstacles = [];
        this.books = [];
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = Math.floor(1000/60)
        this.scoreDisplay = document.getElementById("score-display");
        this.levelDisplay = document.getElementById("level-display");
        this.livesDisplay = document.getElementById("lives");
        this.level = 1; 

    }
    start(){
        this.gameScreen.style.width = `${this.width}px`
        this.gameScreen.style.height = `${this.height}px`
        //removing the start screen from the page
        this.startScreen.style.display = "none"
        //show the gameScreen
        this.gameScreen.style.display = "block"

        //start the loop
        this.gameIntervalId = setInterval(() => {
            this.gameLoop()
        }, this.gameLoopFrequency)
       
        // Initialize the level display
        this.updateLevelDisplay();
        // Initialize the lives display 
        this.updateLivesDisplay();
    }
    gameLoop(){
        console.log("gameLoop")
        this.update()

        if (this.gameIsOver){
            clearInterval(this.gameIntervalId)
        }   
        
    }

    updateScoreDisplay() {
        // Update the content of the score
        this.scoreDisplay.textContent = `Score: ${this.score}`;
    }

    updateLevelDisplay() {
        // Update the content of the level
        this.levelDisplay.textContent = `Level: ${this.level}`;
    }
    updateLivesDisplay() {
        // Update the content of the level
        this.livesDisplay.textContent = `Lives: ${this.lives}`;
    }

//código para os livros

update() {
    this.player.move();

    for (let i = 0; i < this.books.length; i++) {
        const book = this.books[i];

        book.move();

        if (this.player.didCollide(book)) {
            book.element.remove();
            this.books.splice(i, 1);
            this.score++;
            i++;
        } else if (book.top > this.height) {
            book.element.remove();
            this.books.splice(i, 1);
            i--;
        }
    }

    if (this.score >= 10) {
        this.increaseLevel();
    }

    for (let i = 0; i < this.obstacles.length; i++) {
        const obstacle = this.obstacles[i];

        obstacle.move();

        if (this.player.didCollide(obstacle)) {
            obstacle.element.remove();
            this.obstacles.splice(i, 1);
            this.lives--;
            this.updateLivesDisplay(); // Update lives display
            i--;

            if (this.lives <= 0) {
                this.endGame();
                return;
            }
        } else if (obstacle.top > this.height) {
            obstacle.element.remove();
            this.obstacles.splice(i, 1);
            i--;
        }
    }

    if (this.level === 4) { // Check if level is 4
        this.endGame(); // End game if level is 4
        return;
    }

    if (Math.random() > 0.99 && this.books.length < 1) {
        this.books.push(new Book(this.gameScreen));
    }

    if (Math.random() > 0.99 && this.obstacles.length < 1) {
        this.obstacles.push(new Obstacle(this.gameScreen));
    }

    this.updateScoreDisplay();
}


increaseLevel() {
    // Reset score
    this.score = 0;

    // Increase difficulty by adding more obstacles
    const numObstaclesToAdd = 2; //Add 2 obstacles per level increase
    for (let i = 0; i < numObstaclesToAdd; i++) {
        this.obstacles.push(new Obstacle(this.gameScreen));
    }
    // Increase the level
    this.level++;

    // Update the level display
    this.updateLevelDisplay();
}

        endGame(){
            //remove elements from the DOM
            this.player.element.remove()
            this.obstacles.forEach(obstacle => obstacle.element.remove())
            this.obstacles = []

            //stop the game
            this.gameIsOver = true;
        
            // Hide game screen
            this.gameScreen.style.display = "none";
            // Show end game screen
            this.gameEndScreen.style.display = "block";
        }
    
    }