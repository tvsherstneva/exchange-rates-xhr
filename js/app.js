'use strict';
function handleOnload(evt) {
    evt.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:9999/api/hw13');
    xhr.onload = handleSuccess;
    xhr.onerror = handleError;
    xhr.send();
}
function handleSuccess(evt) {
    if (evt.target.status !== 200) {
        //TODO: handle error
        return;
    }
    const data = JSON.parse(evt.target.responseText);
    dateEl.textContent = data.date;
    usdBuyRateEl.textContent = data.usd.buyRate;
    eurBuyRateEl.textContent = data.eur.buyRate;
    usdSellRateEl.textContent = data.usd.sellRate;;
    eurSellRateEl.textContent = data.eur.sellRate;
}

function handleError(evt) {
    //TODO: handle error
}
document.addEventListener('DOMContentLoaded', handleOnload);
const dateEl = document.getElementById('date');
const usdBuyRateEl = document.getElementById('usd-buy-rate');
const eurBuyRateEl = document.getElementById('eur-buy-rate');
const usdSellRateEl = document.getElementById('usd-sell-rate');
const eurSellRateEl = document.getElementById('eur-sell-rate');




