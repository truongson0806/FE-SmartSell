function submitReview(){

    const username = document.getElementById('username').value;
    const review = document.getElementById('review').value;
    const stars = document.getElementById('stars').value;

    const reviewBox = document.getElementById('review-box');

    reviewBox.innerHTML += `
        <div class="review-card">
            <h3>${username}</h3>
            <p>${review}</p>
            <strong>${stars} Stars</strong>
        </div>
    `;

    document.getElementById('review').value = '';
}