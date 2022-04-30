'use strict';

const displayController = (() => {
  // DOM CACHE //
  const sectionPlayer = document.querySelector('.section__player');
  const playerSelectedBtn = 'section__player-turn--selected';
  const currentPlayer = 'O'; // Fixed, but it can be modified to select starting player

  function resetConditions() {
    this.currentPlayer = 'O';
    if (!sectionPlayer.children[0].classList.contains(playerSelectedBtn)) {
      _togglePlayers();
    }
    displayGameMessage.call(this, 'switch');
  }

  function switchingPlayers() {
    if (this.currentPlayer === 'O') {
      this.currentPlayer = 'X';
      _togglePlayers();
      displayGameMessage.call(this, 'switch');
    } else {
      this.currentPlayer = 'O';
      _togglePlayers();
      displayGameMessage.call(this, 'switch');
    }
  }

  function displayGameMessage(condition) {
    if (condition === 'switch') {
      sectionPlayer.children[2].textContent = `Player ${this.currentPlayer}: your turn!`;
    }
    if (condition === 'winner') {
      sectionPlayer.children[2].textContent = `Player ${this.currentPlayer} has won!!!!`;
    }
    if (condition === 'draw') {
      sectionPlayer.children[2].textContent = `The game is a draw!!`;
    }
  }

  function _togglePlayers() {
    sectionPlayer.children[0].classList.toggle(playerSelectedBtn);
    sectionPlayer.children[1].classList.toggle(playerSelectedBtn);
  }

  return {
    currentPlayer,
    switchingPlayers,
    resetConditions,
    displayGameMessage,
  };
})();

const gameBoard = (() => {
  const gameBoard = new Array(9).fill(undefined);
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // DOM CACHE //
  const fieldBtn = document.querySelectorAll('.section__field');
  const restartBtn = document.querySelector('.section__restart-btn');

  function _renderGame() {
    for (const field of fieldBtn) {
      field.addEventListener('click', _render);
    }
    restartBtn.addEventListener('click', _helperRestart);
  }

  // To render clicks and to check the winner after currentplayer´s click
  function _render(e) {
    if (e.target.textContent === '') {
      e.target.textContent = displayController.currentPlayer;
      gameBoard.splice(e.target.id, 1, displayController.currentPlayer);
      e.target.classList.add('disableddiv');
    }
    if (_checkForWinner()) {
      displayController.displayGameMessage.call(displayController, 'winner');
      fieldBtn.forEach(field => field.classList.add('disableddiv'));
      return;
    }
    if (_checkForDraw()) {
      displayController.displayGameMessage('draw');
      return;
    }

    displayController.switchingPlayers();
  }

  function _checkForDraw() {
    return gameBoard.every(field => field === 'X' || field === 'O');
  }

  function _checkForWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (
        gameBoard[a] === undefined ||
        gameBoard[b] === undefined ||
        gameBoard[c] === undefined
      ) {
      } else if (
        gameBoard[a] === gameBoard[b] &&
        gameBoard[b] === gameBoard[c]
      ) {
        return true;
      }
    }
  }

  function _helperRestart() {
    for (let i = 0; i < gameBoard.length; i++) {
      gameBoard[i] = undefined;
    }

    fieldBtn.forEach(field => {
      field.textContent = '';
      field.classList.remove('disableddiv');
    });
    displayController.resetConditions();
  }

  // To start the GAME
  function init() {
    _renderGame();
  }
  return { gameBoard, init };
})();

gameBoard.init();
