const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

//Variables globales
let canvasSize
let elementsSize

//Objeto que almacena las posiciones en el canvas
const playerPosition = {
    x: undefined,
    y: undefined,
}

function setCanvasSize(){
    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8
    }else{
        canvasSize = window.innerHeight * 0.8
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize  = canvasSize / 10

    startGame()
}

function startGame(){    //Funcion realiza los calculos para que responsivamente los emojis queden bien ubicados en el canvas
    game.font = elementsSize + 'px Arial'
    game.textAlign = 'end'

    const map = maps[0].match(/[IXO\-]+/g).map(a => a.split(""))

    game.clearRect(0, 0, canvasSize, canvasSize)

    map.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col]
            const posX = elementsSize * (colI + 1)
            const posY = elementsSize * (rowI + 1)

            if (col == 'O'){
                if (!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX
                    playerPosition.y = posY
                    console.log({playerPosition})
                }
            }
            game.fillText(emoji, posX, posY)
        })
        movePlayer()
    })
}

function movePlayer(){
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)

}

// Asignación de eventos para los botones y teclas de movimiento

window.addEventListener('keydown', moveByKeys)
btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)

function moveByKeys(){
    if (event.key == 'ArrowUp'){
        moveUp()
    } else if (event.key == 'ArrowLeft'){
        moveLeft()
    } else if (event.key == 'ArrowRight'){
        moveRight()
    } else if (event.key == 'ArrowDown'){
        moveDown()
    }
}

function moveUp(){
    //console.log('Hola arriba')

    if ((playerPosition.y - elementsSize) < elementsSize){
        console.log('out')
    } else{
        playerPosition.y -= elementsSize
        startGame()
    }
}

function moveLeft(){
    //console.log('Hola izquierda')
    
    if ((playerPosition.x - elementsSize) < elementsSize){
        console.log('out')
    } else{
        playerPosition.x -= elementsSize
        startGame()
    }
   
}

function moveRight(){
    //console.log('Hola derecha')
    if ((playerPosition.x + elementsSize) > canvasSize){
        console.log('out')
    } else{
        playerPosition.x += elementsSize
        startGame()
    }
}

function moveDown(){
    //console.log('Hola abajo')
    if ((playerPosition.y + elementsSize) > canvasSize){
        console.log('out')
    } else{
        playerPosition.y += elementsSize
        startGame()
    }
}