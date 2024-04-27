class Obstacle {
    constructor(gameScreen){
        this.gameScreen = gameScreen
        this.left = Math.floor(Math.random() * 300 + 50) //aqui estamos a fazer a width da estrada para aparecer obstáculos e damos sempre margem de 50 do lado esquerdo para nao ir para a relva
        this.top = 0;
        this.width = 60;
        this.height = 80;
        this.element = document.createElement("img")
        this.element.src = "../Images/shopping_stand_in_pixel_art_style_Stock_Vector-removebg-preview.png"
          //Position the obstacle on the screen
          this.element.style.position = "absolute";

          //Size of the obstacle
          this.element.style.width = `${this.width}px`;
          this.element.style.height = `${this.height}px`;
  
          //Position the obstacle
          this.element.style.left = `${this.left}px`;
          this.element.style.top = `${this.top}px`;
  
          //When we create an obstacle, we are adding it to the div game-screen
          this.gameScreen.appendChild(this.element)
    }

    move(){
        this.top += 3
        this.updatePosition()
    }

    updatePosition(){
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
      }
}