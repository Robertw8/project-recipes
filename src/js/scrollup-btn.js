import debounce from 'lodash.debounce';

const scrollupBtn = document.querySelector('.scrollup-btn');

document.addEventListener('scroll', debounce(handleWindowScroll, 100));
scrollupBtn?.addEventListener('click', handleScrollupBtnClick);

function handleWindowScroll() {
  if (window.scrollY > 300) {
    scrollupBtn?.classList.remove('d-none');
  } else {
    scrollupBtn?.classList.add('d-none');
  }
}

function handleScrollupBtnClick() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
