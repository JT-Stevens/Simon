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

let clickable = true;

function tlUiChange() {
    if (clickable) {
        tlPiece.addClass("active-top-left");
        setTimeout(function () {
            tlPiece.removeClass("active-top-left");
        }, btnFlashTiming)

        tlNote.load();
        tlNote.play();
    }
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
}

function playGame() {
    gameLoop();

}

function listen() {
    // var soGoodSoFar = true;
    // while (soGoodSoFar) {
    //     console.log(sequence.toString() === playerInput.toString());
    // }
}

function gameLoop() {
    turnOnClickListener();
    addOneToSequence();
    playSequence();
    playerInput = [];

    // if (isPlayerInputCorrect()) {
    //     //Check if next turn
    //     if (isPlayerTurnCorrect()) {
    //         //Next turn
    //         console.log("Correct");
    //     }
    // } else {
    //     //Game over
    //     console.log("fail");
    // }





    // sequence.push("🔴", "🟡", "🟢", "🔵");
    // sequence.push("🔴", "🔴", "🔴", "🔴", "🔴", "🔴", "🔴");
    console.log(sequence);
    listen();

}





// aaaaa