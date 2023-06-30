"use strict";

let game = {
  tickNumber: 0,
  timer: null,
  board: [
    "###############",
    "#             #",
    "#             #",
    "#             #",
    "#    ####     #",
    "#    ####     #",
    "#             #",
    "#             #",
    "#             #",
    "###############",
  ],
  tick: function () {
    game.tickNumber++;
    snake.move();
    graphics.drawGame();
    game.timer = window.setTimeout("game.tick()", 500);
  },
};

let snake = {
  parts: [
    { x: 4, y: 2 },
    { x: 3, y: 2 },
    { x: 2, y: 2 },
  ],
  facing: "E",

  move: function () {
    let location = { x: 5, y: 2 };
    snake.parts.unshift(location);
    snake.parts.pop();
  },
};

let graphics = {
  canvas: document.getElementById("canvas"),
  squareSize: 30,
  drawBoard: function (ctx) {
    let currentYoffset = 0;

    game.board.forEach(function checkLine(line) {
      line = line.split("");
      let currentXoffset = 0;
      line.forEach(function checkCharacter(character) {
        if (character == "#") {
          ctx.fillStyle = "white";
          ctx.fillRect(
            currentXoffset,
            currentYoffset,
            graphics.squareSize,
            graphics.squareSize
          );
        }
        currentXoffset += graphics.squareSize;
      });
      currentYoffset += graphics.squareSize;
    });
  },
  drawSnake: function (ctx) {
    snake.parts.forEach(function drawPart(part) {
      let partXlocation = part.x * graphics.squareSize;
      let partYlocation = part.y * graphics.squareSize;
      ctx.fillStyle = "#00ff66";
      ctx.fillRect(
        partXlocation,
        partYlocation,
        graphics.squareSize,
        graphics.squareSize
      );
    });
  },
  drawGame: function () {
    let ctx = graphics.canvas.getContext("2d");
    graphics.drawBoard(ctx);
    graphics.drawSnake(ctx);
  },
};

let gameControl = {
  startGame: function () {
    game.tick();
  },
};
gameControl.startGame();
