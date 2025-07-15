
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.querySelector('#hamburger');
  const menu = document.getElementById('navbar_menu');

// Koruyucu koşul: Eğer hamburger butonu veya menü bulunamazsa hata vermemek için işlemi durdurur.
// Condition de protection : si le bouton hamburger ou le menu est introuvable, on arrête on arrête le script.
  if (!hamburgerBtn || !menu) {
    console.warn("Impossible de trouver le bouton hamburger ou l'élément du menu.");
    return;
  }

  //Quand on clique sur le bouton, on affiche ou on cache le menu.
  // TR : Butona tıklanınca menü açılır ya da kapanır.
  hamburgerBtn.addEventListener('click', () => {
    // On change la visibilité du menu (ajoute/enlève la classe 'active')
    // TR : Menüye 'active' sınıfı eklenir ya da kaldırılır (göster/gizle)
    menu.classList.toggle('active');

    // On met à jour l’attribut aria-expanded pour les lecteurs d’écran.
    // TR : Ekran okuyucular için aria-expanded değeri güncellenir.
    const isOpen = menu.classList.contains('active');
    hamburgerBtn.setAttribute('aria-expanded', String(!isOpen));
  });
});
