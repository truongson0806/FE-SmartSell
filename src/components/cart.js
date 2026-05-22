let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id,name,price,image){

    const existing = cart.find(item => item.id === id);

    if(existing){
        existing.quantity += 1;
    }else{
        cart.push({
            id,
            name,
            price,
            image,
            quantity:1
        });
    }

    localStorage.setItem('cart',JSON.stringify(cart));

    alert('Added To Cart');
}

function displayCart(){

    const container = document.getElementById('cart-container');

    container.innerHTML = '';

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" width="120">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <p>Qty: ${item.quantity}</p>
                <button onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;
    });

    container.innerHTML += `<h2>Total: $${total}</h2>`;
}

function removeItem(id){

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem('cart',JSON.stringify(cart));

    displayCart();
}