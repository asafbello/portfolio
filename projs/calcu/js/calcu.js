'use strict'
console.log('calculator')

var gNum1;
var gNum2;
var gOp;

function addDigit(elDigit) {
    if (!gNum1) {
        gNum1 = elDigit;
        gNum1 += '';
    } else if (!gOp) {
        gNum1 += elDigit
    } else if (gNum2) {
        gNum2 += elDigit;
    } else {
        gNum2 = elDigit;
        gNum2 += '';
    }

    render(gNum1, gNum2, gOp)
}

function addOp(elOp) {
    if (gNum2) return;    
    // console.log(elOp);
    if (!gNum1) return;
    gOp = elOp;
    render(gNum1, gNum2, gOp);
    // console.log('op', gOp)
}

function addAction(elAction) {
    if (!gNum1) return;
    switch (elAction) {
        case 'C':
            clearScreen()
            break;
            
            case '←':
            console.log('try')
            if (gNum2) {
                gNum2 = null;
                document.querySelector('.numsbox').innerHTML = gNum1 + gOp;
            } else if (gOp && gNum1) {
                gOp = null;                
                // render(gNum1)
                document.querySelector('.numsbox').innerHTML = gNum1;
            } else {
                gNum1 = null;                
                clearScreen();
            }
            break;
    }
}


    function render(gNum1, gNum2, gOp) {

        if (gNum1) {
            document.querySelector('.numsbox').innerHTML = gNum1
        };
        if (gOp) {
            if (gOp == 'C') return;
            document.querySelector('.numsbox').innerHTML = gNum1 + gOp;
        }
        if (gNum2) {
            document.querySelector('.numsbox').innerHTML = gNum1 + gOp + gNum2;
        }
        if (!gNum1 && !gNum2 && !gOp) {
            document.querySelector('.numsbox').innerHTML = '';
        }
    }

    function showAnswer(gNum1, gNum2, gOp) {
        console.log(gNum1, gNum2, gOp)
        gNum1 = +gNum1;
        gNum2 = +gNum2;
        switch (gOp) {
            case '+':
                document.querySelector('.numsbox').innerHTML = sumNums(gNum1, gNum2)
                break;

            case '-':
                document.querySelector('.numsbox').innerHTML = subStractNms(gNum1, gNum2)
                break;

            case '*':
                document.querySelector('.numsbox').innerHTML = multiplyNums(gNum1, gNum2)
                break;

            case '/':
                document.querySelector('.numsbox').innerHTML = diviedNums(gNum1, gNum2)
                break;

            case '%':
                document.querySelector('.numsbox').innerHTML = modulusNums(gNum1, gNum2)
                break;

            // case 'gNum1√':
            //     document.querySelector('.numsbox').innerHTML = sqrt(gNum1)
            //     break;

        }
    }

    function sumNums(n1, n2) {
        return n1 + n2
    }

    function subStractNms(n1, n2) {
        return n1 - n2
    }

    function multiplyNums(n1, n2) {
        return n1 * n2
    }

    function diviedNums(n1, n2) {
        return n1 / n2
    }

    function modulusNums(n1, n2) {
        return n1 % n2
    }

    function sqrt(n1) {
        return Math.sqrt(n1)
    }

    function clearScreen() {
        gNum1 = null;
        gNum2 = null;
        gOp = null;
        render(gNum1, gNum2, gOp);
    }
