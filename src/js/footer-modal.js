
const openModalLink3 = document.getElementById('openModalLink3');
const modal3 = document.getElementById('modal3');
const closeModal = document.querySelector('.close3');

openModalLink3?.addEventListener('click', event => {
  event.preventDefault();
 
  if (!modal3.classList.contains('modal-open')) {
    modal3.classList.add('modal-open');
  } else {
    modal3.classList.remove('modal-open');
  }
});

closeModal?.addEventListener('click', () => {
  modal3.classList.remove('modal-open');
});

window.addEventListener("click", (event) => {
  if (event.target === modal3) {
    modal3.classList.remove('modal-open');
  }
});