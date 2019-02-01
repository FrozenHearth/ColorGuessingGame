let squareNumber;
let colors = [];
let pickedColor;

const squares = document.querySelectorAll('.square');
const colorDisplay = document.getElementById('colorDisplay');
const messageDislay = document.querySelector('#message');
const h1 = document.querySelector('h1');
const resetButton = document.querySelector('#reset');
const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');
 
(function init(){
	squareNumber = 6;
	colors = generateRandomColors(squareNumber);
	pickedColor = pickColor();
	
	// Button event listeners
	[easyBtn, hardBtn].forEach(element => {
		element.addEventListener('click', e => changeDifficulty(e.target.id));
	});
	
	resetButton.addEventListener('click', reset);
    
	// UI
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
                resetButton.textContent = 'Try Again?'
                changeColors(clickedColor);
                h1.style.background = clickedColor;
            } else {
                square.style.background = '#232323';
                messageDislay.textContent = 'Try Again';
            }
        });
    });
})();
 
function reset(){
    // Generate new colors
    colors = generateRandomColors(squareNumber);
    
    // Pick a new color from the array 
    pickedColor = pickColor();
    
    // Change color display to match picked color 
    colorDisplay.textContent = pickedColor;
    
    // Change color of squares
    squares.forEach((square, i) => {
        if(colors[i]){
            square.style.background = colors[i];
            square.style.display = 'block';
        } else {
            square.style.display = 'none';
        }
    });
    
    resetButton.textContent = 'New colors';
    h1.style.background = 'steelblue';
    messageDislay.textContent = '';
}
 
function changeColors(color) {
    // Loop through all squares and change each color to match given color
    squares.forEach((el, i) => squares[i].style.background = color);
}
 
function pickColor(){
	// Pick a random color
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
}
 
function generateRandomColors(num){
    // Create the colors array
    const colorArr = [];
    // Repeat num times
    for(let i = 0; i < num; i++){
        //generate the color and push it to array
        colorArr.push(randomColor());
    }    
    return colorArr;
}
 
function randomColor(){
    const r = Math.floor(Math.random() * 256); //red
    const g = Math.floor(Math.random() * 256); //green
    const b = Math.floor(Math.random() * 256); //blue
    return `rgb(${r}, ${g}, ${b})`;
}
 
function changeDifficulty(btnId) {
	//Change the number of squares depending of difficulty
	squareNumber = btnId === 'hardBtn' ? 6 : 3;
 
    if (btnId === 'hardBtn') {
        hardBtn.classList.add('selected')
        easyBtn.classList.remove('selected');
    } else {
        easyBtn.classList.add('selected');
        hardBtn.classList.remove('selected')
    }
    //Reset the UI
	reset();
}