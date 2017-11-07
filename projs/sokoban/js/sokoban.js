'use strict'
console.log('sokoban')

var gBoard;
var gGamerPos;
var 

gBoard = [
    ['floor', 'floor', 'wall', 'wall', 'wall', 'wall', 'wall', 'floor'],
    ['wall', 'wall', 'wall', 'floor', 'floor', 'floor', 'wall', 'floor'],
    ['wall', 'target', 'box', 'floor', 'floor', 'box', 'wall', 'floor'],
    ['wall', 'wall', 'wall', 'floor', 'floor', 'target', 'wall', 'floor'],
    ['wall', 'target', 'wall', 'wall', 'floor', 'floor', 'wall', 'floor'],
    ['wall', 'box', 'wall', 'target', 'box', 'floor', 'wall', 'wall'],
    ['wall', 'floor', 'gamer', 'floor', 'floor', 'box', 'target', 'wall'],
    ['wall', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'wall'],
    ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall']
];


function renderBoard(board, selector) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var className = gBoard[i][j];
            var tdId = 'cell-' + i + '-' + j;
            strHtml += '<td id="' + tdId + '" onclick="cellClicked(this)" ' +
                'class="    ' + className + '">' + '</td>';
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector(selector);
    elMat.innerHTML = strHtml;
}


function inItGame() {
    renderBoard(gBoard, '.gameBoard');

}

