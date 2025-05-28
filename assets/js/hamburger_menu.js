document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.querySelector('.hamburger');
  const menu         = document.getElementById('menu');

  if (!hamburgerBtn || !menu) {
    console.warn('Hamburger butonu veya menu elemanı bulunamadı.');
    return;
  }

 hamburgerBtn.addEventListener('click', () => {
  if (menu.classList.contains('active')) {
    menu.classList.remove('active');
  } else {
    menu.classList.add('active');
  }
});

});
