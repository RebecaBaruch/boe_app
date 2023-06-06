const updateForm = document.querySelector(".updateForm");

const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const idUser = localStorage.getItem("id");

fetch('http://127.0.0.1:5000/updateUser/' + idUser, {
        method: 'GET'
    })
    .then(response => response.json()) // Retorne a promessa aqui
  .then(responseData => {
    console.log(responseData);
    nome.value = responseData.name;
    email.value = responseData.email;
    password.value = responseData.password;
  })
  .catch(error => {
    console.log(error);
  });   

updateForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    fetch('http://127.0.0.1:5000/updateUser/' + idUser, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nome.value,
            email: email.value,
            password: password.value
        })  
    })
    .then(response => {
        response.json();
        console.log(response);
        
    }) 
    .catch(error => {
        console.log(error)
    });   
})