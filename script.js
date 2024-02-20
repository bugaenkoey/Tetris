console.log("qwerty");
// Ctrl Shift i

const PLAYFIELD_COLUMS = 20;
const PLAYFIELD_ROWS = 20;
const TETROMINO_NAMES = ['O', 'J', 'L', 'S', 'Z', 'T', 'I'];

const TETRAMINOES = {
  'O': [
    [1, 1],
    [1, 1]
  ],

  'J': [
    // [0, 1, 0],
    // [0, 1, 0],
    // [1, 1, 0]

    
    [ 1, 1],
    [ 1],
    [ 1]
  ],

  'L': [
    // [1, 0, 0],
    // [1, 0, 0],
    // [1, 1, 0]

    [1],
    [1],
    [1, 1]
  ],

   'S': [
  //   [1, 0, 0],
  //   [1, 1, 0],
  //   [0, 1, 0]
  
  [1],
  [1, 1],
  [0, 1]
  ],

  'Z': [
    // [0, 1, 0],
    // [1, 1, 0],
    // [1, 0, 0]

    [0, 1],
    [1, 1],
    [1]
  ],

  'T': [

    // [0, 1, 0],
    // [1, 1, 0],
    // [0, 1, 0]

    [1],
    [1, 1],
    [1]

  ],

  'I': [

    // [1, 0, 0, 0],
    // [1, 0, 0, 0],
    // [1, 0, 0, 0],
    // [1, 0, 0, 0]

    // [1],
    // [1],
    // [1],
    // [1]

    [1],[1],[1],[1]
    
  ]
};

function convertPositionToIndex(row, column) {
  return row * PLAYFIELD_COLUMS + column;
}

let playfielf;
let tetramino;

function generatePlayField() {
  for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMS; i++) {
    const div = document.createElement(`div`);
    document.querySelector('.grid').append(div);
  }
  playfielf = new Array(PLAYFIELD_ROWS)
    .fill()
    .map(() => new Array(PLAYFIELD_COLUMS).fill(0));
    console.log(playfielf);
}

function generateTetramino() {
  const rndTetramino = Math.floor(Math.random() * TETROMINO_NAMES.length);
  const name = TETROMINO_NAMES[rndTetramino];
  const matrix = TETRAMINOES[name];

  tetramino = {
    name,
    matrix,
    row: 0,
    column: ((PLAYFIELD_COLUMS / 2)-1),
  };
  console.log(tetramino);
  console.log(playfielf);
}

generatePlayField();
generateTetramino();

const cells = document.querySelectorAll('.grid div');

function drawPlayField() {    
  for(let row = 0; row < PLAYFIELD_ROWS; row++){
    for(let column = 0; column < PLAYFIELD_COLUMS; column++){
      if(playfielf[row][column] == 0) continue;
      
      const name = playfielf[row][column];
      const cellIndex = convertPositionToIndex(row,column);
      cells[cellIndex].classList.add(name);

      console.log(cells);
    }
  }
}

function drawTetramino() {
  const name = tetramino.name;
  const tetraminoMatrixSize =  tetramino.matrix.length;
  console.log(tetraminoMatrixSize);

  for (let row = 0; row < tetraminoMatrixSize; row++) {
    for (let column = 0; column < tetraminoMatrixSize; column++) {
      if (!tetramino.matrix[row][column]) continue;
      const cellIndex = convertPositionToIndex(
        tetramino.row + row,
        tetramino.column + column
      );
      console.log(cellIndex);
      cells[cellIndex].classList.add(name);
      console.log(cells);
    }
  }
}

function draw() {
  cells.forEach(cell => cell.removeAttribute('class'));
  drawPlayField();
  drawTetramino();
}
draw();

document.addEventListener("keydown", onKeyDown);

function onKeyDown(e) {
  console.log(e);
  switch (e.key) {
    case "ArrowDown":
      moveTetraminoDown();
      break;
      case "ArrowLeft":
        moveTetraminoLeft();
      break;
    case "ArrowRight":
      moveTetraminoRight();
      break;
      case "ArrowUp":
        moveTetraminoUp();
        break;
  }
  draw();
}

function moveTetraminoDown() {
  tetramino.row += 1;
}

function moveTetraminoUp() {
  tetramino.row -= 1;
}

function moveTetraminoLeft() {
  tetramino.column -= 1;
}
function moveTetraminoRight() {
  tetramino.column += 1;
}
