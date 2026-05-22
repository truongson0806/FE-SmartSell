// SmartSell Frontend Features (Vanilla JS)
// =======================================

// ===============================
// 1. FLASH SALE COUNTDOWN
// ===============================

const countdownElement = document.getElementById("countdown");

const endDate = new Date("2026-12-31 23:59:59").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const distance = endDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  countdownElement.innerHTML =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;

}, 1000);


// ===============================
// 2. ADD TO CART
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id, name, price, image) {

  const product = {
    id,
    name,
    price,
    image,
    quantity: 1
  };

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart!");
}


// ===============================
// 3. DISPLAY CART
// ===============================

function displayCart() {

  const cartContainer = document.getElementById("cart-container");

  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach(item => {

    total += item.price * item.quantity;

    cartContainer.innerHTML += `
    
      <div class="cart-item">
      
        <img src="${item.image}" width="100" />
        
        <h3>${item.name}</h3>
        
        <p>$${item.price}</p>
        
        <p>Qty: ${item.quantity}</p>

        <button onclick="increaseQty(${item.id})">
          +
        </button>

        <button onclick="decreaseQty(${item.id})">
          -
        </button>

        <button onclick="removeItem(${item.id})">
          Remove
        </button>

      </div>

    `;
  });

  cartContainer.innerHTML += `
  
    <h2>Total: $${total}</h2>
  
  `;
}


// ===============================
// 4. REMOVE ITEM
// ===============================

function removeItem(id) {

  cart = cart.filter(item => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
}


// ===============================
// 5. INCREASE QUANTITY
// ===============================

function increaseQty(id) {

  const item = cart.find(item => item.id === id);

  item.quantity++;

  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
}


// ===============================
// 6. DECREASE QUANTITY
// ===============================

function decreaseQty(id) {

  const item = cart.find(item => item.id === id);

  if (item.quantity > 1) {
    item.quantity--;
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
}


// ===============================
// 7. SEARCH PRODUCT
// ===============================

function searchProduct() {

  const input = document
    .getElementById("search")
    .value
    .toLowerCase();

  const products = document.querySelectorAll(".product");

  products.forEach(product => {

    const title = product
      .querySelector("h3")
      .innerText
      .toLowerCase();

    if (title.includes(input)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}


// ===============================
// 8. PRODUCT FILTER
// ===============================

function filterByPrice(maxPrice) {

  const products = document.querySelectorAll(".product");

  products.forEach(product => {

    const price = parseInt(
      product.getAttribute("data-price")
    );

    if (price <= maxPrice) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}


// ===============================
// 9. PRODUCT RATING SYSTEM
// ===============================

function rateProduct(stars) {

  const ratingText = document.getElementById("rating-text");

  ratingText.innerHTML =
    `You rated this product ${stars} stars`;
}


// ===============================
// 10. DARK MODE
// ===============================

function toggleDarkMode() {

  document.body.classList.toggle("dark-mode");

  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );
}


// Load Dark Mode
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}


// ===============================
// 11. IMAGE GALLERY
// ===============================

function changeImage(imageSrc) {

  document.getElementById("main-image").src = imageSrc;
}


// ===============================
// 12. BACK TO TOP BUTTON
// ===============================

const topBtn = document.getElementById("topBtn");

window.onscroll = () => {

  if (document.documentElement.scrollTop > 200) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
};

function backToTop() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ===============================
// 13. ORDER TRACKING
// ===============================

function trackOrder() {

  const orderId = document
    .getElementById("order-id")
    .value;

  const result = document
    .getElementById("tracking-result");

  if (orderId === "12345") {

    result.innerHTML = `
      Order Status:
      <span style="color:green">
        Shipping
      </span>
    `;

  } else {

    result.innerHTML = `
      <span style="color:red">
        Order Not Found
      </span>
    `;
  }
}


// ===============================
// 14. AI PHONE SUGGESTION
// ===============================

function suggestPhone() {

  const budget = document
    .getElementById("budget")
    .value;

  const result = document
    .getElementById("suggestion");

  if (budget < 500) {

    result.innerHTML =
      "Recommended: Xiaomi Redmi Note Series";

  } else if (budget < 1000) {

    result.innerHTML =
      "Recommended: Samsung Galaxy A Series";

  } else {

    result.innerHTML =
      "Recommended: iPhone Pro Max";
  }
}


// ===============================
// 15. LIVE CLOCK
// ===============================

function updateClock() {

  const now = new Date();

  document.getElementById("clock").innerHTML =
    now.toLocaleTimeString();
}

setInterval(updateClock, 1000);