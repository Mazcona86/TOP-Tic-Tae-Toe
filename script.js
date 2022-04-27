'use strict';

const displayController = (() => {
  // DOM CACHE //
  const sectionMessage = document.querySelector('.section__message');
  const sectionPlayer = document.querySelector('.section__player');
  const toggleSwitch = 'section__player-turn--selected';
  let currentPlayer;

  function switchingPlayers() {
    if (this.currentPlayer === 'O') {
      console.log(this);
      this.currentPlayer = 'X';
      helperSwitch();
    } else {
      this.currentPlayer = 'O';
      helperSwitch();
    }
  }

  function helperSwitch() {
    sectionPlayer.children[0].classList.toggle(toggleSwitch);
    sectionPlayer.children[1].classList.toggle(toggleSwitch);
    console.log(this);
    sectionPlayer.children[2].textContent = `Player ${this.currentPlayer}: your turn!`;
  }

  return { currentPlayer, switchingPlayers };
})();

const gameBoard = (() => {
  const gameBoard = new Array(9);

  // DOM CACHE //
  const fieldBtn = document.querySelectorAll('.section__field');
  const restartBtn = document.querySelector('.section__restart-btn');

  function renderGame() {
    for (const field of fieldBtn) {
      field.addEventListener('click', render);
    }
  }

  function render(e) {
    if (e.target.textContent === '') {
      e.target.textContent = displayController.currentPlayer;
      gameBoard.splice(e.target.id, 1, displayController.currentPlayer);
      displayController.switchingPlayers();
    }
  }

  function init() {
    displayController.currentPlayer = 'O'; // Fixed, but it can be modified to select starting player here
    renderGame();
  }
  return { gameBoard, init };
})();

gameBoard.init();
