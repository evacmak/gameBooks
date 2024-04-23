class Game {
    constructor(){
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");
        this.player = new Player(this.gameScreen, 200, 500, 100, 150, "../Images/Girl.png");
        this.height = 600;
        this.width = 500;
        this.obstacles = [];
        this.books = [];
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = Math.floor(1000/60);
        this.scoreDisplay = document.getElementById("score-display");
        this.levelDisplay = document.getElementById("level-display");
        this.livesDisplay = document.getElementById("lives");
        this.level = 1; 
    }

    start(){
        this.gameScreen.style.width = `${this.width}px`;
        this.gameScreen.style.height = `${this.height}px`;
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";

        this.gameIntervalId = setInterval(() => {
            this.gameLoop();
        }, this.gameLoopFrequency);
       
        this.updateLevelDisplay();
        this.updateLivesDisplay(); // Initialize the lives display
    }

    gameLoop(){
        console.log("gameLoop");
        this.update();

        if (this.gameIsOver){
            clearInterval(this.gameIntervalId);
        }   
    }

    updateScoreDisplay() {
        this.scoreDisplay.textContent = `Score: ${this.score}`;
    }

    updateLevelDisplay() {
        this.levelDisplay.textContent = `Level: ${this.level}`;
    }

    updateLivesDisplay() {
        this.livesDisplay.textContent = `Lives: ${this.lives}`;
    }

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

        if (Math.random() > 0.99 && this.books.length < 1) {
            this.books.push(new Book(this.gameScreen));
        }

        if (Math.random() > 0.99 && this.obstacles.length < 1) {
            this.obstacles.push(new Obstacle(this.gameScreen));
        }

        this.updateScoreDisplay();
    }

    increaseLevel() {
        this.score = 0;

        const numObstaclesToAdd = 2;
        for (let i = 0; i < numObstaclesToAdd; i++) {
            this.obstacles.push(new Obstacle(this.gameScreen));
        }
        this.level++;
        this.updateLevelDisplay();
    }

    endGame(){
        this.player.element.remove();
        this.obstacles.forEach(obstacle => obstacle.element.remove());
        this.obstacles = [];

        this.gameIsOver = true;
        
        this.gameScreen.style.display = "none";
        this.gameEndScreen.style.display = "block";
    }
}
