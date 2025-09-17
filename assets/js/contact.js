let locationIframe, likeCheckboxes, dislikeCheckboxes;
let range, rangeValue;
let isAlerted = localStorage.getItem("isAlerted") || false;
document.addEventListener("DOMContentLoaded", init);

function init() {
  handleCheckboxInteraction();
  updateRangeElement();
  checkAlert();
}

// Checkboxlar arasında etkileşim sağlamak için
function handleCheckboxInteraction() {
  locationIframe = document.getElementById("location-iframe");
  if (locationIframe) {
    locationIframe.src =
      "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJZfgZpQBZtRQRFZJtOL9blag&key=AIzaSyDPz5n2YW41nc-N36s2eJ8Rf5vobe0OdIo";
  }
  // Get the all checkboxes
  likeCheckboxes = document.querySelectorAll(
    '#like-checkboxes input[type="checkbox"]'
  );
  dislikeCheckboxes = document.querySelectorAll(
    '#dislike-checkboxes input[type="checkbox"]'
  );

  // Add event listener to each checkbox
  likeCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange);
  });

  dislikeCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange);
  });
}

function handleCheckboxChange(event) {
  const checkbox = event.target;
  
  // Eğer checkbox işaretli değilse, bir şey yapmaya gerek yok
  if (!checkbox.checked) {
    return;
  }

  // Bu bir 'like' mı yoksa 'dislike' checkbox'ı mı kontrol et
  const isLikeCheckbox = !checkbox.id.includes("dislike");
  
  // Karşıt checkbox tipini al
  const oppositeCheckboxType = isLikeCheckbox ? "dislike" : "like";
  
  // Eşleşen karşıt checkbox ID'sini bul
  const currentId = checkbox.id;
  const oppositeId = currentId.replace(
    isLikeCheckbox ? "like" : "dislike",
    oppositeCheckboxType
  );

  // Karşıt checkbox'ı bul ve işaretliyse işaretini kaldır
  const oppositeCheckbox = document.getElementById(oppositeId);
  if (oppositeCheckbox && oppositeCheckbox.checked) {
    oppositeCheckbox.checked = false;
  }
}

// Range elementi değerini güncellemek için
function updateRangeElement() {
  range = document.getElementById("range");
  rangeValue = document.getElementById("rangeValue");

  // Başlangıçta ve her değişiklikte güncelle
  updateRangeValue();
  range.addEventListener("input", updateRangeValue);
}

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

// Sayfa yüklendiğinde bir kez çalışacak
function checkAlert() {
  if (!isAlerted) {
    alert(
      "Herhangi bir düşüncen veya önerin mi var? Formu doldurarak bana gerçekten iletebilirsin."
    );
    localStorage.setItem("isAlerted", true);
  }
}
