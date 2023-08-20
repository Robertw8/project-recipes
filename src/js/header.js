import { listenMobileThemeSwitcher } from './dark-theme';

  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');

  const toggleMenu = () => {
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');

      
    if (isMenuOpen) {
      document.body.classList.remove('no-scroll');
    } else {
      document.body.classList.add('no-scroll');
    }
    listenMobileThemeSwitcher();
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    document.body.classList.remove('no-scroll');
  });

document.addEventListener('DOMContentLoaded', function () {
    const mobileHomeLink = document.getElementById('mobile-home-link');
    const mobileFavoritesLink = document.getElementById(
        'mobile-favorites-link'
    );

    if (location.pathname.match(/favorite/)) {
        mobileFavoritesLink.classList.add('active-page');
        mobileHomeLink.classList.remove('active-page');
        return;
    }

        mobileHomeLink.classList.add('active-page');
        mobileFavoritesLink.classList.remove('active-page');
});

document.addEventListener('DOMContentLoaded', function () {
    const homeLink = document.getElementById('home-link');
    const favoritesLink = document.getElementById(
        'favorites-link'
    );

    if (location.pathname.match(/favorite/)) {
        favoritesLink.classList.add('active-page');
        homeLink.classList.remove('active-page');
        return;
    }

        homeLink.classList.add('active-page');
        favoritesLink.classList.remove('active-page');
});