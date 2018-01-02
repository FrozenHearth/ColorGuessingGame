
var numberOfSquares = 6;

var colors = generateRandomColors(numberOfSquares);

var squares = document.querySelectorAll(".square");

var pickedColor = pickColor();

var colorDisplay = document.getElementById("colorDisplay");

var messageDisplay = document.querySelector("#message");

var h1= document.querySelector("h1");

var resetButton = document.querySelector("#reset");

var easyBtn = document.querySelector("#easyBtn");

var hardBtn = document.querySelector("#hardBtn");


easyBtn.addEventListener("click", function()
{
	hardBtn.classList.remove("selected");
	easyBtn.classList.add("selected");
	numberOfSquares = 3;
	colors = generateRandomColors(numberOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i=0;i<squares.length;i++)
		{
			if(colors[i])
				{
					squares[i].style.backgroundColor = colors[i];
				}
					else
						{
							squares[i].style.display = "none";
						}
		}
});

hardBtn.addEventListener("click", function()
{
	hardBtn.classList.add("selected");
	easyBtn.classList.remove("selected");
	numberOfSquares = 6;
	colors = generateRandomColors(numberOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i=0;i<squares.length;i++)
		{
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		}
});

resetButton.addEventListener("click", function()
{
	//Generate all new colors
	colors = generateRandomColors(numberOfSquares);
	//Pick a new random color from array
	pickedColor = pickColor();
	//Change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	this.textContent = "New Colors";
	messageDisplay.textContent = "";
	//Change colors of squares
	for(var i=0;i<squares.length; i++)
		{
			squares[i].style.backgroundColor = colors[i];
		}
	h1.style.backgroundColor = "steelblue";
})

colorDisplay.textContent = pickedColor;

for(var i=0;i<squares.length;i++)
	{
		//Add initial colors to squares
		squares[i].style.backgroundColor = colors[i];

		//Add click listeners to squares
		squares[i].addEventListener("click", function()
		{
			//Grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//Compare color to pickedColor
			console.log(clickedColor, pickedColor);
			if(clickedColor===pickedColor)
			{
				messageDisplay.textContent = "Correct";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			}  
				else {
					this.style.backgroundColor= "#232323";
					messageDisplay.textContent= "Try Again";
				}
		});
	}

	function changeColors(color)
	{
		//Loop through all squares 
		for(var i=0;i<squares.length;i++)
			{
		//change each color to match given color
				squares[i].style.backgroundColor = color;
			}
	}

		function pickColor()
		{
			var random = Math.floor(Math.random() * colors.length);
			return colors[random];
		}

			function generateRandomColors(num)
			{
				//Make an array
				var arr=[]
				//repeat num times
				for(var i=0;i<num;i++)
					{
						//get random colors and push into array 
						arr.push(randomColor());
					}
				//Return that array
				return arr;  
			}

				function randomColor()
				{
					//Pick a "red" from 0-255
					var r = Math.floor(Math.random() * 256);
					//Pick a "green" from 0-255
					var g = Math.floor(Math.random() * 256);
					//Pick a "blue" from 0-255
					var b = Math.floor(Math.random() * 256);

					return "rgb(" + r + ", " + g + ", " + b + ")";
				}