import { addToCart, cart, getTotals, remove, updateQty } from './cart.js';
import { products } from './data.js';

const grid = document.getElementById('grid');
const search = document.getElementById('search');
const filter = document.getElementById('filter');
const cartIcon = document.querySelector('.cart-icon');
const cartBox = document.getElementById('cart-box');
const cartList = document.getElementById('cart-list');
const countEl = document.getElementById('count');
const subEl = document.getElementById('sub');
const taxEl = document.getElementById('tax');
const discEl = document.getElementById('disc');
const totalEl = document.getElementById('total');
const closeBtn = document.getElementById('close-cart');

function render(items) {
    grid.innerHTML = '';
    items.forEach(p => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button class="btn" data-id="${p.id}">Add to Cart</button>
        `;
        grid.appendChild(div);
    });

    grid.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const prod = products.find(i => i.id === id);
            addToCart(prod);
            renderCart();
        });
    });
}

function renderCart() {
    cartList.innerHTML = '';
    let count = 0;

    cart.forEach(item => {
        count += item.qty;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name} (₹${item.price})</span>
            <input type="number" min="1" value="${item.qty}" data-id="${item.id}" class="qty">
            <button class="del" data-id="${item.id}">X</button>
        `;
        cartList.appendChild(div);
    });

    countEl.innerText = count;

    const totals = getTotals();
    subEl.innerText = totals.sub.toFixed(2);
    taxEl.innerText = totals.tax.toFixed(2);
    discEl.innerText = totals.disc.toFixed(2);
    totalEl.innerText = totals.total.toFixed(2);

    document.querySelectorAll('.qty').forEach(inpt => {
        inpt.addEventListener('change', (e) => {
            updateQty(parseInt(e.target.dataset.id), e.target.value);
            renderCart();
        });
    });

    document.querySelectorAll('.del').forEach(btn => {
        btn.addEventListener('click', (e) => {
            remove(parseInt(e.target.dataset.id));
            renderCart();
        });
    });
}

function applyFilters() {
    const term = search.value.toLowerCase();
    const cat = filter.value;

    const filtered = products.filter(p => {
        const matchTerm = p.name.toLowerCase().includes(term);
        const matchCat = cat === 'all' || p.cat === cat;
        return matchTerm && matchCat;
    });

    render(filtered);
}

search.addEventListener('input', applyFilters);
filter.addEventListener('change', applyFilters);

cartIcon.addEventListener('click', () => cartBox.classList.remove('hide'));
closeBtn.addEventListener('click', () => cartBox.classList.add('hide'));

render(products);
renderCart();
