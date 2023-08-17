const STORAGE_KEY = 'dark-theme';
const themeSwitcher = document.getElementById('theme-switcher');
const isEnabledDarkTheme = localStorage.getItem(STORAGE_KEY) === 'true';

setLocalStorageTheme();

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

export { setLocalStorageTheme, setThemeOnClick };
