const circle = document.querySelector('.circle');

function expandCircle() {
    circle.style.width = '0px';
    circle.style.height = '0px';
}
  
setTimeout(expandCircle, 1000);