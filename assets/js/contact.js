const form = document.querySelector(".form");
const inputs = document.querySelectorAll(".item");

// Efface les erreurs quand l'utilisateur tape
inputs.forEach(function(input) {
  input.addEventListener("keyup", function() {
    const errorText = input.nextElementSibling;
    if (input.value.trim() !== "") {
      input.classList.remove("error");
      if (errorText && errorText.classList.contains("error-txt")) {
        errorText.style.display = "none";
      }
    }
  });
});

// Vérifie les champs avant d'envoyer
function checkInputs() {
  let formIsValid = true;

  inputs.forEach(function(input) {
    const errorText = input.nextElementSibling;

    if (input.value.trim() === "") {
      input.classList.add("error");
      if (errorText && errorText.classList.contains("error-txt")) {
        errorText.style.display = "block";
      }
      formIsValid = false;
    } else {
      input.classList.remove("error");
      if (errorText && errorText.classList.contains("error-txt")) {
        errorText.style.display = "none";
      }
    }
  });

  return formIsValid;
}

// Soumission du formulaire
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isValid = checkInputs();

  if (isValid) {
    const formData = new FormData(form);

    fetch("https://formspree.io/f/xanoaavk", {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        alert("Formulaire envoyé avec succès !");
        form.reset();
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    })
    .catch(error => {
      alert("Erreur réseau. Vérifiez votre connexion Internet.");
      console.error(error);
    });
  }
});

 