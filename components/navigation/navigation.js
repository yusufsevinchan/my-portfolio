let navigationButton;
let navButtonBg;
let navButtonHoverBg;
let anchors;

const isMobileView = window.innerWidth <= 768;

document.addEventListener("DOMContentLoaded", init);

async function init() {
  await loadNavigation().then(() => {
    // Mobil görünümde buton arka plan rengini al
    setTimeout(() => {
      navigationButton = document.querySelector("a li");
      if (navigationButton) {
        const navigationStyle = getComputedStyle(navigationButton);
        const hoverStyle = getComputedStyle(navigationButton, ":hover");

        navButtonBg = navigationStyle.backgroundColor;
        navButtonHoverBg = hoverStyle.backgroundColor;
      }
    }, 300);

    // Aynı sayfanın tekrar yüklenmesini engelle
    preventSameLinkReload();
  });
}

async function loadNavigation() {
  try {
    const response = await fetch("/components/navigation/navigation.html");
    if (!response.ok) throw new Error("Navigation yüklenemedi");

    let html = await response.text();
    const navigation = document.createElement("nav");
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
  } catch (error) {
    console.error(error);
  }
}

function preventSameLinkReload() {
  // Tüm <a> etiketleri içinde <li> öğesine tıklama olayını yakala
  anchors = document.querySelectorAll("nav a");
  anchors.forEach(function (anchor) {
    anchor.addEventListener("click", (event) =>
      anchorClickHandler(event, anchor)
    );
  });
}

function anchorClickHandler(event, anchor) {
  // <a> etiketinin href değeri ile mevcut sayfanın URL'sini karşılaştır
  if (!anchor || anchor.href === undefined) return;

  const currentPath = window.location.pathname;
  const anchorPath = new URL(anchor.href).pathname;
  if (currentPath === anchorPath) {
    event.preventDefault();

    // Mobil görünümde buton arka planını eski haline getir
    if (isMobileView) {
      const li = anchor.children[0];
      setTimeout(() => {
        li.style.backgroundColor = navButtonBg;
      }, 500);

      // Tekrar dokunulduğunda arkaplan renk değişimini tekrarla
      anchor.addEventListener("touchstart", changeBgColor);
    }
  }
}

function changeBgColor(event) {
  const li = event.target;
  li.style.backgroundColor = navButtonHoverBg;
  setTimeout(() => {
    li.style.backgroundColor = navButtonBg;
  }, 800);
}
