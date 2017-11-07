
var gProjects = [
    { id: '0', name: 'MineSweeper', title: 'Do not die', desc: 'Click all non-bombs cells to win', lables: ['matrixes', 'mouse clicks'], url: 'img/games/minesweeper.jpg', link: '../projs/minesweeper/index.html' },
    { id: '1', name: 'Sokoban', title: 'Lets push', desc: 'Put all boxes on targets to win', lables: ['matrixes', 'mouse clicks'], url: 'img/games/sokoban.jpg', link: '../projs/sokoban/sokoban.html' },
    { id: '2', name: 'chess', title: 'chess', desc: 'Kill the opposing king before he kills you', lables: ['matrixes', 'mouse clicks'], url: 'img/games/chess.jpg', link: '../projs/chess/index.html' },
    { id: '3', name: 'calculator', title: 'just calac', desc: 'check how smart you are', lables: ['calcs', 'mouse clicks'], url: 'img/games/calc.png', link: '../projs/calcu/calcu.html' },
    { id: '4', name: 'Pop ballons', title: 'click fast', desc: 'pop all ballons as fast as you can', lables: ['ballons', 'mouse clicks'], url: 'img/games/pop.jpg', link: '../projs/balloon-pop/index.html' },
    { id: '5', name: 'In picture', title: 'guess!', desc: 'guess the right description to win', lables: ['mouse clicks'], url: 'img/games/inpic.jpg', link: '../projs/in-picture/index.html' },
];

function addProjectsDiv(proj) {
    var strHtml = '';
    for (var i = 0; i < gProjects.length; i++) {
        var element = gProjects[i];
        strHtml += '<div class="col-md-4 col-sm-6 portfolio-item">' +
            '<a class="portfolio-link" data-toggle="modal" href="#portfolioModal' + i + '">' +
            '<div class="portfolio-hover">' +
            '<div class="portfolio-hover-content">' +
            '<i class="fa fa-plus fa-3x"></i>' +
            '</div>' +
            '</div>' +
            '<img class="img-fluid" src="' + element.url + '" alt="">' +
            '</a >' +
            '<div class="portfolio-caption">' +
            '<h4>' + element.name + '</h4>' +
            '<p class="text-muted">' + element.desc + '</p>' +
            '</div>' +
            '</div >';

    }

    document.querySelector('#my-projects').innerHTML = strHtml;
}

function addModals() {
    var strHtml = '';
    for (var i = 0; i < gProjects.length; i++) {
        var element = gProjects[i];
        strHtml += '<div class="portfolio-modal modal fade" id="portfolioModal' + i + '" tabindex="-1" role="dialog" aria-hidden="true">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="close-modal" data-dismiss="modal">' +
            '<div class="lr">' +
            '<div class="rl"></div>' +
            '</div>' +
            '</div>' +
            ' <div class="container">' +
            '<div class="row">' +
            '<div class="col-lg-8 mx-auto">' +
            ' <div class="modal-body">' +
            // <!-- Project Details Go Here \
            '<h2>' + element.name + '</h2>' +
            // <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
            '<img class="img-fluid d-block mx-auto" src="' + element.url + '" alt="">' +
            '<p>' + element.desc + '</p>' +
            '<ul class="list-inline">' +
            //   <li>Date: January 2017</li>
            //   <li>Client: Threads</li>
            //   <li>Category: Illustration</li>
            // </ul>
            '<a href="' + element.link + '" class="btn btn-danger btn-lg active" role="button" aria-pressed="true">Go to game</a><br />' +
            '<br />' +
            '<button class="btn btn-primary" data-dismiss="modal" type="button">' +
            '<i class="fa fa-times"></i>' +
            'Close Project</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
    console.log(strHtml)
    document.querySelector('body').innerHTML += strHtml;
}

function init() {
    addProjectsDiv();
    addModals();
}

function sendMail() {
    window.open('mailto:test@gmail.com')
}