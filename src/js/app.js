const menuBtn = document.querySelector(".hiddenMenuBtn");
const hiddenMenu = document.querySelector(".hiddenMenu");
const container = document.querySelector(".container");
const closeMenuBtn = document.querySelector(".closeMenuBtn");

function toggleMenu(){
    hiddenMenu.classList.toggle("showMenu");
}

menuBtn.addEventListener("click", toggleMenu);
closeMenuBtn.addEventListener("click", toggleMenu);
container.addEventListener("click", () => {
    if(hiddenMenu.classList.contains("showMenu")) {
        toggleMenu()
    }
});