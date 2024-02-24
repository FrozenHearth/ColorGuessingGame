var container = document.getElementById("container");
var createSquare = function () {
    var square = document.createElement("div");
    square.classList.add("square");
    container.appendChild(square);
};
// Create 6 squares (assuming it's the initial state)
for (var i = 0; i < 6; i++) {
    createSquare();
}
var numberofSquares;
var colors = [];
var pickedColor;
var squares = Array.from(document.querySelectorAll(".square"));
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var generateRandomColors = function (num) {
    var colorArr = [];
    for (var i = 0; i < num; i++) {
        colorArr.push(randomColor());
    }
    return colorArr;
};
var randomColor = function () {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
};
var pickColor = function () {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
};
var reset = function () {
    colors = generateRandomColors(numberofSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New colors";
    h1.style.background = "steelblue";
    messageDisplay.textContent = "";
    squares.forEach(function (square, i) {
        square.style.background = colors[i];
        square.style.display = i < numberofSquares ? "block" : "none";
    });
};
var setupEventListeners = function () {
    [easyBtn, hardBtn].forEach(function (btn) {
        btn.addEventListener("click", function () { return changeDifficulty(btn.id); });
    });
    resetButton.addEventListener("click", reset);
    squares.forEach(function (square) {
        square.addEventListener("click", function () {
            var clickedColor = square.style.background;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Try Again?";
                changeColors(clickedColor);
                h1.style.background = clickedColor;
            }
            else {
                square.style.background = "#232323";
                messageDisplay.textContent = "Keep Trying";
            }
        });
    });
};
var changeColors = function (color) {
    squares.forEach(function (square) { return (square.style.background = color); });
};
var changeDifficulty = function (btnId) {
    numberofSquares = btnId === "hardBtn" ? 6 : 3;
    [easyBtn, hardBtn].forEach(function (btn) {
        return btn.classList.toggle("selected", btn.id === btnId);
    });
    reset();
};
(function () {
    numberofSquares = 6;
    colors = generateRandomColors(numberofSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    setupEventListeners();
    reset();
})();
