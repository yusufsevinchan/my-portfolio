document.addEventListener("DOMContentLoaded", function () {
  alert(
    "Herhangi bir düşüncen veya önerin mi var? Formu doldurarak bana iletebilirsin."
  );
  const locationIframe = document.getElementById("location-iframe");
  if (locationIframe) {
    locationIframe.src =
      "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJZfgZpQBZtRQRFZJtOL9blag&key=AIzaSyDPz5n2YW41nc-N36s2eJ8Rf5vobe0OdIo";
  }
  // Get the all checkboxes
  const likeCheckboxes = document.querySelectorAll(
    '#like-web-pages input[type="checkbox"]'
  );
  const dislikeCheckboxes = document.querySelectorAll(
    '#dislike-web-pages input[type="checkbox"]'
  );

  // Add event listener to each checkbox
  likeCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        const relevantCheckbox = document.getElementById(
          this.id.replace("like", "dislike")
        );
        if (relevantCheckbox.checked) {
          relevantCheckbox.checked = false;
        }
      }
    });
  });

  dislikeCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        const relevantCheckbox = document.getElementById(
          this.id.replace("dislike", "like")
        );
        if (relevantCheckbox.checked) {
          relevantCheckbox.checked = false;
        }
      }
    });
  });

  // Add event listener to the form
  const range = document.getElementById("range");
  const rangeValue = document.getElementById("rangeValue");

  function updateRangeValue() {
    // Değer ve genişliği al
    const value = range.value;
    // Range genişliği
    const rangeWidth = range.offsetWidth;
    // Thumb (yuvarlak nokta) genişliği
    const thumbWidth = 20;
    const rangeMin = parseFloat(range.min) || 0;
    const rangeMax = parseFloat(range.max) || 100;

    // Değerin yüzdesini hesapla
    const percentage = (value - rangeMin) / (rangeMax - rangeMin);

    // Değeri piksel olarak hesapla ve hizala
    const offset = percentage * (rangeWidth - thumbWidth) + thumbWidth / 2;

    // Yazıyı hizala
    rangeValue.style.left = `${offset}px`;
    rangeValue.textContent = value;
  }

  // Başlangıçta ve her değişiklikte güncelle
  updateRangeValue();
  range.addEventListener("input", updateRangeValue);
});
