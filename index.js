var redPiece = $(".red-piece");
var yellowPiece = $(".yellow-piece");
var greenPiece = $(".green-piece");
var bluePiece = $(".blue-piece");

var redNote = new Audio("./Audio/C5_ff.flac");
var yellowNote = new Audio("./Audio/G5_pp.flac");
var greenNote = new Audio("./Audio/G4_pp.flac");
var blueNote = new Audio("./Audio/C4_pp.flac");

var btnFlashTiming = 250;

const SEQUENCE_OPTIONS = ["🔴", "🟡", "🟢", "🔵"]

let sequence = [];

let playerInput = [];

let score = 0;

//Initiate volume settings
getLocalVolumeSettings();

function getLocalVolumeSettings() {
    //If no settings exist then add default value
    if (localStorage.getItem("volume") === null) {
        localStorage.setItem("volume", $("#volume-range").val() / 100);
    } else {
        $("#volume-range").val(localStorage.getItem("volume"));
    }

    changeVolume(localStorage.getItem("volume") / 100);
}

//Change volume based off volume slider.
$("#volume-range").on("input", function () {
    var volume = this.value;
    changeVolume(volume / 100);
    localStorage.setItem("volume", volume);
});


function changeVolume(amount) {
    redNote.volume = amount;
    yellowNote.volume = amount;
    greenNote.volume = amount;
    blueNote.volume = amount;
}

$(".modal-close-btn").on("click", function () {
    reset();
});

$("#play-again").on("click", function () {
    reset();
});

//Change the UI and play corresponding note when the RED piece is activated.
function redPieceUiChange() {
    redPiece.addClass("active-red-piece");
    setTimeout(function () {
        redPiece.removeClass("active-red-piece");
    }, btnFlashTiming)

    redNote.load();
    redNote.play();
}

//Change the UI and play corresponding note when the YELLOW piece is activated.
function yellowPieceUiChange() {
    yellowPiece.addClass("active-yellow-piece");
    setTimeout(function () {
        yellowPiece.removeClass("active-yellow-piece");
    }, btnFlashTiming)

    yellowNote.load();
    yellowNote.play();
}

//Change the UI and play corresponding note when the GREEN piece is activated.
function greenPieceUiChange() {
    greenPiece.addClass("active-green-piece");
    setTimeout(function () {
        greenPiece.removeClass("active-green-piece");
    }, btnFlashTiming)

    greenNote.load();
    greenNote.play();
}

//Change the UI and play corresponding note when the BLUE piece is activated.
function bluePieceUiChange() {
    bluePiece.addClass("active-blue-piece");
    setTimeout(function () {
        bluePiece.removeClass("active-blue-piece");
    }, btnFlashTiming)

    blueNote.load();
    blueNote.play();
}

//Turn on the click event listeners for all the piece clicks.
function turnOnClickListener() {
    redPiece.on("click", function () {
        redPieceUiChange();
        selectPiece("🔴");
    })

    yellowPiece.on("click", function () {
        yellowPieceUiChange();
        selectPiece("🟡");
    })

    greenPiece.on("click", function () {
        greenPieceUiChange();
        selectPiece("🟢");
    })

    bluePiece.on("click", function () {
        bluePieceUiChange();
        selectPiece("🔵");
    })
}

//Gives number between 0 and 3
function randBetweenFour() {
    return Math.floor(Math.random() * 4);
}

//This is where the computer shows the player the sequence of pieces.
function playSequence() {
    //Shows the computer icon letting the player know to wait.
    showMiddlePiece($("#loading"));

    //Turns off click event so the player cannot interrupt.
    $(".piece").off("click");
    setTimeout(() => {
        turnOnClickListener();
        showMiddlePiece($("#score"));
    }, sequence.length * 500 + 750);

    //Goes through each piece in the sequence and shows the player.
    for (let i = 0; i < sequence.length; i++) {
        setTimeout(function () {
            switch (sequence[i]) {
                case "🔴":
                    redPieceUiChange();
                    break;
                case "🟡":
                    yellowPieceUiChange();
                    break;
                case "🟢":
                    greenPieceUiChange();
                    break;
                case "🔵":
                    bluePieceUiChange();
                    break;
                default:
                    break;
            }
        }, i * 500 + 750); //Each note will go 500ms after each other. Starts after 750ms to give player time to focus.
    }
}

//Game logic when player selects a piece
function selectPiece(piece) {
    playerInput.push(piece);
    console.log("Player chose: " + playerInput[playerInput.length - 1]);
    if (isPlayerInputCorrect()) {
        console.log("correct piece");
        if (isPlayerTurnOver()) {
            //Next turn
            score++;
            $("#score-number").text(score);
            console.log("Next turn.");
            playGame();
        }
    } else {
        console.log("wrong piece");
        gameOver();
    }
}

// Check to see if the last piece selected is the same color in the sequence position.
function isPlayerInputCorrect() {
    return playerInput[playerInput.length - 1] === sequence[playerInput.length - 1];
}

// Check to see if the users turn is over by comparing the number of chosen pieces to pieces in the sequence.
function isPlayerTurnOver() {
    return sequence.length === playerInput.length;
}

//Copies a share message to the clipboard and displays message to user that message was copied.
function share() {
    navigator.clipboard.writeText(`Can you beat my score of ${score} on simon!? https://jt-stevens.github.io/Simon/`);

    var copiedMessage = $("#copied-message");

    copiedMessage.addClass("show");

    setTimeout(function () { copiedMessage.removeClass("show"); }, 3000);
}

$("#share").on("click", share);

//Toggles between middle displays: Play button, Computer icon, and Score.
function showMiddlePiece(piece) {
    $("#play").attr("hidden", !(piece.is($("#play"))));

    $("#loading").attr("hidden", !(piece.is($("#loading"))));

    $("#score").attr("hidden", !(piece.is($("#score"))));
}

$("#play-button").on("click", playGame);

//Adds a piece to list of pieces.
function addOneToSequence() {
    sequence.push(SEQUENCE_OPTIONS[randBetweenFour()]);
}

//Display game over screen
function gameOver() {
    console.log("Game over!");
    saveScore();
    $("#game-over-score").text(score);
    document.querySelector("#game-over").showModal();
}

//Adds user score to local storage and receives past scores to display high scores on game over screen.
function saveScore() {
    let highScores = [];
    if (localStorage.getItem("highScores") === null) { //No existing scores.
        localStorage.setItem("highScores", JSON.stringify([score]));
        highScores.push(score);
    } else {

        //Gets existing scores
        highScores = JSON.parse(localStorage.getItem("highScores"));

        //Add players latest score.
        highScores.push(score);

        //Sorts the scores from highest to lowest.
        highScores.sort(function (a, b) { return b - a });

        //Remove stored scores
        localStorage.removeItem("highScores");
        //To replace them with updated scores
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }
    displayHighScores(highScores);
}

//Fills in the high score table with players stored high scores.
function displayHighScores(highScores) {
    let numbers = $(".hs-number");

    for (let i = 0; i < numbers.length; i++) {
        numbers[i].textContent = highScores[i];
    }
}

//Reset the game to play again.
function reset() {
    score = 0;
    sequence = [];
    playerInput = [];

    $("#score-number").text("0");
    $("#game-over-score").text("0");

    showMiddlePiece($("#play"));

    document.querySelector("#game-over").close();
}


//Starts game
function playGame() {
    turnOnClickListener();
    addOneToSequence();
    playSequence();
    playerInput = [];
}