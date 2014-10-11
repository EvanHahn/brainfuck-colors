var brainfuck = require('brainfuck2000');
var ticker = require('ticker');
var Spectra = require('spectra');
require('string.prototype.repeat');

var GRID_SIZE = new Uint8Array([10, 10]);

var codeSrc = (function() {
  var gridCells = GRID_SIZE[0] * GRID_SIZE[1];
  return [
    '>'.repeat(gridCells),
    '+',
    '[',
      '<'.repeat(gridCells),
      '+>'.repeat(gridCells),
    ']'
  ].join('\n');
})();

var program = brainfuck({
  src: codeSrc,
  minValue: 0,
  maxValue: 359,
  wrap: true
});

var canvas = document.getElementById('display');
var context = canvas.getContext('2d');

function drawCell(x, y, colorValue) {
  context.fillStyle = Spectra({ h: (colorValue % 360), s: 1, v: 1 }).hex();
  var boxWidth = canvas.width / GRID_SIZE[0];
  var boxHeight = canvas.height / GRID_SIZE[1];
  context.fillRect(boxWidth * x, boxHeight * y, boxWidth, boxHeight);
}

ticker(function(dt, t) {
  program.step();
  for (var y = 0; y < GRID_SIZE[1]; y ++) {
    for (var x = 0; x < GRID_SIZE[0]; x ++) {
      var i = (y * GRID_SIZE[1]) + x;
      var color = (program.tape[i] * 10);
      drawCell(x, y, color);
    }
  }
});

window.program = program;
