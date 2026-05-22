const compareList = [];

function addToCompare(phoneName,ram,camera,battery){

    if(compareList.length >= 2){
        alert('Only compare 2 phones');
        return;
    }

    compareList.push({
        phoneName,
        ram,
        camera,
        battery
    });

    renderCompare();
}

function renderCompare(){

    const compareBox = document.getElementById('compare-box');

    compareBox.innerHTML = '';

    compareList.forEach(phone => {

        compareBox.innerHTML += `
            <div class="compare-card">
                <h2>${phone.phoneName}</h2>
                <p>RAM: ${phone.ram}</p>
                <p>Camera: ${phone.camera}</p>
                <p>Battery: ${phone.battery}</p>
            </div>
        `;
    });
}