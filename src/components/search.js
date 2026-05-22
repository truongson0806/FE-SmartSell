function searchProduct(){

    const keyword = document
        .getElementById('search')
        .value
        .toLowerCase();

    const products = document.querySelectorAll('.product');

    products.forEach(product => {

        const title = product
            .querySelector('h3')
            .innerText
            .toLowerCase();

        if(title.includes(keyword)){
            product.style.display = 'block';
        }else{
            product.style.display = 'none';
        }
    });
}