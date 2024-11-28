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

function addToCart(item, price) {
  const existingItem = cart.find(cartItem => cartItem.name === item);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name: item, price, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.quantity} - R$${item.price * item.quantity}`;
    cartItems.appendChild(li);
  });
}

function selectPayment(method) {
  paymentMethod = method;
  const paymentInfo = document.getElementById("payment-info");
  paymentInfo.innerHTML = "";
  if (method === "dinheiro") {
    paymentInfo.innerHTML = `<label>Troco pra quanto?</label><input id="cash-input" type="number" placeholder="Ex: 100">`;
  } else if (method === "cartão") {
    paymentInfo.textContent = "Por favor, chame o garçom ou compareça ao balcão para efetuar o pagamento!";
  } else if (method === "pix") {
    paymentInfo.textContent = "Chave Pix: 5584996106961. Envie o comprovante para confirmação!";
  }
}

function sendOrder() {
  const cashInput = document.getElementById("cash-input");
  let trocoInfo = "";
  if (paymentMethod === "dinheiro" && cashInput) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cash = parseFloat(cashInput.value);
    const troco = cash - total;
    trocoInfo = `Valor pago: R$${cash}, Troco: R$${troco.toFixed(2)}`;
  }

  const message = `
Mesa: ${selectedTable}
Pedido: ${cart.map(item => `${item.name} x${item.quantity}`).join(", ")}
Forma de pagamento: ${paymentMethod}
${trocoInfo}
  `;
  window.open(`https://wa.me/5584996106961?text=${encodeURIComponent(message)}`);
}
