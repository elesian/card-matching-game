/* ### A [Memory Matching Game](https://www.memozor.com/memory-games/for-kids/pokemon-game)
 *
 * - The game starts out with a series of paired images that are hidden from the user.
 * - The first 2 images the user clicks on are revealed.
 * - If the revelaed images match they remain uncovered.
 * - If the images do not match, they are hidden once again.
 * - The user continues until they have matched all the images.
 *
 * _Additional_
 *
 * - Keep track of how many guesses it took the user to complete the game.
 * - Randomise the starting position of the images to stop people cheating.
 /*

 /*
 * LAYOUT
 * -Implement layout. Grid and moves and time. Header + footnote.
 *
 * GAME
 * -On FIRST click - start timer.
 * -On click - Show first card. Increment move count. Remove hidden.
 * -On second click - Show second card. Remove hidden.
 * - IF MATCH - Remove ability to click and match cards again. Remaining pairs.
 * - ELSE - change status to hidden again.
 *
 * END GAME
 * - If all matched - end game. Total pairs = 0.
 * - Message. Total moves. Total time.
 * - Play again? if yes -> reset game.
 *
 * @format
 */

let endGame = false;
let totalMoves = 0;
let totalMatches = 0;
let timePassed = 0;
let reset = false;
let currentTwoCards = [];
let completedPairs = [];
let RandomiseCards = new Array(16);
let PokemonCards = [
  'arbok.jpeg',
  'dragonair.jpeg',
  'jigglypuff.jpeg',
  'lickitung.jpeg',
  'memowth.jpeg',
  'oddish.jpeg',
  'rattata.jpeg',
  'sandshrew.jpeg',
  'arbok.jpeg',
  'dragonair.jpeg',
  'jigglypuff.jpeg',
  'lickitung.jpeg',
  'memowth.jpeg',
  'oddish.jpeg',
  'rattata.jpeg',
  'sandshrew.jpeg',
];

let gridImages = {};

function clickPokemon(event) {
  const card = document.getElementById(`${event}`);
  const cardId = card.id;
  const child = card.children[0];
  let currentIndex = PokemonCards[gridImages[`${cardId}`]];
  console.log(timePassed);

  if (Object.keys(gridImages).length !== 0) {
    if (child.src.includes('blank.jpeg') === true) {
      child.src = `./images/${currentIndex}`;
    }

    //test
    //do pairs match?
    let isMatch = matchingPair(card);
    if (isMatch && completedPairs.length === 16) {
      const finishedTime = formatTime(timePassed);

      setTimeout(() => {
        alert(
          `You have WON in ${totalMoves} moves and a time of ${finishedTime}`
        );
        document.getElementById('reset-button').innerText === 'START GAME';
        for (var i = 1; i < 9999; i++) window.clearInterval(i);
      }, 200);
    }
  }
}

function initialiseGame() {
  if (document.getElementById('reset-button').innerText === 'START GAME') {
    //randomise Cards
    RandomiseCards = RandomCards(0, 15);
    //reset all to blank
    resetCards();
    //assign each grid square to a pokemon
    assignGridImages();

    if (document.getElementById('reset-button').innerText === 'START GAME') {
      setTimer((reset = false));
    } else {
      setTimer((reset = true));
    }
  } else {
    resetGame();
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

function setTimer(reset) {
  for (var i = 1; i < 9999; i++) window.clearInterval(i);
  timePassed = 0;

  if (reset === false) {
    document.getElementById('reset-button').innerHTML = 'END GAME';
    let interval = setInterval(() => {
      // The amount of time passed increments by one
      timePassed = timePassed + 1;
      // The time left label is updated
      document.getElementById('base-timer-label').innerHTML =
        formatTime(timePassed);
    }, 1000);
  } else {
    reset = false;
    document.getElementById('reset-button').innerText = 'START GAME';
    document.getElementById('base-timer-label').innerHTML =
      formatTime(timePassed);
  }
}

const RandomCards = (min, max) => {
  const randomNumbers = new Set();
  const range = max - min + 1;

  while (randomNumbers.size < range) {
    randomNumbers.add(~~(Math.random() * range));
  }

  return [...randomNumbers];
};

function resetCards() {
  const children = document.getElementsByTagName('img');

  for (let i = 0; i < children.length; i++) {
    console.log(children[i]);
    children[i].src = './images/blank.jpeg';
    children[i].width = 145;
    children[i].height = 145;
  }
}

function assignGridImages() {
  const images = document.getElementsByTagName('img');
  for (let i = 0; i < images.length; i++) {
    gridImages[`grid-item-${i + 1}`] = RandomiseCards[i];
  }
}

function matchingPair(card) {
  if (completedPairs.includes(card.id)) {
    return false;
  }

  if (currentTwoCards.length === 0) {
    currentTwoCards.push(card);
    console.log(currentTwoCards);
  }

  if (currentTwoCards.length === 1 && currentTwoCards[0].id !== card.id) {
    currentTwoCards.push(card);
    console.log(currentTwoCards);
  }

  if (currentTwoCards.length === 2) {
    totalMoves++;
    totalMatches++;
    document.getElementById('total-moves').innerText = totalMoves;
    console.log(currentTwoCards[0].id);
    if (
      currentTwoCards[0].children[0].src === currentTwoCards[1].children[0].src
    ) {
      completedPairs.push(currentTwoCards[0].id, currentTwoCards[1].id);
      console.log(completedPairs);
      currentTwoCards = [];
    } else {
      setTimeout(() => {
        currentTwoCards[0].children[0].src = './images/blank.jpeg';
        currentTwoCards[1].children[0].src = './images/blank.jpeg';
        currentTwoCards = [];
      }, 200);
    }
  }
  return true;
}

function resetGame() {
  totalMoves = 0;
  currentTwoCards = [];
  completedPairs = [];
  gridImages = {};
  document.getElementById('total-moves').innerText = totalMoves;
  setTimer((reset = true));
  resetCards();
}
