const cartItemsEl = document.getElementById('cartItems');
const summaryEl = document.getElementById('summary');
const proceedBtn = document.getElementById('proceed');

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateFloatingCounts() {
    // optional: update floating cart count
}

function renderCart() {
    const cart = getCart();
    cartItemsEl.innerHTML = '';
    summaryEl.innerHTML = '';

    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<div class="cart-item card">Your cart is empty</div>';
        proceedBtn.style.display = 'none';
        updateFloatingCounts();
        return;
    }

    proceedBtn.style.display = 'block';

    cart.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'cart-item card'; // card class adds shadow + spacing

        row.innerHTML = `
            <div class="cart-left">
                <h3>${item.dish || item.name}</h3>
                <p>₹${item.price}</p>
                <button class="remove-btn" data-action="remove" data-idx="${index}">Remove</button>
            </div>
            <div class="qty-controls">
                <button class="qty-btn" data-action="decrease" data-idx="${index}">-</button>
                <div>${item.qty}</div>
                <button class="qty-btn" data-action="increase" data-idx="${index}">+</button>
            </div>
        `;

        cartItemsEl.appendChild(row);
    });

    // Summary box with shadow
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const delivery = subtotal > 200 ? 0 : 30;
    const gst = Math.round(subtotal * 0.05);
    const total = subtotal + delivery + gst;

    summaryEl.innerHTML = `
        <div class="card summary-card">
            <div>Subtotal: ₹${subtotal}</div>
            <div>Delivery: ₹${delivery}</div>
            <div>GST (5%): ₹${gst}</div>
            <h3>Total: ₹${total}</h3>
        </div>
    `;

    updateFloatingCounts();
}

// Event delegation for + / - / Remove buttons
cartItemsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const action = btn.dataset.action;
    const idx = Number(btn.dataset.idx);
    let cart = getCart();
    if (!cart[idx]) return;

    if (action === 'increase') cart[idx].qty++;
    else if (action === 'decrease') {
        if (cart[idx].qty > 1) cart[idx].qty--;
        else cart.splice(idx, 1);
    } else if (action === 'remove') {
        cart.splice(idx, 1);
    }

    saveCart(cart);
    renderCart();
});


// Initial render
renderCart();



