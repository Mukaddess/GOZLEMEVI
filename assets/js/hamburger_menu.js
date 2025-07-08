
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.querySelector('.hamburger');
  const menu = document.getElementById('menu');

  if (!hamburgerBtn || !menu) {
    console.warn("Impossible de trouver le bouton hamburger ou l’élément du menu.");
    return;
  }

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = menu.classList.contains('active');

    // Basculer l’affichage du menu.Menü görünürlüğünü değiştir
    menu.classList.toggle('active');

    // Mettre à jour aria-expanded pour l’accessibilité Aria durumunu güncelle (erişilebilirlik için)
    hamburgerBtn.setAttribute('aria-expanded', String(!isOpen));
  });
});
