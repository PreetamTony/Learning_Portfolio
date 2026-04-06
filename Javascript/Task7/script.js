const box = document.getElementById('box');
const input = document.getElementById('msg');
const send = document.getElementById('send');

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

send.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    
    addMsg(text, 'user');
    input.value = '';
    
    setTimeout(() => {
        addMsg("Thanks for your message!", 'bot');
    }, 1000);
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        send.click();
    }
});
