const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passConfirm = document.querySelector("#passwordConfirm");

const sendBtn = document.querySelector("#button-signup");
const formSignup = document.querySelector("#formSignup");

let userName = nome.value;
let userEmail = email.value;
let userPass = password.value;

formSignup.addEventListener("submit", (e) =>{
    e.preventDefault();
    // console.log(nome.value, email.value, password.value);
    fetch('http://127.0.0.1:5000/signupUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nome.value,
          email: email.value,
          password: password.value,
          confirmPassword: password.value
        })
      })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
      })
      .catch(error => {
        console.log(error)
      });
});

