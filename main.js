// Mobile menu
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    });
}

// User images: using local files from /img placed by the user
// img/умная лампа.jpg, img/камера видео.jpg, img/робот пылесос.jpg

// Products data
const products = [
    {
        id: 1,
        name: 'Умная лампа RGB',
        price: 2499,
        oldPrice: 2999,
        badge: 'Хит',
        image: 'img/умная лампа.jpg',
        emoji: '💡',
        desc: 'RGB, управление из приложения, сцены и расписания'
    },
    {
        id: 2,
        name: 'Камера видеонаблюдения 4K',
        price: 4599,
        oldPrice: 0,
        badge: 'Новинка',
        image: 'img/камера видео.jpg',
        emoji: '📹',
        desc: 'Ночная съемка, детекция движения, облако'
    },
    {
        id: 3,
        name: 'Робот‑пылесос Pro',
        price: 18999,
        oldPrice: 21999,
        badge: 'Скидка',
        image: 'img/робот пылесос.jpg',
        emoji: '🤖',
        desc: 'Лидар, карты комнат, станция подзарядки'
    }
];

let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function updateCartCount() {
    const count = cart.reduce((s, i) => s + i.quantity, 0);
    // If you add a cart icon later, append the count there.
}

function addToCart(productId) {
    const p = products.find(x => x.id === productId);
    if (!p) return;
    const ex = cart.find(x => x.id === productId);
    if (ex) ex.quantity += 1; else cart.push({ id: p.id, name: p.name, price: p.price, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    notify('Товар добавлен в корзину');
    updateCartCount();
}

function notify(text) {
    const n = document.createElement('div');
    n.textContent = text;
    n.style.cssText = 'position:fixed;right:16px;top:80px;background:#06d6a0;color:#001018;padding:10px 14px;border-radius:10px;font-weight:800;z-index:1000;box-shadow:0 10px 24px rgba(0,0,0,.3)';
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 2200);
}

function renderProducts() {
    const root = document.querySelector('.products-grid');
    if (!root) return;
    root.innerHTML = products.map(p => `
        <div class="product-card">
            ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
            <div class="product-image">
                <img src="${p.image}" alt="${p.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'font-size:42px\\'>${p.emoji}</div>'">
            </div>
            <div class="product-title">${p.name}</div>
            <div class="product-desc">${p.desc}</div>
            <div class="product-price">${p.price.toLocaleString()} ₽ ${p.oldPrice ? `<span style="color:#b6c4de;text-decoration:line-through;font-weight:600;margin-left:6px;">${p.oldPrice.toLocaleString()} ₽</span>` : ''}</div>
            <div class="product-actions">
                <button class="btn btn-add" onclick="addToCart(${p.id})">В корзину</button>
                <button class="btn btn-like">♡</button>
            </div>
        </div>
    `).join('');
}

// Smooth scroll
for (const a of document.querySelectorAll('a[href^="#"]')) {
    a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
});
