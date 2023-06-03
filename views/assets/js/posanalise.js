const idUser = localStorage.getItem('id');

fetch('http://127.0.0.1:5000/getResults/' + idUser, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(responseData => {
    console.log(responseData);
})
.catch(error => {
    console.log(error)
})