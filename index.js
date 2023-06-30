var tlPiece = $(".top-left-quarter-circle");
var trPiece = $(".top-right-quarter-circle");
var blPiece = $(".bottom-left-quarter-circle");
var brPiece = $(".bottom-right-quarter-circle");

var tlNote = new Audio("./Audio/C5_ff.flac");
var trNote = new Audio("./Audio/G5_pp.flac");
var blNote = new Audio("./Audio/G4_pp.flac");
var brNote = new Audio("./Audio/C4_pp.flac");

var btnFlashTiming = 250;

const SEQUENCE_OPTIONS = ["🔴", "🟡", "🟢", "🔵"]

let sequence = [];

let playerInput = [];

let score = 0;

$(".modal-close-btn").on("click", function () {
    reset();
});

$("#play-again").on("click", function () {
    reset();
});

function tlUiChange() {
    tlPiece.addClass("active-top-left");
    setTimeout(function () {
        tlPiece.removeClass("active-top-left");
    }, btnFlashTiming)

    tlNote.load();
    tlNote.play();
}//

function trUiChange() {
    trPiece.addClass("active-top-right");
    setTimeout(function () {
        trPiece.removeClass("active-top-right");
    }, btnFlashTiming)

    trNote.load();
    trNote.play();
}

function blUiChange() {
    blPiece.addClass("active-bottom-left");
    setTimeout(function () {
        blPiece.removeClass("active-bottom-left");
    }, btnFlashTiming)

    blNote.load();
    blNote.play();
}

function brUiChange() {
    brPiece.addClass("active-bottom-right");
    setTimeout(function () {
        brPiece.removeClass("active-bottom-right");
    }, btnFlashTiming)

    brNote.load();
    brNote.play();
}

function turnOnClickListener() {
    tlPiece.on("click", function () {
        tlUiChange();
        selectPiece("🔴");
    })

    trPiece.on("click", function () {
        trUiChange();
        selectPiece("🟡");
    })

    blPiece.on("click", function () {
        blUiChange();
        selectPiece("🟢");
    })

    brPiece.on("click", function () {
        brUiChange();
        selectPiece("🔵");
    })
}

function randBetweenFour() {
    return Math.floor(Math.random() * 4);
}

function playSequence() {
    showMiddlePiece($("#loading"));

    $(".piece").off("click");
    setTimeout(() => {
        turnOnClickListener();
        showMiddlePiece($("#score"));
    }, sequence.length * 500 + 750);

    for (let i = 0; i < sequence.length; i++) {
        setTimeout(function () {
            switch (sequence[i]) {
                case "🔴":
                    tlUiChange();
                    break;
                case "🟡":
                    trUiChange();
                    break;
                case "🟢":
                    blUiChange();
                    break;
                case "🔵":
                    brUiChange();
                    break;
                default:
                    break;
            }
        }, i * 500 + 750);
    }
}

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
            gameLoop();
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

function share() {
    navigator.clipboard.writeText(`Can you beat my score of ${score} on simon!? (fill in link here when I got it!)`);
    
    var copiedMessage = $("#copied-message");

    copiedMessage.addClass("show");

    setTimeout(function () { copiedMessage.removeClass("show"); }, 3000);
}

$("#share").on("click", share);

function showMiddlePiece(piece) {
    $("#play").attr("hidden", !(piece.is($("#play"))));

    $("#loading").attr("hidden", !(piece.is($("#loading"))));

    $("#score").attr("hidden", !(piece.is($("#score"))));
}

$("#play-button").on("click", playGame);

function addOneToSequence() {
    sequence.push(SEQUENCE_OPTIONS[randBetweenFour()]);
}

function gameOver() {
    console.log("Game over!");
    saveScore();
    $("#game-over-score").text(score);
    document.querySelector("#game-over").showModal();
}

function saveScore() {

    if (localStorage.getItem("highScores") === null) {
        localStorage.setItem("highScores", JSON.stringify([score]));
    } else {

        highScores = JSON.parse(localStorage.getItem("highScores"));

        highScores.push(score);
        highScores.sort(function (a, b) { return b - a });

        localStorage.removeItem("highScores");
        localStorage.setItem("highScores", JSON.stringify(highScores));

        displayHighScores();

        console.log("High Scores:");
        console.log(highScores);
    }
}

function displayHighScores() {
    let numbers = $(".hs-number");

    for (let i = 0; i < numbers.length; i++) {
        numbers[i].textContent = highScores[i];
    }
}

function playGame() {
    gameLoop();
}

function reset() {
    score = 0;
    sequence = [];
    playerInput = [];

    $("#score.number").text("0");
    $("#game-over-score").text("0");

    document.querySelector("#game-over").close();

    gameLoop();
}

function gameLoop() {
    turnOnClickListener();
    addOneToSequence();
    playSequence();
    playerInput = [];


    // sequence.push("🔴", "🟡", "🟢", "🔵");
    // sequence.push("🔴", "🔴", "🔴", "🔴", "🔴", "🔴", "🔴");
    console.log(sequence);
}

// document.querySelector("#game-over").showModal();

// aaaaa