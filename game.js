const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#time')
const spanRecord = document.querySelector('#record')
const pResult = document.querySelector('#result')

//Variables globales
let canvasSize
let elementsSize
let level = 0
let lives = 3

let timeStart
let timePlayer
let timeInterval


//Objeto que almacena las posiciones en el canvas
const playerPosition = {
    x: undefined,
    y: undefined
}
const giftPosition = {
    x: undefined,
    y: undefined
}

let enemiesPosition = [] // Array que almacena posiciones de las bombas 

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

// function fixNumber(n){
//     return Number(n.toFixed(0))
// }

function setCanvasSize(){
    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.7
    }else{
        canvasSize = window.innerHeight * 0.7
    }

    canvasSize = Number(canvasSize.toFixed(0))
    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize  = canvasSize / 10

    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}

//Funcion realiza los calculos para que responsivamente los emojis queden bien ubicados en el canvas
function startGame(){    
    game.font = elementsSize + 'px Arial'
    game.textAlign = 'end'

    const m = maps[level]

    if (!m){
        gameWin()
        return
    }

    if (!timeStart){
        timeStart = Date.now()
        timeInterval = setInterval(showTime, 100)
        showRecord()
    }
    const map = m.match(/[IXO\-]+/g).map(a => a.split(""))

    showLives()

    enemiesPosition = []

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
            } else if (col == 'I'){
                giftPosition.x = posX
                giftPosition.y = posY
            } else if (col == 'X'){
                enemiesPosition.push({
                    x: posX,
                    y: posY
                })
            }
            game.fillText(emoji, posX, posY)
        })
    })
    movePlayer()
}

function movePlayer(){
    const giftCollisionX = playerPosition.x.toFixed(0) == giftPosition.x.toFixed(0)
    const giftCollisionY = playerPosition.y.toFixed(0) == giftPosition.y.toFixed(0)
    const exito = giftCollisionX && giftCollisionY

    if (exito){
        levelWin()
    }
    const enemyCollision = enemiesPosition.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(0) == playerPosition.x.toFixed(0)
        const enemyCollisionY = enemy.y.toFixed(0) == playerPosition.y.toFixed(0)
        return enemyCollisionX && enemyCollisionY
    })

    if (enemyCollision){
        levelFail()
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

function levelWin(){
    level ++
    startGame()
}

function gameWin(){
    console.log('Terminaste el juego')
    clearInterval(timeInterval)
    const recordTime = localStorage.getItem('record_time')
    const playerTime = Date.now() - timeStart
    
    if (recordTime){  
        if (recordTime >= playerTime){
            localStorage.setItem('record_time', playerTime)
            pResult.innerHTML = 'Felicidades!!! superaste el record'
        } else{
            pResult.innerHTML = 'No superaste el record :('
        }
    } else{
        localStorage.setItem('record_time', playerTime)
        pResult.innerHTML = 'Excelente!, ahora trata de superar tu record'
    }
    console.log({recordTime, playerTime})
}

function levelFail(){
    lives --


    if (lives <= 0){
        level = 0
        lives = 3
        timeStart = undefined
    }

    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()

}

function showLives(){
    hearthArray = Array(lives).fill(emojis['HEATH'])  // Creando una lista con la cantidad de elementos que tengo la variable lives
   
    spanLives.innerHTML = ""
    hearthArray.forEach(hearth => spanLives.append(hearth))
}

function showTime(){
    spanTime.innerHTML = Date.now() - timeStart
}

function showRecord(){
    spanRecord.innerHTML = localStorage.getItem('record_time')
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