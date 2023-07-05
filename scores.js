"use strict";

const scoreTable = document.getElementById("score-table");
let highscores;

function checkLocalStorage() {
  const localScore = JSON.parse(localStorage.getItem("highscores"));
  if (localScore) {
    highscores = localScore;
    highscores.sort(function (a, b) {
      return parseFloat(b.score) - parseFloat(a.score);
    });
    console.log(highscores);
  } else {
    highscores = [];
  }

  for (let i = 0; i < highscores.length; i++) {
    const tRow = document.createElement("tr");
    scoreTable.appendChild(tRow);
    // append row to tbl
    const tdataRank = document.createElement("td");
    tdataRank.textContent = i + 1;
    tRow.appendChild(tdataRank);
    // set textcontent rank
    const tdataName = document.createElement("td");
    tdataName.textContent = highscores[i].name;
    tRow.appendChild(tdataName);
    const tdataScore = document.createElement("td");
    tdataScore.textContent = highscores[i].score;
    tRow.appendChild(tdataScore);

    scoreTable.appendChild(tRow);
  }
}
checkLocalStorage();

function createTable() {
  //   const article = document.createElement("article");
  //   container.appendChild(article);
  //   const h3 = document.createElement("h3");
  //   h3.textContent = userName;
  //   article.appendChild(h3);
  //   const ul = document.createElement("ul");
  //   article.appendChild(ul);
  //   for (let i = 0; i < highscores.length; i++) {
  //     const li = document.createElement("li");
  //     li.textContent = game.score;
  //     ul.appendChild(li);
  //
  const tRow = document.createElement("tr");
  scoreTable.appendChild(tRow);
  // append row to tbl
  const tdataRank = document.createElement("td");
  document.textContent = "rank";
  tdataRank.appendChild(tdataRank);
  // set textcontent rank
  const tdataName = document.createElement("td");
  document.textContent = "name";
  tdataName.appendChild(tdataName);
  const tdataScore = document.createElement("td");
  document.textContent = "score";
  tdataScore.appendChild(tdataScore);

  scoreTable.appendChild(tRow);
}
// highscores.createTable();
