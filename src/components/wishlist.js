let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function addWishlist(id,name,image){

    wishlist.push({
        id,
        name,
        image
    });

    localStorage.setItem('wishlist',JSON.stringify(wishlist));

    alert('Added To Wishlist');
}

function displayWishlist(){

    const container = document.getElementById('wishlist-container');

    container.innerHTML = '';

    wishlist.forEach(item => {

        container.innerHTML += `
            <div class="wishlist-item">
                <img src="${item.image}" width="120">
                <h3>${item.name}</h3>
            </div>
        `;
    });
}