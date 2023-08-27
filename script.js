const canvas = document.getElementById("whiteboard");
const context = canvas.getContext("2d");
const undoButton = document.getElementById("undo");
const clearButton = document.getElementById("clear");

let drawing = false;
let lastX = 0;
let lastY = 0;
let undoStack = [];

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

context.lineJoin = "round";
context.lineCap = "round";
context.lineWidth = 5;
context.strokeStyle = "black";

function startDrawing(e) {
    drawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!drawing) return;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function endDrawing() {
    if (drawing) {
        undoStack.push(context.getImageData(0, 0, canvas.width, canvas.height));
    }
    drawing = false;
}

function undo() {
    if (undoStack.length > 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        undoStack.pop();
        if (undoStack.length > 0) {
            context.putImageData(undoStack[undoStack.length - 1], 0, 0);
        }
    }
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    undoStack = [];
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", endDrawing);
canvas.addEventListener("mouseout", endDrawing);
undoButton.addEventListener("click", undo);
clearButton.addEventListener("click", clearCanvas);
