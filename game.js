"use strict";

let userName = document.getElementById("username").value;

const container = document.getElementById("container");

const scoreTable = document.getElementById("scores-table");

const start = document.getElementById("start");
start.onclick = () => {
  // Here you will add path to local file you have
  const audio = new Audio("snaketune.mp3");

  audio.play();
};

// const mostRecentScore = localStorage.getItem("game.score");
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
const updateHighScores = function () {
  localStorage.setItem("highscores", JSON.stringify(highscores));
};

// currently brings up score on page
document.getElementById("saveScoreBtn").addEventListener("click", display);
const saveHighScore = (event) => {
  event.preventDefault();
};

function display() {
  userName = document.getElementById("username").value;
  document.getElementById("displayName").innerHTML = userName;
  document.getElementById("displayScore").innerHTML = game.score;
  const player = new Player(userName, game.score);
  highscores.push(player);
  updateHighScores();
}

const Player = function (name, score) {
  (this.score = score), (this.name = name);
};

let game = {
  tickNumber: 0,
  timer: null,
  score: 0,
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

  fruit: [{ x: 1, y: 1 }],

  tick: function () {
    window.clearTimeout(game.timer);
    game.tickNumber++;
    if (game.tickNumber % 10 == 0) {
      game.addRandomFruit();
    }
    let result = snake.move();
    if (result == "gameover") {
      alert("Game Over!");
      return;
    }

    graphics.drawGame();
    game.timer = window.setTimeout("game.tick()", 500);
  },
  addRandomFruit: function () {
    let randomY = Math.floor(Math.random() * game.board.length) + 0;
    let randomX = Math.floor(Math.random() * game.board[randomY].length) + 0;
    let randomLocation = { x: randomX, y: randomY };
    if (game.isEmpty(randomLocation) && !game.isFruit(randomLocation)) {
      game.fruit.push(randomLocation);
    }
  },

  isEmpty: function (location) {
    let contents = game.board[location.y][location.x];
    return contents == " ";
  },
  isWall: function (location) {
    return game.board[location.y][location.x] == "#";
  },
  isFruit: function (location) {
    for (let fruitNumber = 0; fruitNumber < game.fruit.length; fruitNumber++) {
      let fruit = game.fruit[fruitNumber];
      if (location.x == fruit.x && location.y == fruit.y) {
        game.fruit.splice(fruitNumber, 1);
        return true;
      }
    }
  },
  isSnake: function (location) {
    for (let snakePart = 0; snakePart < snake.parts.length; snakePart++) {
      let part = snake.parts[snakePart];
      if (location.x == part.x && location.y == part.y) {
        return true;
      }
    }
    return false;
  },
};

let snake = {
  parts: [
    { x: 4, y: 2 },
    { x: 3, y: 2 },
    { x: 2, y: 2 },
  ],
  facing: "E",
  nextLocation: function () {
    let snakeHead = snake.parts[0];
    let targetX = snakeHead.x;
    let targetY = snakeHead.y;
    targetY = snake.facing == "N" ? targetY - 1 : targetY;
    targetY = snake.facing == "S" ? targetY + 1 : targetY;
    targetX = snake.facing == "W" ? targetX - 1 : targetX;
    targetX = snake.facing == "E" ? targetX + 1 : targetX;
    return { x: targetX, y: targetY };
  },
  move: function () {
    let location = snake.nextLocation();

    if (game.isWall(location) || game.isSnake(location)) {
      return "gameover";
    }

    if (game.isEmpty(location)) {
      snake.parts.unshift(location);
      snake.parts.pop();
    }

    if (game.isFruit(location)) {
      snake.parts.unshift(location);
      game.score++;
    }
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

  draw: function (ctx, source, color) {
    source.forEach(function (part) {
      let partXlocation = part.x * graphics.squareSize;
      let partYlocation = part.y * graphics.squareSize;
      ctx.fillStyle = color;
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
    ctx.clearRect(0, 0, graphics.canvas.clientWidth, graphics.canvas.height);
    graphics.drawBoard(ctx);
    graphics.draw(ctx, game.fruit, "#ffb000");
    graphics.draw(ctx, snake.parts, "#00ff66");
  },
};

let gameControl = {
  processInput: function (keyPressed) {
    let key = keyPressed.key.toLowerCase();
    let targetDirection = snake.facing;
    if (key == "w" && snake.facing != "S") targetDirection = "N";
    if (key == "a" && snake.facing != "E") targetDirection = "W";
    if (key == "s" && snake.facing != "N") targetDirection = "S";
    if (key == "d" && snake.facing != "W") targetDirection = "E";
    snake.facing = targetDirection;
    game.tick();
  },
  startGame: function () {
    window.addEventListener("keypress", gameControl.processInput, false);
    game.tick();
  },
};

// gameControl.startGame();
start.addEventListener("click", gameControl.startGame);
