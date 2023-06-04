const idUser = localStorage.getItem('id');
const cowId = document.querySelector('.cowId');
const perGrafico = document.querySelector('.perGrafico');

const formRegister = document.getElementById('cowRegisterForm');

fetch('http://127.0.0.1:5000/signupCow/' + idUser, {
  method: 'GET'
})
.then(response => response.json())
.then(responseData => {
  console.log(responseData)
  cowId.textContent = responseData.tempIdCow;
  perGrafico.innerHTML = responseData.results + "%";
})
.catch(error => {
  console.log(error)
})

formRegister.addEventListener('submit', (e) => {
  console.log('cheguei aqui')
  e.preventDefault();

  const formData = new FormData(formRegister);

  fetch('http://127.0.0.1:5000/signupCow/' + idUser, {
    method: 'POST',
    body: formData
  })
  .then(response =>{
    response.json()
    if (response.status == 201) location.href = './cowList.html';
  })

  .then(responseData => {
    console.log(responseData)
  })
  .catch(error => {
    console.log(error)
  })
})