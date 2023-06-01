const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passConfirm = document.querySelector("#passwordConfirm");

const formComponents = [nome, email, password, passConfirm];

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
      .then(response => {
        response.json();
        console.log(response.status);
        if(response.status === 200 && passConfirm.value === password.value){

          console.log(response.status);

          formComponents.forEach(el =>{
              if(200) el.classList.toggle("success");
            });

          setTimeout(()=>{
            location.href = "./menu.html";
          }, 2000)
        }
        if(passConfirm.value !== password.value){
          passConfirm.classList.toggle("erro");
        }
        else{
          formComponents.forEach(el =>{
            if(el.value === null || el.value === "" || el.value === undefined) el.classList.toggle("secErro");

            if(response.status === 400) el.classList.toggle("secErro");
          });
        }


      })
      .then(responseData => {
        console.log(responseData);
      })
      .catch(error => {
        console.log(error)
      });
});

