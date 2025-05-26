document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");
  const statusDiv = document.getElementById("form-status");
  const name = form.querySelector("#name");
  const lastname = form.querySelector("#lastname");
  const number = form.querySelector("#number");
  const email = form.querySelector("#email");
  const message = form.querySelector("#message");
  const rgpd = form.querySelector('input[name="RGPD"]');

  // --- E-posta: Gerçek zamanlı validasyon ve tooltip ---
  email.addEventListener("input", validateEmailField);
  email.addEventListener("blur", validateEmailField);

  function validateEmailField() {
    const value = email.value.trim();
    let messageText = "";
    if (value === "") {
      messageText = ""; // zorunlu değil, hata gösterme
    } else if (!value.includes("@") && !value.includes(".")) {
      messageText = "L'adresse e-mail doit contenir '@' et un point ('.').";
    } else if (!value.includes("@")) {
      messageText = "L'adresse e-mail doit contenir un '@'.";
    } else if (!value.includes(".")) {
      messageText = "L'adresse e-mail doit contenir un point ('.').";
    } else if (value.startsWith("@") || value.endsWith("@")) {
      messageText = "L'adresse e-mail ne peut pas commencer ni finir par '@'.";
    } else if (value.startsWith(".") || value.endsWith(".")) {
      messageText =
        "L'adresse e-mail ne peut pas commencer ni finir par un point.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      messageText =
        "Format d'adresse e-mail non valide. Exemple : nom@domaine.com";
    } else if (value.length > 100) {
      messageText = "L'adresse e-mail ne doit pas dépasser 100 caractères.";
    } else {
      messageText = "";
    }

    const err = email.nextElementSibling;
    if (messageText) {
      email.classList.add("error");
      email.setAttribute("aria-invalid", "true");
      email.setAttribute("title", messageText); // Tooltip
      if (err) {
        err.textContent = messageText;
        err.style.display = "block";
      }
    } else {
      email.classList.remove("error");
      email.removeAttribute("aria-invalid");
      email.removeAttribute("title");
      if (err) {
        err.textContent = "";
        err.style.display = "none";
      }
    }
  }

  // --- Form Submit Validasyonu ---
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    // Tüm hataları temizle
    let all = form.querySelectorAll(".item, input[name='RGPD']");
    for (let j = 0; j < all.length; j++) {
      all[j].classList.remove("error");
      all[j].removeAttribute("aria-invalid");
      let err = all[j].nextElementSibling;
      if (err) err.style.display = "none";
    }
    if (statusDiv) statusDiv.textContent = "";

    // Ad kontrol
    if (
      !name.value
        .trim()
        .match(/^[A-Za-zÇçĞğİıÖöŞşÜüÉéÈèÀàÂâÎîÔôÛûÊêËëÄäÖöÜüŸÿÑñ'\-\s]{2,30}$/)
    ) {
      name.classList.add("error");
      name.setAttribute("aria-invalid", "true");
      let err = name.nextElementSibling;
      if (err) {
        err.textContent =
          "Veuillez saisir uniquement des lettres (2-30 caractères).";
        err.style.display = "block";
      }
      valid = false;
    }
    // Soyad kontrol
    if (
      !lastname.value
        .trim()
        .match(/^[A-Za-zÇçĞğİıÖöŞşÜüÉéÈèÀàÂâÎîÔôÛûÊêËëÄäÖöÜüŸÿÑñ'\-\s]{2,30}$/)
    ) {
      lastname.classList.add("error");
      lastname.setAttribute("aria-invalid", "true");
      let err = lastname.nextElementSibling;
      if (err) {
        err.textContent =
          "Veuillez saisir uniquement des lettres (2-30 caractères).";
        err.style.display = "block";
      }
      valid = false;
    }
    // Telefon kontrol
    if (
      !number.value.trim().match(/^0[1-9][0-9]{8}$|^(\+33|0033)[1-9][0-9]{8}$/)
    ) {
      number.classList.add("error");
      number.setAttribute("aria-invalid", "true");
      let err = number.nextElementSibling;
      if (err) {
        err.textContent =
          "Veuillez saisir un numéro de téléphone français valide.";
        err.style.display = "block";
      }
      valid = false;
    }

    // E-posta kontrol (isteğe bağlı, varsa kontrol)
    if (email.value.trim()) {
      validateEmailField();
      if (email.classList.contains("error")) {
        valid = false;
      }
    }

    // Mesaj kontrol
    if (message.value.trim().length < 5 || message.value.trim().length > 500) {
      message.classList.add("error");
      message.setAttribute("aria-invalid", "true");
      let err = message.nextElementSibling;
      if (err) {
        err.textContent =
          "Votre message doit comporter entre 5 et 500 caractères.";
        err.style.display = "block";
      }
      valid = false;
    }

    // RGPD kontrol - SADECE TITLE!
    if (!rgpd.checked) {
      rgpd.classList.add("error");
      rgpd.setAttribute("aria-invalid", "true");
      rgpd.setAttribute("title", "L'acceptation RGPD est obligatoire."); // Tooltip!
      // Eğer kutunun altında hata mesajı da görmek istemiyorsan, aşağıdakini SİL veya yoruma al:
      // let err = rgpd.parentElement.nextElementSibling;
      // if (err) { err.textContent = "L'acceptation RGPD est obligatoire."; err.style.display = "block"; }
      valid = false;
    } else {
      rgpd.classList.remove("error");
      rgpd.removeAttribute("aria-invalid");
      rgpd.removeAttribute("title"); // Tooltip kaldır
      // let err = rgpd.parentElement.nextElementSibling;
      // if (err) { err.textContent = ""; err.style.display = "none"; }
    }

    if (!valid) return; // ---- Hatalıysa gönderme!

    // Gönderim
    statusDiv.textContent = "Envoi en cours...";
    const formData = new FormData(form);
    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          alert("Votre message a bien été envoyé ! Merci.");
          statusDiv.textContent = ""; // Kısa başarı mesajı da eklenebilir
          form.reset();
        } else {
          statusDiv.textContent =
            "Une erreur s'est produite. Veuillez réessayer.";
        }
      })
      .catch(() => {
        statusDiv.textContent =
          "Une erreur s'est produite. Veuillez réessayer.";
      });
  });
});
