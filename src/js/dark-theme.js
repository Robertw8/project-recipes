const STORAGE_KEY = 'dark-theme';
const themeSwitcher = document.getElementById('theme-switcher');
const isEnabledDarkTheme = localStorage.getItem(STORAGE_KEY);

document.addEventListener('DOMContentLoaded', setLocalStorageTheme);

themeSwitcher.addEventListener('change', setThemeOnClick);

// Функція для встановлення теми по кліку
function setThemeOnClick(evt) {
  const isEnabledDarkTheme = evt.target.checked;

  if (isEnabledDarkTheme) {
    document.body.classList.add('dark-theme');
    localStorage.setItem(STORAGE_KEY, 'true');
  } else {
    document.body.classList.remove('dark-theme');
    localStorage.removeItem(STORAGE_KEY);
  }
}

// Функція для встановлення теми з localStorage
function setLocalStorageTheme() {
  if (isEnabledDarkTheme) {
    document.body.classList.add('dark-theme');
    themeSwitcher.querySelector('input').checked = true;
  }
}

function listenMobileThemeSwitcher() {
  const isEnabledDarkTheme = localStorage.getItem(STORAGE_KEY) === 'true';
  const mobileThemeSwitcher = document.getElementById('mob-theme-switcher');
  if (!mobileThemeSwitcher) {
    return;
  }
  if (mobileThemeSwitcher) {
    mobileThemeSwitcher.addEventListener('change', setThemeOnClick);
    mobileThemeSwitcher.querySelector('input').checked = isEnabledDarkTheme;
  }
}

export { setLocalStorageTheme, setThemeOnClick, listenMobileThemeSwitcher };
