document.addEventListener("DOMContentLoaded", function () {
  const loadMapBtn = document.getElementById("load-map");

  if (loadMapBtn) {
    loadMapBtn.addEventListener("click", function () {
      const iframe = document.createElement("iframe");

      iframe.src =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8740.928491389477!2d7.741394977450958!3d48.55532422198517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4796c99945584c2d%3A0xafca96a9c756006!2sCCI%20Campus%20Alsace%20-%20Site%20de%20Strasbourg!5e1!3m2!1sfr!2sfr!4v1751920666729!5m2!1sfr!2sfr"; // senin orijinal harita linkin
      iframe.width = "600";
      iframe.height = "450";
      iframe.style.border = "0";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.title = "Carte de localisation du restaurant Gözlemevi";

      const section = document.getElementById("map-section");
      section.innerHTML = ""; // Butonu temizle ve html içeriğini sıfırla
      section.appendChild(iframe); // Haritayı ekle
    });
  }
})
  
  
  