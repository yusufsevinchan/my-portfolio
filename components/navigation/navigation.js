document.addEventListener("DOMContentLoaded", loadNavigation);
function loadNavigation() {
  fetch("/components/navigation/navigation.html")
    .then((response) => response.text())
    .then((html) => {
      // Create a new <nav> element and insert the navigation HTML
      const navigation = document.createElement("nav");
      // if current page is home page, remove the link to the home page
      if (window.location.pathname === "/index.html") {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        const homeLink = tempDiv.querySelector('a[href*="index.html"]');
        if (homeLink) {
          homeLink.remove();
          html = tempDiv.innerHTML;
        }
      }
      navigation.innerHTML = html;
      const mainElement = document.querySelector("main");
      document.body.insertBefore(navigation, mainElement);
      preventSameLinkReload();
    })
    .catch((error) => {
      console.warn(error);
    });
}

function preventSameLinkReload() {
  // Tüm <a> etiketleri içinde <li> öğesine tıklama olayını yakala
  document.querySelectorAll("a").forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      // <a> etiketinin href değeri ile mevcut sayfanın URL'sini karşılaştır
      const currentPath = window.location.pathname;
      const anchorPath = new URL(anchor.href).pathname;
      if (currentPath === anchorPath) {
        // Eğer aynıysa, sayfa yenilenmesin
        event.preventDefault();
      }
    });
  });
}
