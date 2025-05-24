
  const hamburgerBtn = document.querySelector(".hamburger");
const menu = document.getElementById("menu");

hamburgerBtn.addEventListener("click", function () {
  const expanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
  hamburgerBtn.setAttribute("aria-expanded", !expanded); // açık → kapalı, kapalı → açık
  menu.classList.toggle("active");
});

// Tıklanınca menüyü aç/kapatır ve erişilebilirlik (aria-expanded) durumunu günceller
// Ouvre/ferme le menu au clic et met à jour l'état d'accessibilité (aria-expanded)
