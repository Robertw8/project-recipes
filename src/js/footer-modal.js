const openModalLink = document.getElementById("openModalLink");
const modal = document.getElementById("modal-footer");
const closeModal = document.querySelector(".close");

openModalLink.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем переход по ссылке
    modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});