var tlPiece = $(".top-left-quarter-circle");
var trPiece = $(".top-right-quarter-circle");
var blPiece = $(".bottom-left-quarter-circle");
var brPiece = $(".bottom-right-quarter-circle");

var tlNote = new Audio("./Audio/C5_ff.flac");
var trNote = new Audio("./Audio/G5_pp.flac");
var blNote = new Audio("./Audio/G4_pp.flac");
var brNote = new Audio("./Audio/C4_pp.flac");

btnFlashTiming = 250;

tlPiece.on("click", function () {
    tlPiece.addClass("active-top-left");
    setTimeout(function () {
        tlPiece.removeClass("active-top-left");
    }, btnFlashTiming)

    tlNote.load();
    tlNote.play();
})

trPiece.on("click", function () {
    trPiece.addClass("active-top-right");
    setTimeout(function () {
        trPiece.removeClass("active-top-right");
    }, btnFlashTiming)

    trNote.load();
    trNote.play();
})

blPiece.on("click", function () {
    blPiece.addClass("active-bottom-left");
    setTimeout(function () {
        blPiece.removeClass("active-bottom-left");
    }, btnFlashTiming)

    blNote.load();
    blNote.play();
})

brPiece.on("click", function () {
    brPiece.addClass("active-bottom-right");
    setTimeout(function () {
        brPiece.removeClass("active-bottom-right");
    }, btnFlashTiming)

    brNote.load();
    brNote.play();
})
function randBetweenFour() {
    return Math.floor(Math.random() * 4);
}

const SEQUENCE_OPTIONS = ["🔴", "🟡", "🟢", "🔵"]

let sequence = [];


for (let i = 0; i < 100; i++) {
    sequence.push(SEQUENCE_OPTIONS[randBetweenFour()]);
}

console.log(sequence);



