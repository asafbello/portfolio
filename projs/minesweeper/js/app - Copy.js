'use strict';
console.log('Mine sweeper');

var gBoard;
var BOMB = '♖';
var gLevel = [
    { SIZE: 4, MINES: 2 },
    { SIZE: 6, MINES: 5 },
    { SIZE: 8, MINES: 15 }
];


var gCurrunetLevl = gLevel[0].SIZE;

// function inItGame () {
//     // console.log('in game')
// }

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

// function createBoard() {
//     var board = [];
//     for (var i = 0; i < gCurrunetLevl; i++) {
//         board[i] = [];
//         for (var j = 0; j < gCurrunetLevl; j++) {
//             board[i][j] = '';
//         }
//     }
//     setMines(board);

//     for (var k = 0; k < board.length; k++) {
//         for (var m = 0; m < board.length; m++) {
//             if (board[k][m] === BOMB) continue;
//             board[k][m] = setMinesNegsCount(board, k, m)
//         }
//     }
//     console.table(board);
//     return board;
// }

function setMines(board) {
    for (var k = 0; k < gLevel[0].MINES; k++) {
        board[getRandomIntInclusive(0, gCurrunetLevl - 1)][getRandomIntInclusive(0, gCurrunetLevl - 1)] = BOMB;
    }
}

// var gMat = createBoard();

// function renderBoard(gMat) {
//     var strHtml = '';

//     for (var i = 0; i < gMat.length; i++) {
//         var row = gMat[i];
//         strHtml += '<tr>';
//         for (var j = 0; j < gMat.length; j++) {
//             //  var tdId = 'cell-' + i + '-' + j;
//             strHtml += '<td class="cell" onclick="cellClicked(this)">' 
//             strHtml += '<span class="span">'
//             strHtml +=  (gMat[i][j]);
//             strHtml += '</span>'
//             strHtml += '</td>';
//         }
//         strHtml += '</tr>';
//     }

//     var elBoard = document.querySelector('#board')
//     elBoard.innerHTML = strHtml;
// }

// renderBoard(gMat);

// function cellClicked(elCell) {
//     var elCell = document.querySelector('.span');
    
//     elCell.classList.remove('span');
//     elCell.classList.add('span2');
//     console.log('dddd')
// }










