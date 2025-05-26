document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.querySelector('.hamburger');
  const menu         = document.getElementById('menu');

  if (!hamburgerBtn || !menu) {
    console.warn('Hamburger butonu veya menu elemanı bulunamadı.');
    return;
  }

  hamburgerBtn.addEventListener('click', () => {
    const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    hamburgerBtn.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('active');
  });
});
