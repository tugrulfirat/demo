document.querySelectorAll("[data-open]").forEach(button=>button.addEventListener("click",()=>document.getElementById(button.dataset.open).classList.add("open")));
document.querySelectorAll("[data-close]").forEach(button=>button.addEventListener("click",()=>document.getElementById(button.dataset.close).classList.remove("open")));
document.querySelectorAll(".modal-backdrop").forEach(modal=>modal.addEventListener("click",event=>{if(event.target===modal)modal.classList.remove("open")}));
