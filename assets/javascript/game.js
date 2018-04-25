const wordBank = [ "westeros", "ghost", "jon", "oldtown", "sansa", "longclaw", "valyria"];
const clearKey = [];

let wins = 0;
let loses = 0;

let answer = null;
let gameOn = false;
let guessKey = [];
let stringAns = "";
let wrongGuess = 0;
let currentWord = [];
let guessedLetters = [];
let wrongLetters = [];
let guessesRemaining = 7;


// Key press handling
document.onkeyup = function(event) {
    let keyPress = event.key;
    if(gameOn == true){
        playerGuess(keyPress);
    }

    if(gameOn == false && keyPress == "Enter"){
        gameLoop();
    }
}

//Clear the game board and all relative variables
const clearWord = function(){
    guessKey = [];
    currentWord = [];
    guessedLetters = [];
    wrongLetters = [];
    stringAns = "";
    wrongGuess = 0;
    guessesRemaining = 7;

    document.getElementById("game-status-message").innerHTML = '';
    document.getElementById("guess-display").innerHTML = guessKey;
    document.getElementById("message").innerHTML = 'Wrong Letters';
    document.getElementById("wrong-letters").innerHTML = wrongLetters;
    
}

//generate a new word from the word bank
const getWord = function(){
    let ranNum = Math.floor(Math.random() * wordBank.length);
    let word = wordBank[ranNum];
    guessKey = [];
    currentWord = word;

    for(i=0; i < word.length; i++){
        let newChar = "_ ";
        guessKey.push(newChar);
    }
    stringAns = guessKey.join('');
    document.getElementById("guess-display").innerHTML = stringAns;
}

//game loop execution

const gameLoop = function(){
    clearWord();
    getWord();
    gameOn = true;
}

//player guess handling

const playerGuess = function(pressedKey){
    let guess = event.key;
    //make sure the player input is a letter, and if it is add it to the guessed letters bank
    if (guess.match(/[^a-zA-Z]/i) || guess == "Enter" || guess == "Backspace" || guess == "CapsLock" || guess == "Shift" || guess == "Alt" || guess == "Conrtrol"){
        alert("Not a valid input. Choose a letter!");
    }
    else{
        if (guess.match(/[a-zA-Z]/i)){
            guessedLetters.push(guess);
        }

    //determines if the guessed letter is already in the bank
    let matches = 0;

        for(i=0; i < guessKey.length; i++){
        
            if(currentWord.charAt(i) == guess){
                guessKey[i] = guess + " ";
                matches++;
            }
        }
    //if the player's guess is not in the wrong letters bank, add it 
    if(matches === 0){
        let matched = false;
        for(j=0; j < wrongLetters.length; j++){
            if(wrongLetters[j] == guess){
                matched = true;
            }
        }
        if(matched == false){
            wrongLetters.push(guess);
            guessesRemaining--;
            console.log(guessesRemaining);
        }
        document.getElementById("wrong-letters").innerHTML = wrongLetters;
    }
    }

    //displays the new string and checks to see if the player has won or lost
    stringAns = guessKey.join('')
    document.getElementById("guess-display").innerHTML = stringAns;
    document.getElementById("guess-count").textContent = guessesRemaining;
    scoreKeep();
}

//function to determine if the player has won or lost
const scoreKeep = function(){
    let keyCheck = currentWord.replace(/\s/g, '');
    let guessCheck = guessKey.join('').replace(/\s/g, '');
    if(keyCheck === guessCheck){
        document.getElementById("game-status-message").innerHTML = 'You win! Press enter to play again.';
        gameOn = false;
        wins++;
        document.getElementById("win-count").innerHTML = wins;
    }
    else if(wrongLetters.length >= 7){
        document.getElementById("game-status-message").innerHTML = 'You lose! Press enter to play again.';
        gameOn = false;
        loses++;
        document.getElementById("lose-count").innerHTML = loses;
    }
    else{
        return;
    }
}