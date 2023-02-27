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