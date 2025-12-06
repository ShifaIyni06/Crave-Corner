// ------------------ ELEMENTS ------------------
const listEl = document.getElementById('list');             // Restaurants container
const dishResults = document.getElementById('dishResults'); // Dish search container
const search = document.getElementById('search');           // Search input
const filters = document.getElementById('filters');         // Filter buttons

// ------------------ CREATE RESTAURANT CARD ------------------
function createCard(rest) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${rest.img}" alt="${rest.name}" />
    <h3>${rest.name}</h3>
    <p>${rest.category} • ${rest.distance} • ⭐ ${rest.rating}</p>
    <div style="margin-top:8px;">
      <a class="btn" href="menu.html?restId=${rest.id}">View Menu</a>
    </div>
  `;
  return card;
}

// ------------------ RENDER RESTAURANTS ------------------
function renderRestaurants(data = restaurants) {
  listEl.innerHTML = '';
  if (!data.length) {
    listEl.innerHTML = '<div class="card">No restaurants found.</div>';
    return;
  }
  data.forEach(r => listEl.appendChild(createCard(r)));
}

// ------------------ RENDER DISH RESULTS ------------------
function renderDishResults(results) {
  dishResults.innerHTML = "";
  dishResults.style.display = "block";

  if (results.length === 0) {
    dishResults.innerHTML = "<p>No dishes found</p>";
    return;
  }

  results.forEach(dish => {
    const card = document.createElement("div");
    card.className = "dish-card";

    card.innerHTML = `
      <img src="${dish.image}" class="dish-img" />
      <div class="dish-info">
        <h3>${dish.name}</h3>
        <p>₹${dish.price}</p>
        <p>⭐ ${dish.rating || "4.5"}</p>

        <button class="view-btn" data-id="${dish.restId}">
          View Restaurant
        </button>
      </div>
    `;

    // REDIRECT TO RESTAURANT PAGE
    card.querySelector(".view-btn").addEventListener("click", () => {
      window.location.href = `menu.html?restId=${dish.restId}`;
    });

    dishResults.appendChild(card);
  });
}

// ------------------ APPLY FILTERS ------------------
function applyFilters() {
  const q = (search.value || '').toLowerCase().trim();
  const activeBtn = document.querySelector('.filters button.active');
  const active = activeBtn ? activeBtn.dataset.cat : 'all';

  let filtered = restaurants.filter(r => active === 'all' || r.category === active);

  if (q) {
    filtered = filtered.filter(
      r => r.name.toLowerCase().includes(q) ||
           r.menu.some(d => d.name.toLowerCase().includes(q))
    );
  }

  renderRestaurants(filtered);
}

// ------------------ SEARCH FUNCTIONALITY ------------------
search.addEventListener('input', () => {
  const query = search.value.toLowerCase().trim();

  if (!query) {
    dishResults.innerHTML = '';
    dishResults.style.display = "none";
    renderRestaurants();
    return;
  }

  // hide restaurant list while searching
  listEl.innerHTML = '';

  const results = [];

  restaurants.forEach(rest => {
    rest.menu.forEach(dish => {
      if (dish.name.toLowerCase().includes(query)) {
        results.push({
          ...dish,
          restName: rest.name,
          restImg: rest.img,
          rating: rest.rating,
          price: dish.price,
          restId: rest.id
        });
      }
    });
  });

  renderDishResults(results);
});

// ------------------ FILTER BUTTON CLICK ------------------
filters.addEventListener('click', e => {
  if (e.target.tagName !== 'BUTTON') return;
  document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  applyFilters();
});

// ------------------ INITIAL RENDER ------------------
renderRestaurants(restaurants);
applyFilters();

// ------------------ FLOATING CART UPDATES ------------------
if (typeof updateFloatingCounts === "function") {
  setInterval(updateFloatingCounts, 500);
}
