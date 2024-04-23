class Book {
    constructor(gameScreen){
        this.gameScreen = gameScreen
        this.left = Math.floor(Math.random() * 300 + 50) //aqui estamos a fazer a width da estrada para aparecer obstáculos e damos sempre margem de 50 do lado esquerdo para nao ir para a relva
        this.top = 0;
        this.width = 100;
        this.height = 150;
        this.element = document.createElement("img")
        this.element.src = "../Images/book.png"
          //Position the Book on the screen
          this.element.style.position = "absolute";

          //Size of the Book
          this.element.style.width = `${this.width}px`;
          this.element.style.height = `${this.height}px`;
  
          //Position the Book
          this.element.style.left = `${this.left}px`;
          this.element.style.top = `${this.top}px`;
  
          //When we create a Book, we are adding it to the div game-screen
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