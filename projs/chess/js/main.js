'use strict'

// Pieces Types
var ROOK = '♖';
var BISHOP = '♗';
var PAWN_BLACK = '♟';
var PAWN_WHITE = '♙';
var KING = '♔';
var KNIGHT = '♞';

// The Chess Board
var gBoard;

function restartGame() {
    gBoard = buildBoard();
    renderBoard(gBoard, '.gameBoard');
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < 8; i++) {
        board[i] = [];
        for (var j = 0; j < 8; j++) {
            board[i][j] = '';
        }
    }
    board[3][2] = ROOK;
    board[5][1] = BISHOP;
    board[1][3] = PAWN_BLACK;
    board[6][3] = PAWN_WHITE;
    board[5][7] = PAWN_WHITE;
    board[6][4] = KING;
    board[3][5] = KNIGHT;


    // console.table(board);
    return board;

}

function renderBoard(board, selector) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var className = ((i + j + 1) % 2 === 0) ? 'black' : 'white';
            var tdId = 'cell-' + i + '-' + j;
            strHtml += '<td id="' + tdId + '" onclick="cellClicked(this)" ' +
                'class="    ' + className + '">' + cell + '</td>';
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector(selector);
    elMat.innerHTML = strHtml;
}


function cellClicked(elCell) {
    cleanBoard();
    var pieceCoord = getCellCoord(elCell.id);

    // console.log('elCell.id: ', elCell.id);
    var piece = elCell.innerText;

    var possibleCoords = [];
    switch (piece) {
        case '♖':
            possibleCoords = getAllPossibleCoordsRook(pieceCoord);
            break;
        case '♗':
            possibleCoords = getAllPossibleCoordsBishop(pieceCoord);
            break;
        case '♟':
            possibleCoords = getAllPossibleCoordsPawn(pieceCoord, false);
            break;
        case '♙':
            possibleCoords = getAllPossibleCoordsPawn(pieceCoord, true);
            break;
        case '♔':
            possibleCoords = getAllPossibleCoordsKing(pieceCoord);
            break;
        case '♞':
            possibleCoords = getAllPossibleCoordsKnight(pieceCoord);
            break;

    }
    console.log('possibleCoords', possibleCoords);
    markCells(possibleCoords);
}

function markCells(coords) {
    for (var i = 0; i < coords.length; i++) {
        var coord = coords[i];
        var selector = getSelector(coord);
        var elCell = document.querySelector(selector);
        elCell.classList.add('mark');
    }

}
// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var coord = {};
    coord.i = +strCellId.substring(5, strCellId.lastIndexOf('-'));
    coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
    // console.log('coord', coord);
    return coord;
}
function getSelector(coord) {
    return '#cell-' + coord.i + '-' + coord.j
}

function cleanBoard() {
    var tds = document.querySelectorAll('td.mark');
    for (var i = 0; i < tds.length; i++) {
        tds[i].classList.remove('mark');
    }
}

function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
    var res = [];

    var diff = 1;
    if (isWhite) diff = -1;
    var coord = { i: pieceCoord.i + diff, j: pieceCoord.j }
    res.push(coord)

    if (isWhite && pieceCoord.i === 6) {
        coord = { i: pieceCoord.i - 2, j: pieceCoord.j }
        res.push(coord)
    } else if (!isWhite && pieceCoord.i === 1) {
        coord = { i: pieceCoord.i + 2, j: pieceCoord.j }
        res.push(coord)
    }
    return res;
}


function getAllPossibleCoordsRook(pieceCoord) {
    var res = [];
    for (var idx = 0; idx < gBoard.length; idx++) {
        // Dont mark the clicked cell
        if (idx !== pieceCoord.j) {
            //push all cells in the same row  
            res.push({ i: pieceCoord.i, j: idx });
        }
        if (idx !== pieceCoord.i) {
            //push all cells in the same col  
            res.push({ i: idx, j: pieceCoord.j });
        }
    }
    return res;
}

function getAllPossibleCoordsBishop(pieceCoord) {
    var res = [];
    for (var i = 0; i < gBoard.length; i++) {
        var row = gBoard[i];
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];

            if (i === pieceCoord.i && j === pieceCoord.j) continue;

            if (pieceCoord.i + pieceCoord.j === i + j ||
                pieceCoord.i - pieceCoord.j === i - j) {
                res.push({ i: i, j: j });
            }
        }
    }

    return res;
}

function getAllPossibleCoordsKing(pieceCoord) {
    var res = [];
    for (var i = 0; i < gBoard.length; i++) {
        var row = gBoard[i];
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            // if (index === pieceCoord.i && jndex === pieceCoord.j) continue;
            // for (var index = pieceCoord.i - 1; index <= pieceCoord.i + 1; index++) {
            //     for (var jndex = pieceCoord.j - 1; jndex <= pieceCoord.j + 1; jndex++) {
            //         res.push({ i: index, j: jndex });
            //     }
            // }
            if (i === pieceCoord.i && j === pieceCoord.j) continue;
            if (
                pieceCoord.i - 1 <= i &&
                pieceCoord.i + 1 >= i &&
                pieceCoord.j - 1 <= j &&
                pieceCoord.j + 1 >= j
            ) {
                res.push({ i: i, j: j });
            }
        }
    }
    return res;
}


function getAllPossibleCoordsKnight(pieceCoord) {
    var res = [];
    for (var i = 0; i < gBoard.length; i++) {
        var row = gBoard[i];
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            if (
                (pieceCoord.i - 2) === i && (pieceCoord.j - 1) === j ||
                (pieceCoord.i - 2) === i && (pieceCoord.j + 1) === j ||
                (pieceCoord.i + 2) === i && (pieceCoord.j + 1) === j ||
                (pieceCoord.i + 2) === i && (pieceCoord.j - 1) === j ||
                (pieceCoord.i - 1) === i && (pieceCoord.j - 2) === j ||
                (pieceCoord.i - 1) === i && (pieceCoord.j + 2) === j ||
                (pieceCoord.i + 1) === i && (pieceCoord.j - 2) === j ||
                (pieceCoord.i + 1) === i && (pieceCoord.j + 2) === j

            ) {
                res.push({ i: i, j: j });
            }
        }
    }
    return res; 
}

