let cart = [];
const menu = {
    hamburgers: [
        { id: 1, name: "Cheeseburger", price: 15.00 },
        { id: 2, name: "Bacon Burger", price: 18.00 },
    ],
    beverages: [
        { id: 3, name: "Coca-Cola", price: 5.00 },
        { id: 4, name: "Água", price: 3.00 },
    ],
    snacks: [
        { id: 5, name: "Batata Frita", price: 10.00 },
        { id: 6, name: "Onion Rings", price: 12.00 },
    ],
    drinks: [
        { id: 7, name: "Caipirinha", price: 20.00 },
        { id: 8, name: "Mojito", price: 22.00 },
    ],
    extras: [
        { id: 9, name: "Molho Especial", price: 2.00 },
        { id: 10, name: "Queijo Extra", price: 3.00 },
    ],
};

function startOrder() {
    const table = document.getElementById("table-number").value;
    if (!table) {
        alert("Por favor, insira o número da mesa.");
        return;
    }
    document.getElementById("menu").classList.remove("hidden");
}

function showCategory(category) {
    const productsDiv = document.getElementById("products");
    productsDiv.innerHTML = "";
    menu[category].forEach(item => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>R$ ${item.price.toFixed(2)}</p>
            <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})">Adicionar</button>
        `;
        productsDiv.appendChild(productDiv);
    });
}

function addToCart(id, name, price) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById("cart-items");
    cartDiv.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");
        cartItemDiv.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="changeQuantity(${item.id}, -1)">-</button>
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
        `;
        cartDiv.appendChild(cartItemDiv);
    });
    document.getElementById("cart-total").innerText = total.toFixed(2);
}

function changeQuantity(id, amount) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.quantity += amount;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    updateCart();
}

function finalizeOrder() {
    if (cart.length === 0) {
        alert("O carrinho está vazio!");
        return;
    }
    alert("Pedido finalizado! Obrigado por escolher o Empório Burguer.");
    cart = [];
    updateCart();
}
