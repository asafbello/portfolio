'use strict';
console.log('baloons pop!!!');

var gBallons = [
    { name: 'ballon1', bottom: 0, speed: 3, isClicked: false },
    { name: 'ballon2', bottom: 0, speed: 5, isClicked: false }
]

var gElBallons = document.querySelectorAll('.ballon');
console.log(gElBallons);

setInterval(function () {
    renderBallons()
    moveBallon(gBallons);
}, 1000)


function moveBallon(gBallons) {
    for (var i = 0; i < gBallons.length; i++) {
        gBallons[i].bottom += 20;
    }
    console.log(gBallons);
}


function renderBallons() {
    for (var i = 0; i < gBallons.length; i++) {
        var ballon = gElBallons[i];
        ballon.style.bottom = gBallons[i].bottom + 'px'
    }
}

function ballonClicked(elBaloon) {
    elBaloon.classList.add('clicked');
    var audio = new Audio('sounds/pop.mp3');
    audio.play();
}



