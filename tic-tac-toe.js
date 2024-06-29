
let grid = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];
let leftGrids = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const resultObject = JSON.parse(localStorage.getItem('result')) || {
  whiteWins: 0,
  blackWins: 0,
  ties: 0
};

let pickedSide = false; // 0 - белые; 1 - черные
let chooseWhite = document.querySelector('.js-choose-white');
let chooseBlack = document.querySelector('.js-choose-black'); 

let whiteWins = document.querySelector('.js-white-wins');
let blackWins = document.querySelector('.js-black-wins');
let ties = document.querySelector('.js-ties');

let modePlaying = false; // 0 - игра с компьютером; 1 - игра с самим собой
let buttonModePlay = document.querySelector('.button-mode-play'); 

whatIsChosen();
renderMode();
renderScore();

function renderMode() {
  if (!modePlaying) {
    buttonModePlay.innerHTML = 'Computer';
  } else {
    buttonModePlay.innerHTML = 'Self';
  }
}

function renderScore() {
  whiteWins.innerHTML = `White wins: ${resultObject.whiteWins}`;
  blackWins.innerHTML = `Black wins: ${resultObject.blackWins}`;
  ties.innerHTML = `Ties: ${resultObject.ties}`;
}

buttonModePlay.addEventListener('click', () => {
  !modePlaying ? modePlaying = true : modePlaying = false;
  renderMode();
});

chooseWhite.addEventListener('click', () => {
  pickedSide = false;
  whatIsChosen();
});

chooseBlack.addEventListener('click', () => {
  pickedSide = true;
  if (leftGrids.length >= 9) {
    renderComputerMove();
  }
  whatIsChosen();
});

let jsButtonObject = [{
  grid10: document.querySelector('.js-grid-1-0'),
  grid11: document.querySelector('.js-grid-1-1'),
  grid12: document.querySelector('.js-grid-1-2'),
  
  grid20: document.querySelector('.js-grid-2-0'),
  grid21: document.querySelector('.js-grid-2-1'),
  grid22: document.querySelector('.js-grid-2-2'),

  grid30: document.querySelector('.js-grid-3-0'),
  grid31: document.querySelector('.js-grid-3-1'),
  grid32: document.querySelector('.js-grid-3-2')
}];

jsButtonObject[0].grid10.addEventListener('click', () => {
  renderPlayerMove(0, 0, jsButtonObject[0].grid10, 1);
});
jsButtonObject[0].grid11.addEventListener('click', () => {
  renderPlayerMove(0, 1, jsButtonObject[0].grid11, 2);
});
jsButtonObject[0].grid12.addEventListener('click', () => {
  renderPlayerMove(0, 2, jsButtonObject[0].grid12, 3);
});
jsButtonObject[0].grid20.addEventListener('click', () => {
  renderPlayerMove(1, 0, jsButtonObject[0].grid20, 4);
});
jsButtonObject[0].grid21.addEventListener('click', () => {
  renderPlayerMove(1, 1, jsButtonObject[0].grid21, 5);
});
jsButtonObject[0].grid22.addEventListener('click', () => {
  renderPlayerMove(1, 2, jsButtonObject[0].grid22, 6);
});
jsButtonObject[0].grid30.addEventListener('click', () => {
  renderPlayerMove(2, 0, jsButtonObject[0].grid30, 7);
});
jsButtonObject[0].grid31.addEventListener('click', () => {
  renderPlayerMove(2, 1, jsButtonObject[0].grid31, 8);
});
jsButtonObject[0].grid32.addEventListener('click', () => {
  renderPlayerMove(2, 2, jsButtonObject[0].grid32, 9);
});

let whosMove = false; // 0 - ваш ход; 1 - ход компьютера
let colorMove = false; // 0 - белый ход; 1 - черный ход
let selfPlayingMove = false; // 0 - белый ход; 1 - черный ход / игра с собой расчет

// мой ход 
function renderPlayerMove(row, cellIndex, jsButton, cellNum) {
  whosMove = false;

  if (leftGrids.length % 2 !== 0) {
    selfPlayingMove = false; // белый ход
  } else {
    selfPlayingMove = true; // черный ход
  }

  if (!selfPlayingMove) {
    grid[row][cellIndex] = 1;
    jsButton.innerHTML = `<i class="gg-eye"></i>`;
    jsButton.classList.add('disable');
  } else {
    grid[row][cellIndex] = 2;
    jsButton.innerHTML = `<i class="gg-eye-alt"></i>`;
    jsButton.classList.add('disable');
  }

  if (!modePlaying) {
    if (!pickedSide) {
      grid[row][cellIndex] = 1;
      jsButton.innerHTML = `<i class="gg-eye"></i>`;
      jsButton.classList.add('disable');
    } else {
      grid[row][cellIndex] = 2;
      jsButton.innerHTML = `<i class="gg-eye-alt"></i>`;
      jsButton.classList.add('disable');
    }
  }

  // Убираю занятую ячейку из массива [leftGrids]
  leftGrids.forEach((element, index) => {
    if (element === cellNum) {
      leftGrids.splice(index, 1);
    }
  });

  if (leftGrids.length % 2 === 0) {
    colorMove = false; // белый ход
  } else {
    colorMove = true; // черный ход
  }

  evaluateResult();
}

// ход компьютера // вызывается после моего хода белых, или после того как я выбрал черных
function renderComputerMove() {
  whosMove = true;

  let computerMove = Math.floor(Math.random() * leftGrids.length);
  let cellNum = leftGrids[computerMove]; // номер ячейки , выбранный компьютером

  let row; // определяем строку по выбранной ячейке
  if ((cellNum >= 1) && (cellNum <= 3)) {
    row = 0;
  } else if ((cellNum >= 4) && (cellNum <= 6)) {
    row = 1;
  } else if ((cellNum >= 7) && (cellNum <= 9)) {
    row = 2;
  }
  let cellIndex;
  switch (cellNum) {
    case 1:
    case 4:
    case 7:
      cellIndex = 0;
      break;
    case 2:
    case 5:
    case 8:
      cellIndex = 1;
      break;
    case 3:
    case 6:
    case 9:
      cellIndex = 2;
      break;
  }
  let query = `.js-grid-${row + 1}-${cellIndex}`;
  console.log(query);
  let jsButton = document.querySelector(query);
  console.log(jsButton);
  if (!pickedSide) {
    grid[row][cellIndex] = 2;
    jsButton.innerHTML = `<i class="gg-eye-alt"></i>`;
    console.log(jsButton.innerHTML);
    jsButton.classList.add('disable');
  } else {
    grid[row][cellIndex] = 1;
    jsButton.innerHTML = `<i class="gg-eye"></i>`;
    jsButton.classList.add('disable');
  }
  // Убираю занятую ячейку из массива [leftGrids]
  leftGrids.forEach((element, index) => {
    if (element === cellNum) {
      leftGrids.splice(index, 1);
    }
  });
  console.log(cellNum, row, cellIndex, jsButton, leftGrids);

  if (leftGrids.length % 2 === 0) {
    colorMove = false; // белый ход
  } else {
    colorMove = true; // черный ход
  }

  evaluateResult();
}

function evaluateResult() {

  if ( ( (grid[0][0] !== 0) && (grid[0][1] !== 0) && (grid[0][2] !== 0) ) && 
     ( ( (grid[0][0] === 1) && (grid[0][1] === 1) && (grid[0][2] === 1) ) ||
       ( (grid[0][0] === 2) && (grid[0][1] === 2) && (grid[0][2] === 2) ) ) ) {
        return evaluateWinner();
  }

  if ( ( (grid[1][0] !== 0) && (grid[1][1] !== 0) && (grid[1][2] !== 0) ) && 
     ( ( (grid[1][0] === 1) && (grid[1][1] === 1) && (grid[1][2] === 1) ) ||
       ( (grid[1][0] === 2) && (grid[1][1] === 2) && (grid[1][2] === 2) ) ) ) {
        return evaluateWinner();
  }

  if ( ( (grid[2][0] !== 0) && (grid[2][1] !== 0) && (grid[2][2] !== 0) ) && 
     ( ( (grid[2][0] === 1) && (grid[2][1] === 1) && (grid[2][2] === 1) ) ||
       ( (grid[2][0] === 2) && (grid[2][1] === 2) && (grid[2][2] === 2) ) ) ) {
        return evaluateWinner();
  }

  if ( ( (grid[0][0] !== 0) && (grid[1][0] !== 0) && (grid[2][0] !== 0) ) && 
     ( ( (grid[0][0] === 1) && (grid[1][0] === 1) && (grid[2][0] === 1) ) ||
       ( (grid[0][0] === 2) && (grid[1][0] === 2) && (grid[2][0] === 2) ) ) ) {
        return evaluateWinner();
  }

  if ( ( (grid[0][1] !== 0) && (grid[1][1] !== 0) && (grid[2][1] !== 0) ) && 
     ( ( (grid[0][1] === 1) && (grid[1][1] === 1) && (grid[2][1] === 1) ) ||
       ( (grid[0][1] === 2) && (grid[1][1] === 2) && (grid[2][1] === 2) ) ) ) {
        return evaluateWinner();
  }

  if ( ( (grid[0][2] !== 0) && (grid[1][2] !== 0) && (grid[2][2] !== 0) ) && 
     ( ( (grid[0][2] === 1) && (grid[1][2] === 1) && (grid[2][2] === 1) ) ||
       ( (grid[0][2] === 2) && (grid[1][2] === 2) && (grid[2][2] === 2) ) ) ) {
        return evaluateWinner();
  }

  if ( ( (grid[0][0] !== 0) && (grid[1][1] !== 0) && (grid[2][2] !== 0) ) && 
     ( ( (grid[0][0] === 1) && (grid[1][1] === 1) && (grid[2][2] === 1) ) ||
       ( (grid[0][0] === 2) && (grid[1][1] === 2) && (grid[2][2] === 2) ) ) ) {
        return evaluateWinner();
  }

  if ( ( (grid[0][2] !== 0) && (grid[1][1] !== 0) && (grid[2][0] !== 0) ) && 
     ( ( (grid[0][2] === 1) && (grid[1][1] === 1) && (grid[2][0] === 1) ) ||
       ( (grid[0][2] === 2) && (grid[1][1] === 2) && (grid[2][0] === 2) ) ) ) {
       return evaluateWinner();
  }

  if (leftGrids.length === 0) {
    resultTitle.innerHTML = `<div class="iconInner"><i class="gg-eye-alt"></i></div> <div class="text-result">Tie</div> <div class="iconInner"><i class="gg-eye"></i></div>`
    resultObject.ties++;
    renderScore();
    localStorage.setItem('result', JSON.stringify(resultObject));
  }

  // если следующий ход компьютера
  if (!whosMove && !modePlaying) {
    if (leftGrids.length <= 1) {
      if (!pickedSide) {
        return;
      } else if (pickedSide) {
        renderComputerMove();
      }
    } else {
      renderComputerMove();
    }
  }
}

let resultTitle = document.querySelector('.js-title-result');
function evaluateWinner(winner) {
  if (!colorMove) {
    resultTitle.innerHTML = `<div class="text-result">White wins</div> <div class="iconInner"><i class="gg-eye"></i></div>`;
    resultObject.whiteWins++;
    renderScore();
  } else {
    resultTitle.innerHTML = `<div class="text-result">Black wins</div> <div class="iconInner"><i class="gg-eye-alt"></i></div>`;
    resultObject.blackWins++;
    renderScore();
  }
  localStorage.setItem('result', JSON.stringify(resultObject));
}

let refreshButton = document.querySelector('.js-refresh-button');
refreshButton.addEventListener('click', () => {
  
  // значения объекта преобразуем в массив
  let jsButtonArray = Object.values(jsButtonObject[0]);
  jsButtonArray.forEach( (element) => {
    element.classList.remove('disable');  // убираем класс "disable"
    element.innerHTML = '';               // очищаем ячейки 
  });

  leftGrids = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  resultTitle.innerHTML = ''

  // если при рефреше играешь за черных, белые ходят первыми
  if (pickedSide) { 
    renderComputerMove()
  }

});

function whatIsChosen() {
  let white = document.querySelector('.js-choose-white');
  let black = document.querySelector('.js-choose-black');
  if (!pickedSide) {
    white.classList.add('lighting');
    black.classList.remove('lighting');
  } else {
    white.classList.remove('lighting');
    black.classList.add('lighting');
  }
}