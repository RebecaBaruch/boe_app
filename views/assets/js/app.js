const menuBtn = document.querySelector(".hiddenMenuBtn");
const hiddenMenu = document.querySelector(".hiddenMenu");
const container = document.querySelector(".container");
const closeMenuBtn = document.querySelector(".closeMenuBtn");

function toggleMenu(){
    hiddenMenu.classList.toggle("showMenu");
}

if(menuBtn && closeMenuBtn && container){
    menuBtn.addEventListener("click", toggleMenu);
    closeMenuBtn.addEventListener("click", toggleMenu);
    container.addEventListener("click", () => {
        if(hiddenMenu.classList.contains("showMenu")) {
            toggleMenu()
        }
    });
}

const backBtn = document.querySelectorAll(".backBtn");

if(backBtn){
    backBtn.forEach(element => {
        element.addEventListener("click", ()=>{
            history.back();
        })
    });
}