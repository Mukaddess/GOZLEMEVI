 document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.form');
    const statusDiv = document.getElementById('form-status');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      statusDiv.textContent = 'Gönderiliyor...';
      const formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          alert('Mesajınız başarıyla gönderildi! Teşekkürler.');
          statusDiv.textContent = '';
          form.reset();
        } else {
          statusDiv.textContent = 'Bir hata oluştu. Lütfen tekrar deneyiniz.';
        }
      })
      .catch(() => {
        statusDiv.textContent = "Une erreur s'est produite. Veuillez réessayer.";
      });
    });


  });