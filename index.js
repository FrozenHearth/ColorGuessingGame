let numberofSquares;
let colors = [];
let pickedColor;

const squares = document.querySelectorAll('.square');
const colorDisplay = document.getElementById('colorDisplay');
const messageDislay = document.querySelector('#message');
const h1 = document.querySelector('h1');
const resetButton = document.querySelector('#reset');
const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');

const generateRandomColors = (num) => {
  // Create the colors array and return it.
  let colorArr = [];
  // Repeat num times (num = numberofSquares(3 or 6))
  for (let i = 0; i < num; i++) {
    //generate the color and push it to array
    colorArr.push(randomColor());
  }
  return colorArr;
};

const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const pickColor = () => {
  // Pick a random color index from the colors array
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
};

const reset = () => {
  let colors = generateRandomColors(numberofSquares);
  const pickedColor = pickColor();
  const {textContent: colorText} = colorDisplay;
  const colorsCopy = colors.slice();

  colorText = pickedColor;

  squares.forEach((square, i) => {
    if (colorsCopy[i]) {
      square.style.background = colorsCopy[i];
      square.style.display = 'block';
    } else {
      square.style.display = 'none';
    }
  });

  resetButton.textContent = 'New colors';
  h1.style.background = 'steelblue';
  messageDislay.textContent = '';
};

// Initialize the values

(() => {
  numberofSquares = 6;
  colors = generateRandomColors(numberofSquares);
  pickedColor = pickColor(); // Pick a random color from one of the 6 values pushed to colors array

  // Button event listeners
  [easyBtn, hardBtn].forEach((element) => {
    element.addEventListener('click', (e) => changeDifficulty(e.target.id));
  });

  resetButton.addEventListener('click', reset);

  /*==============
        UI
  ===============*/

  colorDisplay.textContent = pickedColor;
  squares.forEach((square, i) => {
    //Add initial colors to squares
    square.style.background = colors[i];

    //Add click listeners to squares
    square.addEventListener('click', () => {
      //grab color of clicked square
      const clickedColor = square.style.background;
      if (clickedColor === pickedColor) {
        messageDislay.textContent = 'Correct!';
        resetButton.textContent = 'Try Again?';
        changeColors(clickedColor);
        h1.style.background = clickedColor;
      } else {
        square.style.background = '#232323';
        messageDislay.textContent = 'Keep Trying';
      }
    });
  });
})();

const changeColors = (color) => {
  // Loop through all squares and change each color to match given color when the correct square is clicked.
  squares.forEach((_, i) => (squares[i].style.background = color));
};

const changeDifficulty = (btnId) => {
  //Change the number of squares depending on difficulty
  numberofSquares = btnId === 'hardBtn' ? 6 : 3;

  if (btnId === 'hardBtn') {
    hardBtn.classList.add('selected');
    easyBtn.classList.remove('selected');
  } else {
    easyBtn.classList.add('selected');
    hardBtn.classList.remove('selected');
  }
  //Reset the UI
  reset();
};
