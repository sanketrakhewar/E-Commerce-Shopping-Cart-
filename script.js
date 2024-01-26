// Cart data
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to the cart
function addToCart(id, product, name, price) {
  const existingItem = cartItems.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ id, name, product, price, quantity: 1 });
  }

  updateCart();
}

// Function to update the cart display
function updateCart() {
  const cartElement = document.getElementById('cart');
  cartElement.innerHTML = '';

  cartItems.forEach(item => {
    const total = item.price * item.quantity;
    const cartItemElement = document.createElement('table');
    cartItemElement.classList.add('cart-item');
    cartItemElement.innerHTML = `
    <tbody>
    <tr>
      <td><img src="./shop/${item.id}.jpg" alt="${item.name}"></td>
      <td><h4>${item.product}</h4></td>
      <td><h4>$${item.price.toFixed(2)} </h4></td>
      <td><h5>Quantity: ${item.quantity} </h5></td>
      <td><h5>Total: $${total.toFixed(2)}</h5></td>
      <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
      </tr>
      </tbody>
    `;

    const totalPriceElement = document.getElementById('total');
    totalPriceElement.innerHTML = `<strong><h4> $${calculateTotalPrice()}</h4></strong>`;

    cartElement.appendChild(cartItemElement);
  });
  // Update localStorage
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

function calculateTotalPrice() {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
}

// Function to remove items from the cart
function removeFromCart(id) {
  const itemIndex = cartItems.findIndex(item => item.id === id);
  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    updateCart();
  }
}

// Initial cart update
updateCart();
