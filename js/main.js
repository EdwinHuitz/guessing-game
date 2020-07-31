/*------Constants------*/
//all const(with exception of cached elements) variables go here

/*------Variables------*/
//all let(changable) variables go here
let secretNum,guessList,isWinner,currentGuess;

/*------Cached Element References------*/
//shortcut to avoid typing document.getElementById() every time you want to call the same elements
const messageEL= document.getElementById('message');
const guessesEL= document.getElementById('prevGuesses');
const guessBtn= document.getElementById('guessButton');
const resetBtn= document.getElementById('resetButton');
const guessInput= document.getElementById('guessInput');
/*------Event Listeners------*/
resetBtn.addEventListener('click',function(){ init();});
guessBtn.addEventListener('click',function(){
    if (guessList.length===0){
        guessesEL.innerText='previous guesses:';
    }
    if (isWinner===false){
        checkGuess(parseInt(guessInput.value));
    }
});
/*------Functions------*/
//resets all variaibles for a new game
init();
function init()
{
    guessesEL.innerText='';
    messageEL.innerText='Please enter a number between 1 and 100';
    guessInput.value = '';
    guessList = [];
    isWinner = false;
    secretNum = Math.floor(Math.random()*100)+1;
    console.log(secretNum);
    messageEL.className = 'message';
}

function checkGuess(guess)
{
    if(guess>100 ||guess<1||isNaN(guess))
    {
        let errt;
        if(guess<1)
        {
            errt = 'Error: please enter a number greater than or equal to 1';
        }
        else if(guess>100)
        {
            errt = 'Error: please enter a number lower than or equal to 100';
        }
        else
        {
            errt = 'Error: Please enter a valid number';
        }
        guessList.push(guess);
        messageEL.className = 'error';
        messageEL.innerText=errt;
    }
    else if(guess==secretNum)
    {//win
        let guesses = function(){if (guessList.length === 0){return `guess!`}else{return `guesses!`}};
        let aa;
        aa=guesses();
        //console.log('win');
        guessList.push(guess);
        messageEL.innerText=`You won in ${guessList.length} `+aa;
        guessesEL.innerText=guessList;
        messageEL.style.color='green';
        messageEL.className = 'animate__animated animate__bounce';
    }
    else if(guess<secretNum)
    {//toolow
        //console.log('too low');
        guessList.push(guess);
        messageEL.className = 'low';
        messageEL.innerText='Your number is too low!';
        guessesEL.innerText=guessList;
        messageEL.style.color='red';
        messageEL.className = 'animate__animated animate__headShake';
    }
    else if(guess>secretNum)
    {//toohigh
        //console.log('too high');
        guessList.push(guess);
        messageEL.className = 'high';
        messageEL.innerText='Your number is too high!';
        guessesEL.innerText=guessList;
        messageEL.style.color='red';
        messageEL.className = 'animate__animated animate__headShake';
    }
    else
    {
        console.log(`error:${guess}, ${secretNum}`);
        guessList.push(guess);
        messageEL.className = 'error';
        messageEL.innerText=`Unique Error! User input: ${guess}, Secret number: ${secretNum}, List of guesses: ${guessList}`;
        guessesEL.innerText=guessList;
    }
}