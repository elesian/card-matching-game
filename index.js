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
