const idUser = localStorage.getItem('id');

const displayName = document.querySelector("#title-menu p");
const allCases = document.querySelector("#menu-total h1")
const positiveCases = document.querySelector("#menu-positivos h1")

fetch('http://127.0.0.1:5000/menu/' + idUser, {
  method: 'GET'
})
.then(response => {
  return response.json()
})
.then(responseData => {
  console.log(responseData);
  displayName.innerHTML = responseData.userName
  allCases.textContent = responseData.registeredCases
  positiveCases.textContent = responseData.positiveCases + "%"
})
.catch(error => {
  console.log(error);
})