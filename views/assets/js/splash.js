const vectors = document.querySelectorAll('.vector');
let currentIndex = 0;

function showNextVector() {
  if (currentIndex < vectors.length) {
    vectors[currentIndex].style.opacity = '1'; // Mostra o vetor atual
    currentIndex++;
    setTimeout(showNextVector, 500); // Chama a função novamente após 0,5 segundo
  }
}

showNextVector(); // Inicia a animação exibindo o primeiro vetor

const circle = document.querySelector('.circle');

function expandCircle() {
  circle.style.width = '1168px';
  circle.style.height = '1168px';
}

setTimeout(expandCircle, 3300);

// Após 5 segundos (5000 milissegundos), a tela será redirecionada
setTimeout(function() {
  window.location.href = 'login.html';
}, 5000);