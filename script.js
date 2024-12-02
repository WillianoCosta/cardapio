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
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x${item.quantity} - R$${(item.price * item.quantity).toFixed(2)}
      <button onclick="adjustQuantity(${index}, 1)">+</button>
      <button onclick="adjustQuantity(${index}, -1)">-</button>
      <button onclick="removeFromCart(${index})">Remover</button>
    `;
    cartItems.appendChild(li);
  });

  const totalElement = document.getElementById("cart-total");
  if (!totalElement) {
    const totalDiv = document.createElement("div");
    totalDiv.id = "cart-total";
    totalDiv.textContent = `Total: R$${total.toFixed(2)}`;
    document.getElementById("cart").appendChild(totalDiv);
  } else {
    totalElement.textContent = `Total: R$${total.toFixed(2)}`;
  }
}

function adjustQuantity(index, amount) {
  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1); // Remove o item se a quantidade for 0
  }
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1); // Remove o item do carrinho
  updateCart();
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
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (paymentMethod === "dinheiro" && cashInput) {
    const cash = parseFloat(cashInput.value);
    const troco = cash - total;
    trocoInfo = `Valor pago: R$${cash}, Troco: R$${troco.toFixed(2)}`;
  }

  const message = `
Mesa: ${selectedTable}
Pedido: ${cart.map(item => `${item.name} x${item.quantity}`).join(", ")}
Forma de pagamento: ${paymentMethod}
Total: R$${total.toFixed(2)}
${trocoInfo}
  `;
  window.open(`https://wa.me/5584996106961?text=${encodeURIComponent(message)}`);
}
