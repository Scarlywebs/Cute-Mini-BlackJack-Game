
let gamesWon = 0
let playerChips = 100
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardEl = document.getElementById("card-el")
let playerEl = document.getElementById("player-el")
let lostGame = document.getElementById('start-button')
let hideDraw = document.getElementById('card-draw')
let gamesTotal = document.getElementById('games-won')


function getRandomCard(){
  let randomNumber = Math.floor( Math.random() * 13 ) + 1
  if ( randomNumber === 1){
    return 1
  } else if ( randomNumber > 10){
    return 10
  } else{
    return randomNumber
  } 
}

function startGame() {
  if (!isAlive && playerChips > 0) {
      let firstCard = getRandomCard();
      let secondCard = getRandomCard();
      cards = [firstCard, secondCard];
      sum = firstCard + secondCard;
      isAlive = true;
      lostGame.textContent = 'New Game';
      hideDraw.style.display = 'block';
      renderGame();
  }
}

function getplayerChips() {
  if (hasBlackJack === true) {
      playerChips += 15;
  } else if (hasBlackJack === false) {
      if (playerChips - 5 < 0) {
          playerChips = 0;
      } else {
          playerChips -= 5;
      }
  }
}

function renderGame(){
  if ( sum <= 18){
    message = "Close, let's draw a new card!"
  } else if ( sum === 21){
    message = "You got Blackjack!"
    hasBlackJack = true
    isAlive = true
    gamesWon += 1
    getplayerChips();
  } else {
    message = "Oh no, you lost this game!"
    hasBlackJack = false
    isAlive = false    
    getplayerChips();
  } 
  if (playerChips === 0){
    message = "You out of chips!"
  }

  messageEl.textContent = message

  cardEl.textContent = ""
  for (let i = 0; i < cards.length; i++) {    
    let cardDiv = document.createElement('div');
    cardDiv.textContent = cards[i] + "-";
    cardDiv.classList.add('card-style');
    cardEl.appendChild(cardDiv);
  }  

  let sumSpan = document.createElement('span');
  sumSpan.textContent = sum;
  sumSpan.classList.add('sum-style');
  sumEl.textContent = "Total Sum";
  sumEl.appendChild(sumSpan);

  let chipSpan = document.createElement("span")
  chipSpan.textContent = "$" + playerChips;
  chipSpan.classList.add('chip-style');
  playerEl.textContent = "Your Chips";
  playerEl.appendChild(chipSpan); 

  let winSpan = document.createElement("span")
  winSpan.textContent = gamesWon;
  winSpan.classList.add('won-style');
  gamesTotal.textContent = "Games Won";
  gamesTotal.appendChild(winSpan); 
}

function newCard(){
  if (isAlive && playerChips > 0){
    let thirdCard = getRandomCard()
    sum += thirdCard
    cards.push(thirdCard)
    renderGame()
  } 
}

