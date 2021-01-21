const dino = document.querySelector('.dino');
const grid = document.querySelector('.grid');
const text = document.getElementById('text');

let isJumping = false;
let gravity = 0.9;
let position = 10;
let isGameOver = false;

const controller = function (e) {
    if (e.keyCode === 32) {
        if (!isJumping) {
            isJumping = true;
            jump();
        }
    }
}

document.addEventListener('keydown', controller);

const jump = function () {
    let count = 0;
    let timerId = setInterval(() => {
        if (count === 8) {
            clearInterval(timerId);
            let downTimer = setInterval(() => {
                position -= (30 * gravity);
                dino.style.bottom = position + 'px';
                count--;

                if (count === 0) {
                    clearInterval(downTimer);
                    isJumping = false;
                }
            }, 20)
        }

        count++;
        position += (30 * gravity);
        dino.style.bottom = position + 'px';
    }, 20);
}


const generateObstacle = function () {
    if (!isGameOver) {
        let randomTime = Math.random() * 4000;
        let obstaclePosition = 1500;
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstacle.style.left = obstaclePosition + 'px';
        grid.appendChild(obstacle);

        let obstacleTimer = setInterval(() => {
            if (obstaclePosition < 10) {
                clearInterval(obstacleTimer);
                obstacle.remove();
            }
            if (obstaclePosition < 120 && position < 60) {
                clearInterval(obstacleTimer);
                obstacle.remove();
                if (!isGameOver) text.innerHTML = 'Sorry! <h1>Game Over!</h1>';
                isGameOver = true;

                let allObstacles = document.querySelectorAll('.obstacle');
                allObstacles.forEach(singleObstacle => {
                    singleObstacle.remove();
                    clearInterval(singleObstacle);
                })
            }

            obstaclePosition -= 20;
            obstacle.style.left = obstaclePosition + 'px';

        }, 20)


        if (!isGameOver) setTimeout(generateObstacle, randomTime);
    }
}

generateObstacle();