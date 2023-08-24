const openModalLink3 = document.getElementById('openModalLink3');
const modal3 = document.getElementById('modal3');
const closeModal = document.querySelector('.close3');

openModalLink3?.addEventListener('click', event => {
  event.preventDefault(); // Предотвращаем переход по ссылке
  modal3.style.display = 'block';
});

closeModal?.addEventListener('click', () => {
  modal3.style.display = 'none';
});

window.addEventListener("click", (event) => {
    if (event.target === modal3) {
        modal3.style.display = "none";
    }
});
