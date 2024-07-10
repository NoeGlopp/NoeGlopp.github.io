let cart = [];
let total = 0;
let direccion = '';

// Function to add an item to the cart
function addToCart(product, price) {
    const existingItem = cart.find(item => item.product === product);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ product, price, quantity: 1 });
    }
    
    total += price;
    renderCart();
    updateCartCount();
}

// Function to remove an item from the cart
function removeFromCart(index) {
    total -= cart[index].price * cart[index].quantity;
    cart.splice(index, 1);
    renderCart();
    updateCartCount();
}

// Function to clear the cart
function clearCart() {
    cart = [];
    total = 0;
    renderCart();
    updateCartCount();
}

// Function to render the cart items
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.product} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.className = 'remove-button';
        removeButton.addEventListener('click', () => removeFromCart(index));
        
        li.appendChild(removeButton);
        cartItems.appendChild(li);
    });

    totalElement.textContent = total.toFixed(2);
}

// Function to update the cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Function to place an order
function placeOrder() {
    let message = 'Hola, me gustaría ordenar:\n\n';
    cart.forEach(item => {
        message += `${item.product} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\nTotal: $${total.toFixed(2)}`;
    
    // Check if direccion (address) is available
    if (direccion) {
        message += `\n\nDirección: ${direccion}`;
    }

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = ''; // Reemplaza con el número de teléfono real incluyendo el código de país, sin el símbolo +
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
}

// Function to toggle the cart visibility
function toggleCart() {
    const cartElement = document.querySelector('.cart');
    cartElement.style.display = cartElement.style.display === 'none' || cartElement.style.display === '' ? 'block' : 'none';
}

// Function to toggle the address field visibility
function toggleAddress(show) {
    const addressField = document.getElementById('address-field');
    if (show) {
        addressField.style.display = 'block';
    } else {
        addressField.style.display = 'none';
    }
}

// Event listener for the address form submission
document.getElementById('direccion-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the address value
    direccion = document.getElementById('direccion').value;

    if (direccion) {
        console.log('Dirección ingresada:', direccion);
        // Hide the address field after entering the address
        toggleAddress(false);
    } else {
        console.log('Por favor, ingrese una dirección.');
    }
});

// Event listener to clear the cart
document.getElementById('clear-cart').addEventListener('click', clearCart);
