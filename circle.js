// Get the canvas element from the HTML
const canvas = document.getElementById("myCanvas");
// Get the 2D context for the canvas
const ctx = canvas.getContext("2d");

// Set the fill color to blue
ctx.fillStyle = "blue";
// Begin a path
ctx.beginPath();
// Draw a circle at (x, y) with radius r
const x = canvas.width / 2;
const y = canvas.height / 2;
const r = 50;
ctx.arc(x, y, r, 0, 2 * Math.PI);
// Fill the circle with the current fill color
ctx.fill();
