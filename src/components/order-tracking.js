function trackOrder(){

    const orderId = document.getElementById('order-id').value;

    const result = document.getElementById('tracking-result');

    if(orderId === '123456'){

        result.innerHTML = `
            <h3>Status: Shipping</h3>
            <p>Your order is on delivery</p>
        `;

    }else{

        result.innerHTML = `
            <h3>Order Not Found</h3>
        `;
    }
}