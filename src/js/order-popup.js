import Swal from 'sweetalert2';

const refs = {
  modalOrderNowForm: document.querySelector('.order-now-modal-form'),
  openButtonEl: document.querySelector('.header-order-btn'),
  openButtonHeroEl: document.querySelector('.hero-btn'),
  closeButtonEl: document.querySelector('.order-now-modal-close-btn'),
  backdropEl: document.querySelector('.order-now-backdrop'),
  modalEl: document.querySelector('.order-now-modal'),
};

refs.openButtonEl?.addEventListener('click', onModalOpen, { passive: true });
refs.openButtonHeroEl?.addEventListener('click', onModalOpen);
refs.closeButtonEl?.addEventListener('click', onModalRemove, { passive: true });
refs.backdropEl?.addEventListener('click', onBackdropClick, { passive: true });
refs.modalOrderNowForm?.addEventListener('submit', onSubmitForm, {
  passive: true,
});

function onModalOpen() {
  window.addEventListener('keydown', onEscKeyPress, { passive: true });
  refs.backdropEl?.classList.replace('hidden-backdrop', 'opened-backdrop');
  refs.modalEl?.classList.replace('hidden-modal', 'opened-modal');
}

function onModalRemove() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.backdropEl?.classList.replace('opened-backdrop', 'hidden-backdrop');
  refs.modalEl?.classList.replace('opened-modal', 'hidden-modal');
}

function onBackdropClick(event) {
  if (event.target === refs.backdropEl) {
    onModalRemove();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onModalRemove();
  }
}

function extractFormData(form) {
  let formData = {};

  formData.name = form.querySelector('input[name="name"]').value;
  formData.phone = form.querySelector('input[name="phone"]').value;
  formData.email = form.querySelector('input[name="email"]').value;
  formData.comment = form.querySelector('textarea[name="comment"]').value;
  if (form.querySelector('textarea[name="comment"]').value === '') {
    formData.comment = 'So delicious';
  }
  return formData;
}

function onSubmitForm(e) {
  e.preventDefault();

  const formData = extractFormData(refs.modalOrderNowForm);

  const { name, phone, email, comment } = formData;

  const options = {
    name,
    phone,
    email,
    comment,
  };

  postOrder(options)
    .then(() => {
      if (localStorage.getItem('patch-rating') !== 'error') {
        onModalRemove();
        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: 'Thank you for your order!',
            timer: 1500,
            showConfirmButton: false,
          });
        }, 500);
        refs.modalOrderNowForm.reset();
      }
      return;
    })
    .catch(error => console.log(error))
    .finally(
      setTimeout(() => {
        Loading.remove();
      }, 500)
    );
}

export { onModalOpen };
