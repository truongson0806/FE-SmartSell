const stockElement = document.getElementById('stock');

let stock = 15;

function buyNow(){

    if(stock > 0){

        stock--;

        stockElement.innerHTML = `Only ${stock} products left`;

    }else{

        stockElement.innerHTML = 'Out Of Stock';
    }
}

setInterval(() => {

    const randomSold = Math.floor(Math.random() * 2);

    if(stock > 0){

        stock -= randomSold;

        stockElement.innerHTML = `Only ${stock} products left`;
    }

},5000);