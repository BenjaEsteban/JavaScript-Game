const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

//Variables globales
let canvasSize
let elementsSize

function setCanvasSize(){
    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8
    }else{
        canvasSize = window.innerHeight *0.8
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize  = canvasSize / 10

    startGame()
}

function startGame(){    //Funcion realiza los calculos para que responsivamente los emojis queden bien ubicados en el canvas
    game.font = elementsSize + 'px Arial'
    game.textAlign = 'end'

    for (let i = 1; i <= 10; i++) {  
        game.fillText(emojis['X'], elementsSize * i, elementsSize)  
    }
}