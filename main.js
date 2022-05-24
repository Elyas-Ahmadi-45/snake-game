let canvas = document.querySelector('#playGround');
let c = canvas.getContext('2d');
let scoreLb = document.querySelector('#score');


////////

c.fillStyle = "blue";

for (i = 0; i < 20; i++) {
    for (j = 0; j < 20; j++) {
        c.fillRect(j * 20, i * 20, 20, 20);
    }
}
/////////////

c.fillStyle = "red";

let snake = [
    [1, 1],
];
let food = [];
let direction = 0;
let isPlaying = false;
let speed = 100;
let timer;
let isFood = false;
let score = 0;

c.fillRect((snake[0][1] - 1) * 20, (snake[0][0] - 1) * 20, 20, 20);

function start() {
    if (!isPlaying) {
        foodGenerator();
        move();
        isPlaying = true;
    }
}

function move() {
    timer = setInterval(() => {

        let coordinate = getCoodinates();
        let tail;

        if (coordinate[0] == food[0] && coordinate[1] == food[1]) {
            score++;
            scoreLb.innerHTML = score;
            isFood = false;
            tail = snake[snake.length - 1];
        } else {
            tail = snake.pop();
        }

        snake.forEach(node => {
            if (coordinate[0] == node[0] && coordinate[1] == node[1]) {
                clearInterval(timer);
                return;
            }
        });

        snake.unshift(coordinate);
        let head = snake[0];

        c.fillStyle = "blue";
        c.fillRect((tail[1] - 1) * 20, (tail[0] - 1) * 20, 20, 20);
        c.fillStyle = "red";
        c.fillRect((head[1] - 1) * 20, (head[0] - 1) * 20, 20, 20);

        //////////

        let f = foodGenerator();

        let validFood = true;
        for (k = 0; k < snake.length; k++) {
            if (snake[k][0] == f[0] && snake[k][1] == f[1]) {
                validFood = false;
                break;
            }
        }

        if (validFood && !isFood) {
            isFood = true;
            food[0] = f[0];
            food[1] = f[1];
            c.fillStyle = "yellow";
            c.fillRect((food[1] - 1) * 20, (food[0] - 1) * 20, 20, 20);
        }

        allowKey = true;

    }, speed);
}
// move();

function getCoodinates() {
    let head = snake[0];
    let result;
    switch (direction) {
        case 1:
            if (head[0] == 1) {
                result = [20, head[1]];
            } else {
                result = [head[0] - 1, head[1]];
            }
            break;
        case -1:
            if (head[0] == 20) {
                result = [1, head[1]];
            } else {
                result = [head[0] + 1, head[1]];
            }
            break;
        case 2:
            if (head[1] == 20) {
                result = [head[0], 1];
            } else {
                result = [head[0], head[1] + 1];
            }
            break;
        case -2:
            if (head[1] == 1) {
                result = [head[0], 20];
            } else {
                result = [head[0], head[1] - 1];
            }
    }

    return result;

}

let allowKey = true;
//////////////////////////
window.addEventListener('keydown', (e) => {
    if (allowKey) {
        allowKey = false;
        handleKey(e.key);
    }
});

function handleKey(key) {
    let temp;
    switch (key) {
        case 'ArrowUp':
            temp = 1;
            break;
        case 'ArrowDown':
            temp = -1;
            break;
        case 'ArrowRight':
            temp = 2;
            break;
        case 'ArrowLeft':
            temp = -2;
            break;
        default:
            temp = 0;
    }

    // north = 1
    // south = -1
    // east = 2
    // west = -2

    if (temp != 0) {
        if (direction + temp != 0) {
            direction = temp;
            start();
        }
    }

}
//////////////

function foodGenerator1() {

    let i;
    let j;
    let b = 1;
    while (b == 1) {
        i = 1 + Math.floor(Math.random() * 20);
        j = 1 + Math.floor(Math.random() * 20);

        b = 0;

        for (k = 0; k < snake.length; k++) {
            if (snake[k][0] == i && snake[k][1] == j) {
                b = 1;
                break;
            }
        }
    }

    food = [i, j];

    c.fillStyle = "yellow";
    c.fillRect((food[1] - 1) * 20, (food[0] - 1) * 20, 20, 20);
}

function foodGenerator() {
    let i = 1 + Math.floor(Math.random() * 20);
    let j = 1 + Math.floor(Math.random() * 20);
    return [i, j];
}