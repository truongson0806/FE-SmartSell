function suggestPhone(){

    const budget = parseInt(document.getElementById('budget').value);

    const gaming = document.getElementById('gaming').checked;

    const result = document.getElementById('result');

    if(gaming && budget > 1000){

        result.innerHTML = 'Recommended: ASUS ROG Phone';

    }else if(budget < 500){

        result.innerHTML = 'Recommended: Redmi Note Series';

    }else if(budget < 1000){

        result.innerHTML = 'Recommended: Samsung Galaxy A';

    }else{

        result.innerHTML = 'Recommended: iPhone Pro Max';
    }
}