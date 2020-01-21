const score = document.querySelector('.score');
const startButton = document.querySelector('.startButton');
const gameArea = document.querySelector('.gameArea')

const player = {
    x: 0,
    y: 0,
    speed: 3,
    score: 0,
    level: 1,
    gameOver: false
}
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false
}


function moveLines() {
    let lines = document.querySelectorAll('.line')

    lines.forEach((line) => {
        line.y += player.speed;
        if (line.y > gameArea.getBoundingClientRect().height) {
            line.y = gameArea.getBoundingClientRect().top;
        }
        line.style.top = line.y + 'px';
    })
}

function buildLIne() {
    for (let i = 0; i < 10; i++) {
        let line = document.createElement('div')
        line.classList.add('line')
        line.style.top = i * 150 + 'px';
        line.y = i * 150;
        gameArea.appendChild(line)
    }
}

function increaseLevel() {
    if (player.score > 1000 && player.level === 1) {
        player.speed += 1
        player.level = 2
    }
    if (player.score > 2000 && player.level === 2) {
        player.speed += 1
        player.level = 3
    }
    if (player.score > 3000 && player.level === 3) {
        player.speed += 1
        player.level = 4
    }
    if (player.score > 4000 && player.level === 4) {
        player.speed += 1
        player.level = 5
    }
    if (player.score > 5000 && player.level === 5) {
        player.speed += 1
        player.level = 6
    }
    if (player.score > 6000 && player.level === 6) {
        player.speed += 1
        player.level = 7
    }
}

function moveEnemy(car) {
    let enemies = document.querySelectorAll('.enemy')

    enemies.forEach((enemy, i) => {

        if (isColllided(car, enemy)) {
            return gameStopped();
        }

        let widthArray = [
            [0, gameArea.getBoundingClientRect().width / 2],
            [gameArea.getBoundingClientRect().width / 2+30, gameArea.getBoundingClientRect().width - 50]
        ]
        enemy.y += player.speed;
        if (enemy.y > gameArea.getBoundingClientRect().height) {
            enemy.x = getRandomInt(widthArray[i][0], widthArray[i][1])
            enemy.y = getRandomInt(10, 50)
        }

        enemy.style.top = enemy.y + 'px';
        enemy.style.left = enemy.x + 'px';
    })
    increaseLevel();

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildEnemy() {
    let widthArray = [
        [0, gameArea.getBoundingClientRect().width / 2],
        [gameArea.getBoundingClientRect().width / 2+30, gameArea.getBoundingClientRect().width - 50]
    ]

    for (let i = 0; i < 2; i++) {
        let enemy = document.createElement('div')
        enemy.classList.add('enemy')
        enemy.x = getRandomInt(widthArray[i][0], widthArray[i][1])
        enemy.y = getRandomInt(10, 50)

        enemy.style.left = enemy.x + 'px';
        enemy.style.top = enemy.y + 'px';

        enemy.innerHTML = 'enemy'
        gameArea.appendChild(enemy)
    }
}

function startPlay() {

    let car = document.querySelector('.car');
    let roadCoordinates = gameArea.getBoundingClientRect();
    moveLines();
    moveEnemy(car)

    if (player.start) {
        if (keys.ArrowUp && player.y > 0) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < roadCoordinates.height - car.getBoundingClientRect().height) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < roadCoordinates.width - car.getBoundingClientRect().width) {
            player.x += player.speed;
        }

        car.style.left = player.x + 'px';
        car.style.top = player.y + 'px';

        window.requestAnimationFrame(startPlay)
        player.score++;
        score.innerHTML = `Score: ${player.score}. Level:${player.level}`

    }





}

function isColllided(car, enemy) {
    let coordinationOfCar = car.getBoundingClientRect();
    let coordinationOfEnemy = enemy.getBoundingClientRect();
    return !((coordinationOfCar.top > coordinationOfEnemy.bottom - 15) ||
        (coordinationOfCar.bottom < coordinationOfEnemy.top + 10) ||
        (coordinationOfCar.left) > coordinationOfEnemy.right - 10 ||
        (coordinationOfCar.right < coordinationOfEnemy.left + 10))


}

function gameStopped() {
    player.start = false;
    score.innerHTML = `Game Over! Score: ${player.score}, Level: ${player.level}`
    player.start = false;
    startButton.removeAttribute('disabled')
    player.gameOver = true;
}

function onGameStart(e) {
    if (player.gameOver) {
        startButton.setAttribute('disabled', '1')
        generateGameBoard();
    } else {
        player.start = true
        startButton.setAttribute('disabled', '1')

    }
    window.requestAnimationFrame(startPlay)



}


function onkeyDown(e) {
    e.preventDefault()
    keys[e.key] = true;
}

function onkeyUp(e) {
    e.preventDefault()
    keys[e.key] = false;
}

function generateGameBoard() {
    player.x = 0;
    player.y = 0;
    player.speed = 3;
    player.level = 1;
    player.score = 0;
    player.start = true;
    gameArea.innerHTML = ''

    score.innerHTML = `Score: ${player.score}. Level:${player.level}`

    let car = document.createElement('div');
    car.innerHTML = 'Car';
    car.classList.add('car')
    car.style.left = gameArea.getBoundingClientRect().width / 2 - 30
    car.style.top = gameArea.getBoundingClientRect().height - 60

    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop
    buildLIne();
    buildEnemy();
}


generateGameBoard();
startButton.addEventListener('click', onGameStart)
document.addEventListener('keyup', onkeyUp)
document.addEventListener('keydown', onkeyDown)