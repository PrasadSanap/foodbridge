const translations = {
  en: { welcome: "Welcome to FoodBridge" },
  hi: { welcome: "फूडब्रिज में आपका स्वागत है" },
  mr: { welcome: "फूडब्रिजमध्ये आपले स्वागत आहे" }
};

document.getElementById('languageSwitcher').addEventListener('change', (e) => {
  const lang = e.target.value;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = translations[lang][key];
  });
});