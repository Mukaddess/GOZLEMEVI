const form = document.querySelector(".form");
const inputs = document.querySelectorAll(".item");

// Hata mesajını sil: kullanıcı yazarken
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

// Gönderim öncesi kontrol
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

// Form gönderimi
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
        alert("Form başarıyla gönderildi!");
        form.reset();
      } else {
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    })
    .catch(error => {
      alert("Ağ hatası. Lütfen internet bağlantınızı kontrol edin.");
      console.error(error);
    });
  }
});
