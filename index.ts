const container = document.getElementById("container") as HTMLElement;

const createSquare = () => {
  const square = document.createElement("div");
  square.classList.add("square");
  container.appendChild(square);
};

// Create 6 squares (assuming it's the initial state)
for (let i = 0; i < 6; i++) {
  createSquare();
}

let numberofSquares: number;
let colors: string[] = [];
let pickedColor: string;

const squares: HTMLElement[] = Array.from(document.querySelectorAll(".square"));
const colorDisplay = document.getElementById("colorDisplay") as HTMLElement;
const messageDisplay = document.querySelector("#message") as HTMLElement;
const h1 = document.querySelector("h1") as HTMLHeadingElement;
const resetButton = document.querySelector("#reset") as HTMLButtonElement;
const easyBtn = document.querySelector("#easyBtn") as HTMLButtonElement;
const hardBtn = document.querySelector("#hardBtn") as HTMLButtonElement;

const generateRandomColors = (num: number): string[] => {
  const colorArr = [];
  for (let i = 0; i < num; i++) {
    colorArr.push(randomColor());
  }
  return colorArr;
};

const randomColor = (): string => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const pickColor = (): string => {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
};

const reset = () => {
  colors = generateRandomColors(numberofSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New colors";
  h1.style.background = "steelblue";
  messageDisplay.textContent = "";
  squares.forEach((square, i) => {
    square.style.background = colors[i];
    square.style.display = i < numberofSquares ? "block" : "none";
  });
};

const setupEventListeners = () => {
  [easyBtn, hardBtn].forEach((btn) => {
    btn.addEventListener("click", () => changeDifficulty(btn.id));
  });
  resetButton.addEventListener("click", reset);
  squares.forEach((square) => {
    square.addEventListener("click", () => {
      const clickedColor = square.style.background;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Try Again?";
        changeColors(clickedColor);
        h1.style.background = clickedColor;
      } else {
        square.style.background = "#232323";
        messageDisplay.textContent = "Keep Trying";
      }
    });
  });
};

const changeColors = (color: string) => {
  squares.forEach((square) => (square.style.background = color));
};

const changeDifficulty = (btnId: string) => {
  numberofSquares = btnId === "hardBtn" ? 6 : 3;
  [easyBtn, hardBtn].forEach((btn) =>
    btn.classList.toggle("selected", btn.id === btnId)
  );
  reset();
};

(() => {
  numberofSquares = 6;
  colors = generateRandomColors(numberofSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  setupEventListeners();
  reset();
})();
