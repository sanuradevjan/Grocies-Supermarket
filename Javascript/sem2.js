// Get elements
const form = document.getElementById('orderForm');
const cartTableBody = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
const totalPriceElement = document.getElementById('totalPrice');

// Event listeners
document.getElementById('Cart1').addEventListener('click', updateCart);
document.getElementById('Cart2').addEventListener('click', updateCart);
document.getElementById('Cart3').addEventListener('click', updateCart);
document.getElementById('Cart4').addEventListener('click', updateCart);
document.getElementById('Cart5').addEventListener('click', updateCart);
document.getElementById('buyNow').addEventListener('click', buyNow);
document.getElementById('addToFavourites').addEventListener('click', addToFavourites);
document.getElementById('applyFavourites').addEventListener('click', applyFavourites);

// Get elements
const orderTableBody = document.getElementById('orderTable').getElementsByTagName('tbody')[0];

// Populate order table with cart details from localStorage
function populateOrderTable() {
    const cartDetails = JSON.parse(localStorage.getItem('cartDetails'));
    if (cartDetails) {
        cartDetails.forEach(item => {
            const row = orderTableBody.insertRow();
            row.insertCell(0).textContent = item.itemName;
            row.insertCell(1).textContent = item.itemQuantity;
            row.insertCell(2).textContent = item.itemPrice;
        });
    }
}

// Call populateOrderTable on page load
document.addEventListener('DOMContentLoaded', populateOrderTable);

// Functions
function updateCart() {
    let totalPrice = 0;
    cartTableBody.innerHTML = '';

    Array.from(form.elements).forEach(element => {
        if (element.type === 'number' && element.value > 0) {
            const price = element.dataset.price * element.value;
            totalPrice += price;

            const row = cartTableBody.insertRow();
            row.insertCell(0).textContent = element.name;
            row.insertCell(1).textContent = element.value;
            row.insertCell(2).textContent = `RS. ${price.toFixed(2)}`;
            const removeCell = row.insertCell(3);
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-btn');
            removeButton.addEventListener('click', () => {
                row.remove();
                updateTotalPrice();
            });
            removeCell.appendChild(removeButton);
        }
    });

    totalPriceElement.textContent = `RS. ${totalPrice.toFixed(2)}`;
}

function updateTotalPrice() {
    let totalPrice = 0;
    Array.from(cartTableBody.rows).forEach(row => {
        const priceCell = row.cells[2];
        const price = parseFloat(priceCell.textContent.replace('RS. ', '')) || 0;
        totalPrice += price;
    });
    totalPriceElement.textContent = `RS. ${totalPrice.toFixed(2)}`;
}

function buyNow() {
    const cartDetails = [];

    Array.from(cartTableBody.rows).forEach(row => {
        const itemName = row.cells[0].textContent;
        const itemQuantity = row.cells[1].textContent;
        const itemPrice = row.cells[2].textContent;
        cartDetails.push({ itemName, itemQuantity, itemPrice });
    });

    localStorage.setItem('cartDetails', JSON.stringify(cartDetails));
    window.location.href = 'Payment.html';
}

function addToFavourites() {
    const favourites = {};
    Array.from(form.elements).forEach(element => {
        if (element.type === 'number' && element.value > 0) {
            favourites[element.name] = element.value;
        }
    });
    localStorage.setItem('favourites', JSON.stringify(favourites));
    alert('Order added to favourites!');
}

function applyFavourites() {
    const favourites = JSON.parse(localStorage.getItem('favourites'));
    if (favourites) {
        Array.from(form.elements).forEach(element => {
            if (element.name in favourites) {
                element.value = favourites[element.name];
            }
        });
        updateCart(); // Update cart with favourites
    }
}

/*Payment*/
//Pop up
function placeOrder() {
    // Validate form fields
    if (validateForm()) {
        // Generate random date
        const today = new Date();
        const randomHour = Math.floor(Math.random() * 24); // Random hour (0-23)
        const randomMinute = Math.floor(Math.random() * 60); // Random minute (0-59)
        const deliveryDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), randomHour, randomMinute);
        document.getElementById('deliveryDate').textContent = deliveryDate.toLocaleDateString();
        // Show the popup
        document.getElementById('orderConfirmation').style.display = 'block';
    } else {
        alert('Please fill out all required fields.');
    }
}

function validateForm() {
    let isValid = true;
    const formElements = document.getElementById('orderForm').elements;
    for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].required && !formElements[i].value) {
            isValid = false;
            break;
        }
    }
    return isValid;
}

function closePopup() {
    document.getElementById('orderConfirmation').style.display = 'none';
    window.location.href = 'index.html';
}
