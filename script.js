const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: 50,
    y: 50,
    size: 20,
    color: 'blue',
    speed: 5
};

const enemy = {
    x: 300,
    y: 300,
    size: 20,
    color: 'red',
    speed: 2
};

const maze = generateMaze(15, 15);

function generateMaze(rows, cols) {
    const maze = [];
    for (let i = 0; i < rows; i++) {
        maze[i] = [];
        for (let j = 0; j < cols; j++) {
            maze[i][j] = Math.random() > 0.7 ? 1 : 0;
        }
    }
    return maze;
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawEnemy() {
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
}

function drawMaze() {
    const cellSize = canvas.width / maze.length;
    ctx.fillStyle = 'black';
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            if (maze[i][j] === 1) {
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            }
        }
    }
}

function movePlayer() {
    if (keys['w'] && player.y > 0) player.y -= player.speed;
    if (keys['s'] && player.y < canvas.height - player.size) player.y += player.speed;
    if (keys['a'] && player.x > 0) player.x -= player.speed;
    if (keys['d'] && player.x < canvas.width - player.size) player.x += player.speed;
}

function moveEnemy() {
    if (enemy.x < player.x) enemy.x += enemy.speed;
    if (enemy.x > player.x) enemy.x -= enemy.speed;
    if (enemy.y < player.y) enemy.y += enemy.speed;
    if (enemy.y > player.y) enemy.y -= enemy.speed;
}

function checkCollision() {
    if (player.x < enemy.x + enemy.size &&
        player.x + player.size > enemy.x &&
        player.y < enemy.y + enemy.size &&
        player.y + player.size > enemy.y) {
        alert('Game Over!');
        document.location.reload();
    }
}

const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    movePlayer();
    moveEnemy();
    checkCollision();
    drawPlayer();
    drawEnemy();
    requestAnimationFrame(gameLoop);
}

gameLoop();
