//game values

let min = 1,
  max = 10,
  winningNum = getRandonNum(min, max),
  guessesLeft = 3;

//ui elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessInput = document.querySelector("#guess-input"),
  guessBtn = document.querySelector("#guess-btn"),
  message = document.querySelector(".message");

//assign ui min and max
minNum.textContent = min;
maxNum.textContent = max;

//listen for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  //listen for play again
  game.addEventListener("mousedown", function (e) {
    if (e.target.className === "play-again") {
      window.location.reload();
    }
  });

  //validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  //check if won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN`);
  } else {
    //deduct guesses
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      gameOver(
        false,
        `Game over, you lost. The correct number is ${winningNum}`
      );
    } else {
      guessInput.value = "";

      guessInput.style.borderColor = "red";
      setMessage(`Wrong answer, you have ${guessesLeft} guesses left`, "red");
    }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  guessInput.disabled = true;
  message.style.color = color;
  guessInput.style.borderColor = color;
  setMessage(msg);

  //play again
  guessBtn.value = "Play Again?";
  guessBtn.className += "play-again";
}

//generate random number
function getRandonNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
