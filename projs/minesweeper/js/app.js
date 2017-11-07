'use strict';
console.log('Mine sweeper');

var gBoard;
var BOMB = '💣';
var gLevel = [
    { SIZE: 4, MINES: 2 },
    { SIZE: 6, MINES: 5 },
    { SIZE: 8, MINES: 15 }
];

var gIsGameOn = true;

function inItGame() {
    startTimer();
    createBoard();
    renderBoard(gMat);
}

var gCurrunetLevl = gLevel[0];

function restartBoard() {
    document.getElementById('gameOver').innerHTML = '';
    document.getElementById('win').innerHTML = '';
    gCellsClicked = 0;
    gCellsFlagged = 0
    document.getElementById("ELAPSED").innerHTML = '';
    startTimer();
}


//CR : you can write this only once and pass the level idx as a paramter.

function changeDifficultyToEasy() {
    gIsGameOn = true;
    gCurrunetLevl = gLevel[0];
    var x = createBoard();
    renderBoard(x)
    restartBoard();
}

function changeDifficultyToMedium() {
    gIsGameOn = true;
    gCurrunetLevl = gLevel[1];
    var x = createBoard();
    renderBoard(x)
    restartBoard()
}

function changeDifficultyToHard() {
    gIsGameOn = true;
    gCurrunetLevl = gLevel[2];
    var x = createBoard();
    renderBoard(x)
    restartBoard();
}

// CR consider move this kind of func to utils.js file
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setMinesNegsCount(board, cellI, cellJ) {
    var count = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {

        if (i < 0 || i >= board.length) continue;

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {

            if (j < 0 || j >= board[i].length) continue;
            if (i === cellI && j === cellJ) continue;

            if (board[i][j] === BOMB) count++;
        }
    }
    return count;
}

function createBoard() {
    var board = [];
    for (var i = 0; i < gCurrunetLevl.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gCurrunetLevl.SIZE; j++) {
            board[i][j] = '';
        }
    }
    setMines(board);

    for (var k = 0; k < board.length; k++) {
        for (var m = 0; m < board.length; m++) {
            if (board[k][m] === BOMB) continue;
            board[k][m] = setMinesNegsCount(board, k, m)
        }
    }
    // console.table(board);
    return board;
}

function setMines(board) {
    for (var k = 0; k < gCurrunetLevl.MINES; k++) {
        board[getRandomIntInclusive(0, gCurrunetLevl.SIZE - 1)][getRandomIntInclusive(0, gCurrunetLevl.SIZE - 1)] = BOMB;
    }
}

var gMat = createBoard();

function renderBoard(gMat) {
    var strHtml = '';

    for (var i = 0; i < gMat.length; i++) {
        var row = gMat[i];
        strHtml += '<tr>';
        for (var j = 0; j < gMat.length; j++) {
            var tdId = 'cell-' + i + '-' + j;
            var checkMine = gMat[i][j] == BOMB ? "mine span" : "span";
            strHtml += '<td id="' + tdId + '" class="cell" onclick="cellClicked(this)" oncontextmenu="CellRightClicked(this)">'
            strHtml += '<span class="' + checkMine + '">'
            strHtml += (gMat[i][j]);
            strHtml += '</span>'
            strHtml += '</td>';
        }
        strHtml += '</tr>';
    }

    var elBoard = document.querySelector('#board')
    elBoard.innerHTML = strHtml;
}

renderBoard(gMat);

// CR  should be in the top of the file (keep your code oreder and clean)
var gCellsClicked = 0;

function cellClicked(elCell) {
    // CR : "if (gIsGameOn) return " is much more sexy
    //CR: based on your model and not the DOM (if (el.classList...))
    if (gIsGameOn) {
        elCell.firstChild.classList.remove('span')

        if (elCell.firstChild.innerText === '0') {
            elCell.firstChild.classList.add('span')
            elCell.classList.add('empty')
            // expandShow(elCell);
        }

        if (elCell.innerText === BOMB) {
            elCell.classList.add('span2');
            document.getElementById('gameOver').innerHTML = 'GAME OVER';
            gIsGameOn = false;
            markAllMines();
            return;

        } else {
            elCell.classList.remove('span');
            elCell.classList.add('clicked')
        }
    }
    gCellsClicked++;
    checkWin();
}

function checkWin() {
    if ((gCellsClicked + gCellsFlagged) === (gCurrunetLevl.SIZE * gCurrunetLevl.SIZE)) {
        gIsGameOn = false;
        document.getElementById('win').innerHTML = 'YOU WON';
        // no need for this return
        return;
    }
}


function markAllMines() {
    var mines = document.querySelectorAll('.mine');
    for (var i = 0; i < mines.length; i++) {
        mines[i].classList.remove('span');
        mines[i].parentElement.style.backgroundColor = 'red'
    }
}


// function expandShow(elCell) {
//     var rows = document.querySelectorAll('tr');
//     var iCell = elCell.id.split('-')[1];
//     var jCell = elCell.id.split('-')[2];
//     for (var i = iCell - 1; i <= iCell + 1; i++) {

//         if (i < 0 || i >= gMat.length) continue;

//         for (var j = jCell - 1; j <= jCell + 1; j++) {

//             if (j < 0 || j >= gMat[i].length) continue;
//             if (i === iCell && j === jCell) continue;

//             if (gMat[i][j] == 0) {
//                 rows[i].children[j].classList.add('empty')
//                 gCellsClicked++
//             }
//         }
//     }
//     return gCellsClicked;
// }


var seconds = null;
var ticker = null;

function startTimer() {
    seconds = -1;
    // CR: this is not how you use setInterval, read MDN setInterval page. 
    ticker = setInterval("tick( )", 1000);
    tick();
}

function tick() {
    if (!gIsGameOn) return;
    ++seconds;
    var secs = seconds;
    var hrs = Math.floor(secs / 3600);
    secs %= 3600;
    var mns = Math.floor(secs / 60);
    secs %= 60;
    var pretty = (hrs < 10 ? "0" : "") + hrs
        + ":" + (mns < 10 ? "0" : "") + mns
        + ":" + (secs < 10 ? "0" : "") + secs;
    document.getElementById("ELAPSED").innerHTML = pretty;
}


// if(gCellsClicked === 0) {
// }

var gCellsFlagged = 0;

function CellRightClicked(elCell) {
    if (gCellsFlagged === gCurrunetLevl.MINES) return;
    elCell.classList.add('flagged')
    gCellsFlagged++
    checkWin();
}






