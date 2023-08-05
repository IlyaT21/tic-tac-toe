//Get the playing field
//Will be used for implemetning AI in the future
// const field = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ];

const fieldItems = document.querySelectorAll('.field');
const replayBtn = document.getElementById('replayBtn');
let currentPlayer = 'o';
const playerMoves = {
	o: [],
	x: []
};

// Function to check if the game board has a winning combination
function checkWinningCombination(moves) {
	const winningCombinations = [
		// Rows
		['a1', 'b1', 'c1'],
		['a2', 'b2', 'c2'],
		['a3', 'b3', 'c3'],

		// Columns
		['a1', 'a2', 'a3'],
		['b1', 'b2', 'b3'],
		['c1', 'c2', 'c3'],

		// Diagonals
		['a1', 'b2', 'c3'],
		['a3', 'b2', 'c1']
	];

	for (const combination of winningCombinations) {
		if (combination.every(pos => moves.includes(pos))) {
			console.log(`Player ${currentPlayer.toUpperCase()} wins!`);
			document.getElementById('result').innerText = 'Player ' + currentPlayer.toUpperCase() + ' wins!';
			return true;
		}
	}

	return false;
}

// Function to check if the game board is a draw
function checkDraw() {
	return [...fieldItems].every(item => item.getAttribute('data-check') !== "");
}

function handleGridItemClick(event) {
	const clickedItem = event.target;

	// Check if the item is already marked
	if (!clickedItem.classList.contains('active-o') && !clickedItem.classList.contains('active-x')) {
		clickedItem.classList.add(`active-${currentPlayer}`);
		clickedItem.setAttribute('data-check', currentPlayer);
		const position = clickedItem.id;

		// Store the clicked position in the playerMoves object
		playerMoves[currentPlayer].push(position);

		// Check for a winning combination after each move
		if (checkWinningCombination(playerMoves[currentPlayer])) {
			fieldItems.forEach(item => {
				item.disabled = true;
			});

			replayBtn.style.display = 'block';
		} else if (checkDraw()) {
			document.getElementById('result').innerText = 'Round Draw';
			replayBtn.style.display = 'block';
		}

		// Switch players for the next move
		currentPlayer = currentPlayer === 'o' ? 'x' : 'o';
		document.getElementById('currPlayer').innerText = currentPlayer;
	}
}

// Function to reset the game board
function resetGameBoard() {
	// Reset Fields
	fieldItems.forEach(item => {
		item.classList.remove('active-o', 'active-x');
		item.setAttribute('data-check', '');
		item.disabled = false;
		replayBtn.style.display = 'none';
	});

	// Reset player moves
	playerMoves.o = [];
	playerMoves.x = [];

	// Reset currentPlayer to 'o' for the next game
	currentPlayer = 'o';
	document.getElementById('currPlayer').innerText = currentPlayer;
	document.getElementById('result').innerText = '';
}

// Add event listeners to all grid items
fieldItems.forEach(item => {
	item.addEventListener('click', handleGridItemClick);
});

// Add event listener to the Replay button
replayBtn.addEventListener('click', resetGameBoard);

// Add event listeners to all grid items
fieldItems.forEach(item => {
	item.addEventListener('click', handleGridItemClick);
});