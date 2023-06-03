const idUser = localStorage.getItem('id');
const perGrafico = document.querySelector('.perGrafico');
const cardText = document.querySelectorAll('#text-resultado-analise div p');
const detailedCard = document.querySelectorAll('.resultTxtBox p');
const registerCow = document.querySelector('#button-cadastrar');

fetch('http://127.0.0.1:5000/getResults/' + idUser, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(responseData => {
    perGrafico.textContent = responseData.results.percentage + "%";
    cardText[0].textContent = responseData.results.details;
    cardText[1].textContent = responseData.results.level;
    detailedCard[0].innerHTML = responseData.results.nextSymptons;
    detailedCard[1].innerHTML = responseData.results.phase;
})
.catch(error => {
    console.log(error)
})

registerCow.addEventListener('click', () => {
    location.href = './cowRegister.html'
})