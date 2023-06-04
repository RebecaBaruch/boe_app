const idUser = localStorage.getItem('id');

const btnPositive = document.getElementById("positiveListBtn");
const btnListAll = document.getElementById("allListBtn");

const listContainer = document.querySelector(".listContainer");

btnPositive.addEventListener('click', () => {
  console.log('Positivos');

  fetch('http://127.0.0.1:5000/listarPositivos/' + idUser, {
    method: 'GET'
  })
  .then(response => {
    console.log(response);

    return response.json()
  })
  .then(responseData => {
    console.log(responseData)
    // Para pegar apenas os bois que deram positivo, tem que verificar se histórico é diferente de nulo
  })
  .catch(error => {
    console.log(error)
  })
})

btnListAll.addEventListener('click', () => {
  console.log('Todos');
  fetch('http://127.0.0.1:5000/listarGados/' + idUser, {
    method: 'GET'
  })
  .then(response => {
    response.json();
    console.log(response)
  })
  .then(responseData => {
    console.log(responseData)
  })
  .catch(error => {
    console.log(error)
  })
})