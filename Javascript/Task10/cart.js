export let cart = JSON.parse(localStorage.getItem('cart')) || [];
cart = cart.filter(i => i && i.id && i.name && i.price);

export function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(product) {
    const item = cart.find(i => i.id === product.id);
    if (item) {
        item.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart();
}

export function updateQty(id, qty) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty = parseInt(qty);
        if (item.qty <= 0) remove(id);
    }
    saveCart();
}

export function remove(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
}

export function getTotals() {
    const sub = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const tax = sub * 0.1;
    const disc = sub > 1000 ? 50 : 0;
    const total = sub + tax - disc;
    return { sub, tax, disc, total };
}
