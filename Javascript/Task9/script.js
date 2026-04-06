const list = document.getElementById('list');
const loader = document.getElementById('loader');

let page = 1;
let loading = false;

async function loadData() {
    if (loading) return;
    loading = true;
    loader.classList.remove('hide');

    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`);
        const data = await res.json();

        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `<h3>${item.title}</h3><p>${item.body}</p>`;
            list.appendChild(div);
        });

        page++;
    } catch (e) {
        loader.innerText = 'Error loading data';
    }

    loading = false;
    loader.classList.add('hide');
}

window.addEventListener('scroll', () => {
    const end = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
    if (end) {
        loadData();
    }
});

loadData();
