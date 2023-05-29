let scoreh2 = document.getElementById('score');
let timeLefth2 = document.getElementById('timeLeft');
let startNewGameButton = document.getElementById('startNewGame');
let pauseGameButton = document.getElementById('pauseGame');
let squares = document.querySelectorAll('.square');
let grid = document.getElementsByClassName('grid')[0];
let gameMusic = new Audio('../../Assets/gameMusic.mp3');
let hitMusic = new Audio('../../Assets/hitMusic.mp3');


let score = 0;
let timeLeft = 0;
let targetPosition = null; 
let timerId = null;
let randomMoleId = null;

//Function place a mole in a random square
function randomMole() {
    squares.forEach(square => {
        square.classList.remove('mole');
    })
    let randomSquare = squares[Math.floor(Math.random() * squares.length)];
    randomSquare.classList.add('mole');
    targetPosition = randomSquare.id;
}

function countDown() {
    timeLeft--;
    timeLefth2.innerHTML = `Time Left: ${timeLeft}`;

    if(timeLeft === 0) {
        clearInterval(timerId);
        clearInterval(randomMoleId);
        grid.style.display = 'none';
    }
}

randomMole();

function startGame() {
    score = 0;
    timeLeft = 60;
    scoreh2.innerHTML = 'Your Score: 0';
    timeLeft.innerHTML = 'TimeLeft: 60';
    grid.style.display= 'flex';
    pauseGameButton.style.display = 'inline-block';
    pauseGameButton.innerHTML = 'Pause'
    gameMusic.play();
    //callback function - function calling another function
    // timerId and randomMoleId helps in stopping the functions in case the time left is 0
    timerId = setInterval(randomMole, 1000);
    randomMoleId = setInterval(countDown,1000);
}

function pauseResumeGame() {
    if(pauseGameButton.textContent === 'Pause') {
        gameMusic.pause();
        clearInterval(timerId);
        clearInterval(randomMoleId);
        timerId = null;
        randomMoleId = null;
        pauseGameButton.textContent = 'Resume';
    }
    else {
        gameMusic.play();
        timerId = setInterval(randomMole, 1000);
        randomMoleId = setInterval(countDown,1000);
        pauseGameButton.textContent = 'Pause';
    }
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(timerId !== null) {
            if(square.id === targetPosition) {
                hitMusic.play(); 
                setTimeout(() => {
                    hitMusic.pause();
                }, 1000);
                score++;
                scoreh2.innerHTML = `Your Score ${score}`;
                targetPosition = null;  //thsi resolved the issue of clicking on the same square multiple times
            }
        }
    })
})



startNewGameButton.addEventListener('click', startGame);
pauseGameButton.addEventListener('click', pauseResumeGame);

