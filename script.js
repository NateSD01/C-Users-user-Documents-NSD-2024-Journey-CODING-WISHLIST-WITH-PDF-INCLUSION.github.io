let items = [];
let total = 0;
let maxBudget = 0;

function setMaxBudget() {
    const inputMaxBudget = parseFloat(document.getElementById('maxBudget').value);
    if (!isNaN(inputMaxBudget) && inputMaxBudget > 0) {
        maxBudget = inputMaxBudget;
        document.getElementById('remainingFunds').textContent = `Remaining Budget: R${maxBudget.toFixed(2)}`;
        document.getElementById('maxBudgetDisplay').style.display = 'block';
        document.getElementById('maxBudgetValue').textContent = `R${maxBudget.toFixed(2)}`;
        document.getElementById('maxBudget').disabled = true;
        alert(`Max budget set to R${maxBudget.toFixed(2)}`);
    } else {
        alert('Please enter a valid maximum budget amount.');
    }
}

function addItem() {
    const itemName = document.getElementById('itemName').value.trim();
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);

    if (itemName && !isNaN(itemPrice)) {
        if (total + itemPrice > maxBudget) {
            alert('Adding this item would exceed your maximum budget.');
            return;
        }

        items.push({ name: itemName, price: itemPrice });
        total += itemPrice;

        const itemList = document.getElementById('itemList');
        const listItem = document.createElement('tr');
        listItem.innerHTML = `<td>${itemName}</td><td>R${itemPrice.toFixed(2)}</td>`;
        itemList.appendChild(listItem);

        document.getElementById('totalAmount').textContent = `R${total.toFixed(2)}`;
        document.getElementById('remainingFunds').textContent = `Remaining Budget: R${(maxBudget - total).toFixed(2)}`;

        document.getElementById('wishlistForm').reset();
    } else {
        alert('Please enter both a valid item name and price.');
    }
}

function generatePDF() {
    const element = document.getElementById('tableContainer');
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    const formattedTime = date.toLocaleTimeString('en-GB');

    const headerContent = `<h2>Wishlist</h2>
                           <p>Date: ${formattedDate}</p>
                           <p>Time: ${formattedTime}</p>`;
    
    const pdfContent = document.createElement('div');
    pdfContent.innerHTML = headerContent + element.innerHTML;

    const totalElement = pdfContent.querySelector('#totalAmount');
    const remainingElement = pdfContent.querySelector('#remainingFunds');
    
    if (totalElement) {
        totalElement.classList.add('red-text');
    }
    
    if (remainingElement) {
        remainingElement.classList.add('red-text');
    }

    const optionsPDF = {
        margin:       1,
        filename:     'wishlist.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().from(pdfContent).set(optionsPDF).save();
}
