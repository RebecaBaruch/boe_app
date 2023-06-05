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

var selectedImage;
var editedImage;

function showImage(event) {
  var picInput = document.getElementById('picInput');
  // var input = event.currentTarget;
  var reader = new FileReader();

  function showOverlay() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';

    var img = document.getElementById('selected-image');

    reader.onload = function () {
      localStorage.setItem('imgBase64', reader.result)
      img.src = reader.result;
    }
    selectedImage = img;
  }

  showOverlay();
  reader.readAsDataURL(picInput.files[0]);
}

function clickLabel() {
  var picInput = document.getElementById('picInput');
  picInput.click();
}

var picInput = document.getElementById('picInput');
picInput.addEventListener('change', showImage);

function chooseImage() {
  // Aqui você pode enviar a imagem para a página ou realizar outras ações necessárias
  overlay.style.display = 'none';

  const imgIcon = document.getElementById('imgIcon');
  imgIcon.style.display = 'none';

  const imgRotated = document.getElementById('imgRotated');
  imgRotated.src = selectedImage.src;

}

function rotateImage() {
  var img = document.getElementById('selected-image');

  // img = localStorage.getItem('imgBase64');

  fetch('http://127.0.0.1:5000/rotateImage', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          'image': img.src
      })
  })
  .then(response => {
      console.log(response);

      return response.json()
  })
  .then(responseData => {
      img.src = responseData.imgRotacionada

      const imgRotated = document.getElementById('imgRotated');
      imgRotated.src = selectedImage.src;
  })
  .catch(error => {
      console.log(error)
  })
}