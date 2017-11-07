'use strict';
console.log('in picture');

var gCurrQuestIdx;
var gQuests;

function createQuest() {
    return [
        { id: 1, opts: ['he is gonna loose', 'good hand!'], correctOptIndex: 0 },
        { id: 2, opts: ['batman is going to suicide', 'looking for bad guys'], correctOptIndex: 1 },
        { id: 3, opts: ['running on a pencil', 'stupid picture'], correctOptIndex: 0 }
    ];
}

function inItGame() {
    gQuests = createQuest()
    gCurrQuestIdx = 0;
    renderQuest()
}

function renderQuest() {
    var currQuest = gQuests[gCurrQuestIdx]

    var elImageHolder = document.querySelector('.image-holder');
    elImageHolder.innerHTML = '<img src="img/' + currQuest.id + '.jpg">'

    var elAnswersholder = document.querySelector('.answers-holder ');
    var strHTML = '';
    for (var i = 0; i < currQuest.opts.length; i++) {
        strHTML += '<h3 onclick="checkAnswer(' + i + ')">' + currQuest.opts[i] + '</h3>'
    }
    elAnswersholder.innerHTML = strHTML
}

function checkAnswer(answerIdx) {
    var currQuest = gQuests[gCurrQuestIdx]
    if (currQuest.correctOptIndex === answerIdx) {
        gCurrQuestIdx++;
        if (gCurrQuestIdx === gQuests.length) {
            console.log('win')
        } else {
            renderQuest();
        }
    }
}





