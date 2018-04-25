const wordBank = [ "test", "another", "something"];
const clearKey = [];
let answer = null;
let gameOn = false;
let guessKey = [];
let stringAns = "";
let wrongGuess = 0;
let currentWord = [];
let guessedLetters = [];
let wrongLetters = [];


document.onkeyup = function(event) {
    let keyPress = event.key;
    if(gameOn == true){
        playerGuess(keyPress);
        scoreKeep();
    }

    if(gameOn == false && keyPress == "Enter"){
        gameLoop();
    }
}

const clearWord = function(){
    console.log("Cleared ln-15");
    guessKey = [];
    document.getElementById("guess-display").innerHTML = guessKey;
}

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

const gameLoop = function(){
    clearWord();
    getWord();
    gameOn = true;
}

const playerGuess = function(pressedKey){
    let guess = event.key;
    console.log(guess);
    if (guess.match(/[^a-zA-Z]/i)){
        alert("Not a valid input.");
    }
    else{
        if (guess.match(/[a-zA-Z]/i)){
            guessedLetters.push(guess);
        }
        console.log(guessedLetters);


    let matches = 0;

        for(i=0; i < guessKey.length; i++){
        
            if(currentWord.charAt(i) == guess){
                guessKey[i] = guess + " ";
                console.log(guessKey);
                console.log("matched!");
                matches++;
            }
        }

    if(matches === 0){
        let matched = false;
        for(j=0; j < wrongLetters.length; j++){
            if(wrongLetters[j] == guess){
                matched = true;
            }
        }
        if(matched == false){
            wrongLetters.push(guess);
        }
        document.getElementById("wrong-letters").innerHTML = wrongLetters;
    }
    }
    stringAns = guessKey.join('')
    console.log(stringAns);
    document.getElementById("guess-display").innerHTML = stringAns;
}


const scoreKeep = function(){
    console.log(wrongLetters)
    if(wrongLetters.length > 7){
        alert("You lose!");
        gameOn = false;
    }
}