const idUser = localStorage.getItem('id')

fetch('http://127.0.0.1:5000/menu/' + idUser, {
  method: 'GET'
})
.then(response => {
  return response.json()
})
.then(responseData => {
  console.log(responseData);
})
.catch(error => {
  console.log(error);
})