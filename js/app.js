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
    //console.log(data);
    //TODO: work with data
}

function handleError(evt) {
    //TODO: handle error
}

document.addEventListener('DOMContentLoaded', handleOnload);
/*const phoneInputEl = document.getElementById('phone-input');
const phoneErrorEl = document.getElementById('phone-error');
const emailInputEl = document.getElementById('email-input');
const emailErrorEl = document.getElementById('email-error');
*/
//http://127.0.0.1:62969/


