// Nom    :
// Prénom :
// Groupe :

//Stockez dans un conteneur approprié les 2 éléments .result_item result_item--love et .result_item result_item--js afin de pouvoir facilement modifier leur contenu. Ces 2 éléments contiennent respectivement le score du joueur JS et love.
// this.resultsElements = [document.querySelector('.' + CLASS_NAME_FOR_PLAYER_RESULT[0]), document.querySelector('.' + CLASS_NAME_FOR_PLAYER_RESULT[1])];
// this.resultsText = [this.resultsElements[0].textContent, this.resultsElements[1].textContent];

//Stockez dans un conteneur approprié 2 instances de la classe Player
// this.a_players = [new Player(), new Player()];

//Définissez une variable globale qui vous permet de connaitre le joueur courant.
// next() {
//   // toggle 0:1
//   this.i_Iidx = 1 - this.i_Iidx;
// }


class Player {
  constructor () {
    this.score = 0;
  }

  incrementScore () {
    this.score++;
  }
}

let maxTime = 100;
const playerArray = [new Player(), new Player()];
const resultItemJs = document.querySelector('.result_item--js');
const resultItemLove = document.querySelector('.result_item--love');
const resultArray = [resultItemJs, resultItemLove];
let idxOfCurrentPlayer = 0;
let currentPlayer;
let isPlaying = false;


document.documentElement.classList.add('js-enabled');
document.querySelector('.no-js__message').remove();
const app = document.querySelector('.grid');
const timer = document.querySelector('.timer');

for (let i = 1; i <= 9; i++){
  app.insertAdjacentHTML('beforeend', `<li class="grid__item"></li>`);
}

timer.innerHTML = `${formatNumber(maxTime)}`;

function formatNumber (number){
  if (number >= 60){
    let coefficient = Math.floor(number/60)
    return `${zeros (coefficient)}:${zeros(number - (coefficient *60))}`
  } else {
    return `00:${zeros(number)}`;
  }
}

function zeros(number) {
  if (number < 10){
    return `${0}${number}`
  } else {
    return number;
  }
}

const gridItems = document.querySelectorAll('.grid__item');
for (const gridItem of gridItems) {
  gridItem.addEventListener('click', (e)=>{
    isPlaying = true;
    if (idxOfCurrentPlayer === 0){
      e.currentTarget.classList.add('grid__item--js');
      app.classList.remove('js');
      app.classList.add('love');
    } else {
      e.currentTarget.classList.add('grid__item--love');
      app.classList.add('js');
      app.classList.remove('love');
    }

    idxOfCurrentPlayer = 1 - idxOfCurrentPlayer;
    currentPlayer = playerArray[idxOfCurrentPlayer];
    currentPlayer.incrementScore();
    resultArray[idxOfCurrentPlayer].textContent = `Joueur ${idxOfCurrentPlayer + 1} : ${currentPlayer.score}`;
  });
}

function update (){
  if (isPlaying){
    maxTime--;
    timer.innerHTML = `${formatNumber(maxTime)}`
  }
}

setInterval(update, 1000);