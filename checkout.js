// ---------- HELPER FUNCTIONS (use your existing ones) ----------
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function clearCart() {
  localStorage.removeItem("cart");
}

// ---------- ELEMENTS ----------
const form = document.getElementById('checkoutForm');
const orderSummary = document.getElementById('orderSummary');

// ---------- SHOW ORDER SUMMARY ----------
function showSummary() {
  const cart = getCart();

  if (cart.length === 0) {
    orderSummary.innerHTML = '<p>No items in cart.</p>';
    return;
  }

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = subtotal > 200 ? 0 : 30;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + gst;

  orderSummary.innerHTML = `
    <p>Items: ${cart.length}</p>
    <p>Subtotal: ₹${subtotal}</p>
    <p>Delivery: ₹${delivery}</p>
    <p>GST (5%): ₹${gst}</p>
    <div class="total">Total: ₹${total}</div>
  `;
}

showSummary();

// ---------- CHECKOUT FORM SUBMIT ----------
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const cart = getCart();
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const addr = document.getElementById("custAddress").value.trim();

    if (!name || !phone || !addr) {
      alert("Please fill all details.");
      return;
    }

    const order = {
      id: "ORD" + Date.now(),
      name,
      phone,
      address: addr,
      items: cart,
      total: cart.reduce((s, i) => s + i.qty * i.price, 0),
      time: new Date().toLocaleString()
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));

    clearCart();

    alert(`Order placed!\nOrder ID: ${order.id}\nDelivery: 30–45 mins`);

    location.href = "index.html";
  });
}
