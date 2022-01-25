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
 * -Start in middle of screen.
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

let timePassed = 0;
let reset = false;

function test(event) {
  var banner = document.getElementById(`${event}`).children[0];
  console.log(banner.src);
  if (banner.src === 'http://127.0.0.1:5500/images/blank.jpeg') {
    console.log('true');
    banner.src = './images/arbok.jpeg';
  } else banner.src = 'http://127.0.0.1:5500/images/blank.jpeg';
}

function initialiseGame() {
  if (document.getElementById('reset-button').innerText === 'START GAME') {
    setTimer((reset = false));
  } else {
    setTimer((reset = true));
  }
}

function formatTime(time) {
  // The largest round integer less than or equal to the result of time divided being by 60.
  const minutes = Math.floor(time / 60);

  // Seconds are the remainder of the time divided by 60 (modulus operator)
  let seconds = time % 60;

  // If the value of seconds is less than 10, then display seconds with a leading zero
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // The output in MM:SS format
  return `${minutes}:${seconds}`;
}

function setTimer(reset) {
  for (var i = 1; i < 99999; i++) window.clearInterval(i);
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
