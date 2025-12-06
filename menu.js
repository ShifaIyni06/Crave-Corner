// -------------------- MENU.JS --------------------

// 1️⃣ Get restaurant ID from URL
const urlParams = new URLSearchParams(window.location.search);
const restId = urlParams.get('restId')?.trim();

// 2️⃣ Find the restaurant
const rest = restaurants.find(r => r.id == restId);

if (!rest) {
  alert("Restaurant not found!");
  window.location.href = "index.html"; 
}

// 3️⃣ Render restaurant banner
const banner = document.getElementById('banner');
banner.innerHTML = `
  <div style="text-align:center">
    <h2>${rest.name}</h2>
    <p>${rest.category} • ${rest.distance} • ${rest.hours}</p>
  </div>
`;

// 4️⃣ Render menu items
const menuList = document.getElementById('menuList');

function renderMenu() {
  menuList.innerHTML = '';

  rest.menu.forEach(item => {
    const node = document.createElement('div');
    node.className = 'menu-item';

    node.innerHTML = `
      <img src="${item.image || rest.img}" class="dish-img">

      <div class="meta">
        <div>
          <strong>${item.name}</strong>
          ${item.best ? '<span style="color:var(--accent);font-weight:600"> • Best</span>' : ''}
        </div>
        <div style="color:var(--muted);font-size:13px">₹ ${item.price}</div>
      </div>

      <div>
        <button class="btn" data-id="${item.id}">Add</button>
      </div>
    `;

    menuList.appendChild(node);
  });

  // 5️⃣ Add to cart logic
  menuList.querySelectorAll('button[data-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const item = rest.menu.find(m => m.id === id);

      if (item) {
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          restId: rest.id
        });

        btn.innerText = 'Added';
        setTimeout(() => btn.innerText = 'Add', 800);
      }
    });
  });
}

// 6️⃣ Render menu
renderMenu();

// 7️⃣ Update floating cart count
updateFloatingCounts();
setInterval(updateFloatingCounts, 400);
