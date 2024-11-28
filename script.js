let cart = [];
let selectedTable = null;
let paymentMethod = null;

function selectTable(tableNumber) {
  selectedTable = tableNumber;
  document.getElementById("table-title").textContent = `Mesa ${tableNumber}`;
  document.getElementById("confirmation-msg").textContent = "Faça seu pedido!";
  const buttons = document.querySelectorAll(".table-btn");
  buttons.forEach(button => button.style.display = "none");
}

function addToCart(itemName, itemPrice) {
  const existingItem = cart.find(item => item.name === itemName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: itemName, price: itemPrice, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartItemsElement = document.getElementById("cart-items");
  cartItemsElement.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - R$${item.price} x ${item.quantity}
      <button onclick="decreaseQuantity('${item.name}')">-</button>
      <button onclick="increaseQuantity('${item.name}')">+</button>
    `;
    cartItemsElement.appendChild(li);
  });
}

function decreaseQuantity(itemName) {
  const item = cart.find(i => i.name === itemName);
  if (item && item.quantity > 1) {
    item.quantity--;
    updateCart();
  }
}

function increaseQuantity(itemName) {
  const item = cart.find(i => i.name === itemName);
  if (item) {
    item.quantity++;
    updateCart();
  }
}

function selectPayment(method) {
  paymentMethod = method;
  document.getElementById("payment-info").textContent = `Método de pagamento: ${method}`;
}

function sendOrder() {
  if (selectedTable && cart.length > 0 && paymentMethod) {
    alert(`Pedido enviado para a mesa ${selectedTable}. Método de pagamento: ${paymentMethod}`);
    cart = [];
    updateCart();
    document.getElementById("payment-info").textContent = "";
    document.getElementById("confirmation-msg").textContent = "Pedido enviado!";
  } else {
    alert("Selecione uma mesa, adicione produtos ao carrinho e escolha o método de pagamento.");
  }
}
