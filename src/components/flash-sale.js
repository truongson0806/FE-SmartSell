const countdown = document.getElementById('countdown');

const endDate = new Date('2026-12-31T23:59:59').getTime();

setInterval(() => {
    const now = new Date().getTime();
    const distance = endDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdown.innerHTML = `${days}D ${hours}H ${minutes}M ${seconds}S`;

    if(distance < 0){
        countdown.innerHTML = 'FLASH SALE ENDED';
    }
},1000);