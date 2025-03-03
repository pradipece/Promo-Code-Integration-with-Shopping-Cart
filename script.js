// API URLs
const apiURLs = [
    "https://fakestoreapiserver.reactbd.com/products",
    "https://api.escuelajs.co/api/v1/products",
    "https://fakestoreapi.com/products"
];

let cart = [];
let appliedPromo = null;

// Fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch(apiURLs[0]); // Using first API
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Display products in UI with images
function displayProducts(products) {
    const container = document.getElementById("products-container");
    container.innerHTML = "";
    products.slice(0, 6).forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
        `;
        container.appendChild(productElement);
    });
}

// Add item to cart
function addToCart(id, title, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, title, price, quantity: 1 });
    }
    updateCart();
}

// Update cart UI
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const li = document.createElement("li");
        li.textContent = `${item.title} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;
        cartItems.appendChild(li);
    });

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    applyDiscount();
}

// Apply Promo Code
function applyPromoCode() {
    const promoInput = document.getElementById("promo-code").value.trim().toLowerCase();
    const promoMessage = document.getElementById("promo-message");

    if (appliedPromo) {
        promoMessage.textContent = "Promo code already applied!";
        return;
    }

    if (promoInput === "pradip10") {
        appliedPromo = 0.10; // 10% discount
        promoMessage.textContent = "Promo code applied: 10% discount!";
        promoMessage.style.color = "green";
    } else if (promoInput === "pradip5") {
        appliedPromo = 0.05; // 5% discount
        promoMessage.textContent = "Promo code applied: 5% discount!";
        promoMessage.style.color = "green";
    } else {
        promoMessage.textContent = "Invalid promo code!";
        promoMessage.style.color = "red";
        return;
    }

    applyDiscount();
}

// Apply discount and update total
function applyDiscount() {
    let subtotal = parseFloat(document.getElementById("subtotal").textContent);
    let discountAmount = appliedPromo ? subtotal * appliedPromo : 0;
    let finalTotal = subtotal - discountAmount;

    document.getElementById("discount").textContent = discountAmount.toFixed(2);
    document.getElementById("total").textContent = finalTotal.toFixed(2);
}

// Initialize
fetchProducts();
