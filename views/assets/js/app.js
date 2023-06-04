const menuBtn = document.querySelector(".hiddenMenuBtn");

if(menuBtn!==null){
    const hiddenMenu = document.querySelector(".hiddenMenu");
    const container = document.querySelector(".container");
    const closeMenuBtn = document.querySelector(".closeMenuBtn");

    function toggleMenu(){
        hiddenMenu.classList.toggle("showMenu");
    }

    menuBtn.addEventListener("click", toggleMenu);
    closeMenuBtn.addEventListener("click", toggleMenu);
    if(container!==null){
        container.addEventListener("click", () => {
            if(hiddenMenu.classList.contains("showMenu")) {
                toggleMenu()
            }
        });
    }
}

const backBtn = document.querySelectorAll(".backBtn");

if(backBtn!==null){
    backBtn.forEach(element => {
        element.addEventListener("click", ()=>{
            history.back();
        })
    });
}