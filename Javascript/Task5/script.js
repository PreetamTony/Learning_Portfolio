const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const setupBox = document.getElementById('setup-box');
const loadingBox = document.getElementById('loading-box');
const quizBox = document.getElementById('quiz-box');
const resBox = document.getElementById('result');
const expBox = document.getElementById('explanation-box');

const topicIn = document.getElementById('topic');
const countIn = document.getElementById('count');
const diffIn = document.getElementById('difficulty');
const genBtn = document.getElementById('generate');

const qEl = document.getElementById('question');
const optEl = document.getElementById('options');
const expEl = document.getElementById('explanation');
const nextBtn = document.getElementById('next-btn');

const scoreEl = document.getElementById('score');
const totalEl = document.getElementById('total');
const fbEl = document.getElementById('feedback');
const restartBtn = document.getElementById('restart');

let qs = [];
let curr = 0;
let score = 0;

genBtn.addEventListener('click', async () => {
    const topic = topicIn.value.trim();
    const count = parseInt(countIn.value);
    const diff = diffIn.value;

    if (!topic || !count) return;

    setupBox.classList.add('hide');
    loadingBox.classList.remove('hide');

    const prompt = `Return a JSON object with a single key "questions". The value must be an array of exactly ${count} multiple choice questions about ${topic} at ${diff} difficulty. Each object in the array must have properties: "q" (string), "opts" (array of 4 strings), "ans" (string, strictly matching one option), and "exp" (short string explaining the answer).`;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        const content = data.choices[0].message.content;
        qs = JSON.parse(content).questions;

        loadingBox.classList.add('hide');
        quizBox.classList.remove('hide');
        loadQ();
    } catch (e) {
        loadingBox.classList.add('hide');
        setupBox.classList.remove('hide');
        alert('Error generating questions. Please try again.');
    }
});

function loadQ() {
    optEl.innerHTML = '';
    expBox.classList.add('hide');
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
    const qData = qs[curr];
    const btns = optEl.querySelectorAll('.btn');
    
    btns.forEach(b => {
        b.disabled = true;
        if (b.innerText === qData.ans) {
            b.classList.add('correct');
        } else if (b.innerText === sel) {
            b.classList.add('wrong');
        }
    });

    if (sel === qData.ans) {
        score++;
    }
    
    expEl.innerText = qData.exp;
    expBox.classList.remove('hide');
}

nextBtn.addEventListener('click', () => {
    curr++;
    if (curr < qs.length) {
        loadQ();
    } else {
        showRes();
    }
});

function showRes() {
    quizBox.classList.add('hide');
    resBox.classList.remove('hide');
    scoreEl.innerText = score;
    totalEl.innerText = qs.length;
    
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
    topicIn.value = '';
    countIn.value = '';
    resBox.classList.add('hide');
    setupBox.classList.remove('hide');
});
