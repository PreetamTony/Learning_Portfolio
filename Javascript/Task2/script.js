const screen = document.getElementById('screen');
let val = '';

window.onload = function() {
    const saved = localStorage.getItem('calcRes');
    if (saved) {
        val = saved;
        updateScreen();
    }
}

function addNum(num) {
    if (val === '0' && num !== '.') {
        val = num;
    } else {
        val += num;
    }
    updateScreen();
}

function addOper(oper) {
    if (val === '' || isNaN(val.slice(-1))) {
        return;
    }
    val += oper;
    updateScreen();
}

function clearScreen() {
    val = '';
    updateScreen();
    localStorage.removeItem('calcRes');
}

function calcResult() {
    try {
        let res = eval(val);
        if (res === undefined || !isFinite(res)) {
            res = 'Error';
        }
        val = res.toString();
        if (val !== 'Error') {
            localStorage.setItem('calcRes', val);
        }
        updateScreen();
    } catch (e) {
        val = 'Error';
        updateScreen();
    }
}

function updateScreen() {
    if (val === '') {
        screen.innerText = '0';
    } else {
        screen.innerText = val;
    }
}
