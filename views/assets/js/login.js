const user = document.querySelector("#email");
const passUser = document.querySelector("#password");

const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    fetch('http://127.0.0.1:5000/loginUser', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: user.value,
            password: passUser.value
        })  
    })
    .then(response => response.json())
    .then(responseData => {
        if(responseData.status===200)location.href = './menu.html';
        if(responseData.status!==200){
            user.classList.toggle('erro');
            passUser.classList.toggle('erro');
        }

        localStorage.setItem('id', responseData.userData.id)

        console.log(responseData.mensagem);
    })
    .catch(error => {
        console.log(error)
    });   
});
