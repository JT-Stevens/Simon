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
    })

    trPiece.on("click", function () {
        trUiChange();
    })

    blPiece.on("click", function () {
        blUiChange();
    })

    brPiece.on("click", function () {
        brUiChange();
    })
}


function randBetweenFour() {
    return Math.floor(Math.random() * 4);
}

function playSequence() {

    $(".piece").off("click");
    setTimeout(() => {
        turnOnClickListener();
    }, sequence.length * 500);
 
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
        }, i * 500);
    }
}
 

function gameLoop() {
    turnOnClickListener();
    sequence.push(SEQUENCE_OPTIONS[randBetweenFour()]);
    sequence.push(SEQUENCE_OPTIONS[randBetweenFour()]);
    sequence.push(SEQUENCE_OPTIONS[randBetweenFour()]);
    sequence.push(SEQUENCE_OPTIONS[randBetweenFour()]);
    sequence.push(SEQUENCE_OPTIONS[randBetweenFour()]);
    // sequence.push("🔴", "🟡", "🟢", "🔵");
    // sequence.push("🔴", "🔴", "🔴", "🔴", "🔴", "🔴", "🔴");
    playSequence();
    console.log(sequence);

}


gameLoop();




