
const box = document.getElementById("box");
const gameContainer = document.getElementById("game-container");
const gameTimeInput = document.getElementById("gameTime");
const cumulativeReactionTimeDisplay = document.getElementById("cumulativeReactionTime");
const timeRemainingDisplay = document.getElementById("timeRemaining");
const reactionTimeTable = document.getElementById("reactionTimeTable");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");

let intervalId;
let boxMoveInterval;
let gameTime = 10;
let startTime;
let reactionTimes = [];
let timeRemaining;
let isPaused;
let seconds;

// Random Box Placement function will be added here
function placeBox(){
    const x = Math.floor(Math.random() * (gameContainer.clientWidth - box.clientWidth));
    const y = Math.floor(Math.random() * (gameContainer.clientHeight - box.clientHeight));
    box.style.left = `${x}px`;
    box.style.top = `${y}px`;
}

function startGame(){
    gameTime = Math.min(Math.max(1), 10);
    timeRemaining = gameTime;
    placeBox();
    updateTimer();
    box.style.display = 'block';

    if(!isPaused || isPaused === undefined){       
         //not more than 10 and less than 0
        reactionTimes = [];
        // This will clear the previous interval results
        reactionTimeTable.innerHTML = "";
        startTime = new Date().getTime();
            intervalId = setInterval(() => {
                timeRemaining--;
                updateTimer();
            }, 1000);
        
            boxMoveInterval = setInterval(placeBox, gameTimeInput.value * 1000);
    } else {
            intervalId = setInterval(() => {
                timeRemaining--;
                updateTimer();
            }, 1000);
        
            boxMoveInterval = setInterval(placeBox, gameTimeInput.value * 1000);
    }

    isPaused = false;
}

function pauseGame(){
    clearInterval(intervalId);
    clearInterval(boxMoveInterval);
    reactionTimes = [];
    box.style.display = 'none';
    isPaused = true;
}

// This is to reset the game
function resetGame(){
    clearInterval(intervalId);
    clearInterval(boxMoveInterval);
    reactionTimes = [];
    // This will clear the previous interval results
    reactionTimeTable.innerHTML = "";
    cumulativeReactionTimeDisplay.textContent = "Cumulative Reaction Time: 0ms";
    timeRemainingDisplay.textContent = "Remaining 0 s";
    isPaused = false;
    box.style.left = `0px`;
    box.style.top = `0px`;
    gameTimeInput.value = 1;
}

function updateTimer(){
    timeRemainingDisplay.textContent = `Remaining ${timeRemaining} s`;
}

box.addEventListener("click", () => {
    
    if(!isPaused){
        const currentTime = new Date().getTime();
        const ReactionTime = (currentTime - startTime) / 1000;
        reactionTimes.push(ReactionTime);
        startTime = currentTime;

        const cumulativeReactionTime = (reactionTimes.reduce((a, b) => a + b, 0)).toFixed(2);
        cumulativeReactionTimeDisplay.textContent = `Cumulative Reaction Time: ${cumulativeReactionTime}s`;
        

        const row = document.createElement("tr");
        const clickCell = document.createElement("td");
        clickCell.textContent = `${reactionTimes.length}`;
        const timeCell = document.createElement("td");
        timeCell.textContent = `${cumulativeReactionTime}s`;
        row.appendChild(clickCell);
        row.appendChild(timeCell);
        reactionTimeTable.appendChild(row);

        placeBox();
    }
});

startButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", pauseGame);
resetButton.addEventListener("click", resetGame);