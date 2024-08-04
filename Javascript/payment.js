// Populate order table with cart details from localStorage
function populateOrderTable() {
    const orderTableBody = document.getElementById('orderTable2').getElementsByTagName('tbody')[0];
    const totalPriceElement = document.getElementById('totalPrice');
    const cartDetails = JSON.parse(localStorage.getItem('cartDetails'));

    if (cartDetails) {
        let totalPrice = 0;

        cartDetails.forEach(item => {
            const row = orderTableBody.insertRow();
            row.insertCell(0).textContent = item.itemName;
            row.insertCell(1).textContent = item.itemQuantity;
            row.insertCell(2).textContent = item.itemPrice;

            const price = parseFloat(item.itemPrice.replace('RS. ', ''));
            totalPrice += price;
        });

        totalPriceElement.textContent = `RS. ${totalPrice.toFixed(2)}`;
    }
}

// Call populateOrderTable on page load
document.addEventListener('DOMContentLoaded', populateOrderTable);
