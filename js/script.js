const startButton = document.getElementById("start-button");
// Não toquei no restart button - ATENÇÃO
const restartButton = document.getElementById("restart-button");
let game = null;

startButton.addEventListener("click", function () {
    startGame();
});

function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
}

function handleKeyDown(event) {
    const key = event.key;
    const possibleKeys = ["ArrowLeft", "ArrowRight"];
    
    if (possibleKeys.includes(key)) {
        // Prevent default behavior
        event.preventDefault();
    
        // Velocidade do player
        switch (key) {
            case "ArrowLeft":
                game.player.directionX = -2;
                break;
            case "ArrowRight":
                game.player.directionX = 2;
                break;
        }
    }
}

// Register event listeners outside of any function
window.addEventListener('keydown', handleKeyDown);

window.addEventListener('keyup', () => {
    game.player.directionX = 0;
    game.player.directionY = 0;
});
