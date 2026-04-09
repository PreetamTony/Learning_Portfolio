const box = document.getElementById('box');
const input = document.getElementById('msg');
const send = document.getElementById('send');

const API_KEY = CONFIG.GROQ_API_KEY;
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

let chatHistory = [];

function getTime() {
    const d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    m = m < 10 ? '0' + m : m;
    return `${h}:${m} ${ampm}`;
}

function addMsg(text, type) {
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.innerHTML = `${text} <span class="time">${getTime()}</span>`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

async function getBotResponse() {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: chatHistory,
                temperature: 1,
                max_completion_tokens: 1024,
                top_p: 1,
                stream: false
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
            const botMsg = data.choices[0].message.content;
            addMsg(botMsg, 'bot');
            chatHistory.push({ role: 'assistant', content: botMsg });
        } else {
            addMsg("Sorry, I couldn't process that.", 'bot');
        }
    } catch (error) {
        addMsg("Error connecting to server.", 'bot');
    }
}

send.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    
    addMsg(text, 'user');
    chatHistory.push({ role: 'user', content: text });
    input.value = '';
    
    getBotResponse();
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        send.click();
    }
});
