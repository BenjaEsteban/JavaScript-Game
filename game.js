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

    map.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col]
            const posX = elementsSize * (colI + 1)
            const posY = elementsSize * (rowI + 1)
            game.fillText(emoji, posX, posY)
        })
    })

    //OTRA MANERA DE CREAR EL MAPA

    // for (let row = 1; row <= 10; row++) {  
    //     for (let col = 1; col <= 10; col++){
    //         game.fillText(emojis[map[row - 1][col - 1]], elementsSize * col, elementsSize * row) 
    //     } 
    // }
}

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
    console.log('Hola arriba')
}

function moveLeft(){
    console.log('Hola izquierda')
}

function moveRight(){
    console.log('Hola derecha')
}

function moveDown(){
    console.log('Hola abajo')
}