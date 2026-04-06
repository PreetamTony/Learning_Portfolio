const qs = [
    { q: "What is 2 + 2?", opts: ["3", "4", "5"], ans: "4" },
    { q: "Capital of France?", opts: ["Berlin", "Madrid", "Paris"], ans: "Paris" },
    { q: "Sun rises in?", opts: ["East", "West", "North"], ans: "East" }
];

let curr = 0;
let score = 0;

const box = document.getElementById('quiz-box');
const qEl = document.getElementById('question');
const optEl = document.getElementById('options');
const resBox = document.getElementById('result');
const scoreEl = document.getElementById('score');
const fbEl = document.getElementById('feedback');
const restartBtn = document.getElementById('restart');

function loadQ() {
    optEl.innerHTML = '';
    const qData = qs[curr];
    qEl.innerText = qData.q;
    
    qData.opts.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'btn';
        btn.addEventListener('click', () => checkAns(opt));
        optEl.appendChild(btn);
    });
}

function checkAns(sel) {
    if (sel === qs[curr].ans) {
        score++;
    }
    
    curr++;
    if (curr < qs.length) {
        loadQ();
    } else {
        showRes();
    }
}

function showRes() {
    box.classList.add('hide');
    resBox.classList.remove('hide');
    scoreEl.innerText = score;
    
    if (score === qs.length) {
        fbEl.innerText = "Excellent!";
    } else if (score > 0) {
        fbEl.innerText = "Good job!";
    } else {
        fbEl.innerText = "Keep practicing!";
    }
}

restartBtn.addEventListener('click', () => {
    curr = 0;
    score = 0;
    resBox.classList.add('hide');
    box.classList.remove('hide');
    loadQ();
});

loadQ();
