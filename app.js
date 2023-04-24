// Start Screen Variable
const startBtn = document.querySelector('.container .game-menu > button.play');
const startState = document.querySelector('.game-menu');


// Maingame Variable //
const mainGame = document.querySelector('.game');
const userScoreDisplay = document.querySelector('.userScore');
const botScoreDisplay = document.querySelector('.botScore');

const userPickResult = document.querySelector('.userPickResult');
const botPickResult = document.querySelector('.botPickResult');

const resultDisplay = document.querySelector('.resultDisplay');
const gameOverState = document.querySelector('.gameOver');
const gameResult = document.querySelector('.gameResult');
const replayBtn = document.querySelector('.replay');

let userScore = 0;
let botScore = 0;


// Start Game
startBtn.addEventListener('click', (e) => {
	mainScreen();
})

// Main Screen
function mainScreen() {
	startState.style.display = "none";
	mainGame.style.display = "block";
	Game();
}

// Playing The Game
function playRound(userPick, botPick) {
	if (userPick === botPick) {
		resultDisplay.textContent = `It's a tie!`;
	} else if (
		(userPick === 'rock' && botPick === 'scissors') ||
		(userPick === 'paper' && botPick === 'rock') || 
		(userPick === 'scissors' && botPick === 'paper')
	) {
		userScore++;
		resultDisplay.textContent = `You Win! ${userPick} beats ${botPick}`;
	} else {
		botScore++;
		resultDisplay.textContent = `You lose! ${botPick} beats ${userPick}`;
	}
}

// Update Score
function updateScore() {
	userScoreDisplay.textContent = `Player : ${userScore}`;
	botScoreDisplay.textContent = `Computer: ${botScore}`;
}

// GameOver
function gameOver() {
	mainGame.style.display = 'none';
	gameOverState.style.display = 'block';
	replayBtn.addEventListener('click', resetGame);
}

// Restart Game
function resetGame() {
	userScore = 0;
	botScore = 0;
	updateScore();
	gameResult.textContent = '';
	mainGame.style.display = 'block';
	gameOverState.style.display = 'none';
}

function Game() {
	// loop through all btn
	const buttons = document.querySelectorAll('.userPick button');
	buttons.forEach(btn => {
		btn.addEventListener('click', (e) => {

			// get image src from current btn
			const imageSrc = e.currentTarget.querySelector('img').src;
			// Set the userpick image to the screen
			userPickResult.src = imageSrc;

			const botImg = ['img/r.png', 'img/p.png', 'img/s.png'];
			let random = Math.floor(Math.random() * botImg.length);
			botPickResult.src = botImg[random];

			// assign the random number into array
			let botPick = ['rock', 'paper', 'scissors'][random];
			let userPick = btn.id;

			playRound(userPick, botPick);
			updateScore();

			if (userScore === 5) {
				gameResult.textContent = `You Win 😎🤗`;
				gameOver();
			} else if (botScore === 5) {
				gameResult.textContent = `Computer Wins 🤖💀`
				gameOver();
			}
		})
	})
}