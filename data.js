// ------------------ CART HELPERS ------------------
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(item) {
    const cart = getCart();
    const existing = cart.find(i => i.id === item.id && i.restId === item.restId);
    if(existing){
        existing.qty++;
    } else {
        cart.push({...item, qty: 1});
    }
    saveCart(cart);
    updateFloatingCounts();
}

function updateFloatingCounts() {
    const cart = getCart();
    const floatingCart = document.getElementById('floatingCart');
    if(floatingCart){
        const totalQty = cart.reduce((s,i)=> s + i.qty,0);
        floatingCart.textContent = totalQty > 0 ? `Cart (${totalQty})` : 'Cart';
    }
}

// ------------------ RESTAURANT DATA ------------------
const restaurants = [
  {
    id: 1,
    name: "Taaza",
    category: "Food",
    distance: "2 km",
    hours: "9:00 - 22:00",
    rating: 4.5,
    img: "https://mohulbhowmick.blog/wp-content/uploads/2023/06/image-3.png?w=1024",
    menu: [
      { id: 101, name: "Idli (2)", price: 30, veg: true,image:"idli.jpg", best: true },
      { id: 102, name: "Masala Dosa", price: 80, veg: true,image:"Dosa.jpg"},
      { id: 103, name: "Filter Coffee", price: 45, veg: true, image:"coffee.jpg" }
    ]
  },
  {
    id: 2,
    name: "Flamingo Cafe",
    category: "Snacks",
    distance: "1.5 km",
    hours: "10:00 - 23:00",
    rating: 4.2,
    img: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxF9tcZfte382dfvZMC_bsskoyDjfdPMqk2tmmNeVE9aRm8yMH04kpC6dODu7rHGVeM8vKo9f8D9jI6PbK1a_TJhwPhBxWPIIl1D8mzcPlQ2QUoYSmXVJGtC68cx9aZxPwmQtt4=w289-h312-n-k-no",
    menu: [
      { id: 201, name: "Veg Sandwich", price: 60, veg: true, image:"veg.jpg", best: true },
      { id: 202, name: "Cold Coffee", price: 90, veg: true,image:"coldcoffee.jpg" },
      { id: 203, name: "Paneer Wrap", price: 120, veg: true,image:"paneerwrap.jpg"}
    ]
  },
  {
    id: 3,
    name: "Krishna Dhaba",
    category: "Food",
    distance: "3 km",
    hours: "10:00 - 23:00",
    rating: 4.2,
    img: "https://content.jdmagicbox.com/v2/comp/hyderabad/c2/040pxx40.xx40.241213184705.z1c2/catalogue/shri-krishna-family-dhaba-suchitra-junction-hyderabad-restaurants-oep7fkk41x.jpg",
    menu: [
      { id: 301, name: "Veg Sandwich", price: 60, veg: true,image:"veg.jpg"},
      { id: 302, name: "Cold Coffee", price: 90, veg: true,image:"coldcoffee.jpg"},
      { id: 303, name: "Paneer Wrap", price: 120, veg: true,image:"paneerwrap.jpg"},
      { id: 304, name: "French Fries", price: 70, veg: true,image:"frenchfries.jpg"},
      { id: 305, name: "Crispy Chicken Wings", price: 150, veg: false,image:"chickenwings.jpg"},
      { id: 306, name: "Chicken Burger", price: 130, veg: false,image:"chickenburger.jpg"},
      { id: 307, name: "Chicken Nuggets", price: 140, veg: false,image:"chickennuggets.jpg" },
      { id: 308, name: "Peri Peri Rice", price: 160, veg: true,image:"peri.jpg"}
    ]
  },
  {
    id: 4,
    name: "Almond House",
    category: "Dessert",
    distance: "3 km",
    hours: "10:00 - 23:00",
    rating: 4.5,
    img: "https://almondhouse.com/cdn/shop/files/BH_124_1.jpg?v=1706173480&width=4704",
    menu: [
      { id: 401, name: "Badam Milk", price: 90, veg: true,image:"badammilk.jpg" },
      { id: 402, name: "Almond Halwa", price: 120, veg: true,image:"halwa.jpg" },
      { id: 403, name: "Dry Fruit Ladoo", price: 50, veg: true,image:"laddu.jpg" }
    ]
  },
  {
    id: 5,
    name: "Rudra Fast Food",
    category: "South Indian",
    distance: "3 km",
    hours: "10:00 - 23:00",
    rating: 4.5,
    img: "https://content.jdmagicbox.com/comp/ahmedabad/j4/079pxx79.xx79.190516120019.b4j4/catalogue/rudra-foods-juna-gandhi-road-wala--ahmedabad-xh44kxfxq0.jpg",
    menu: [
      { id: 501, name: "Chicken Pakodi", price: 90, veg: false,image:"pakodi.jpg" },
      { id: 502, name: "Chicken Ghee Masala", price: 120, veg: false,image:"ghee.jpg" },
      { id: 503, name: "Chicken Kofta", price: 50, veg: false,image:"koftha.jpg"}
    ]
  }
];
