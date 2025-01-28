let navigationButton;
let navButtonBg;
let navButtonHoverBg;
const isMobileView = window.innerWidth <= 768;

document.addEventListener("DOMContentLoaded", init);

async function init() {
  await loadNavigation();

  // Aynı sayfanın tekrar yüklenmesini engelle
  preventSameLinkReload();
  // Mobil görünümde aynı sayfanın buton rengini güncelle
  updateNavButtonBgColors();
}

function updateNavButtonBgColors() {
  setTimeout(() => {
    navigationButton = document.querySelector("nav button");
    if (!navigationButton) return;

    const navigationStyle = getComputedStyle(navigationButton);
    const hoverStyle = getComputedStyle(navigationButton, ":hover");

    navButtonBg = navigationStyle.backgroundColor;
    navButtonHoverBg = hoverStyle.backgroundColor;
  }, 300);
}

async function loadNavigation() {
  let html = await fetchNavigationContent();
  const navigationDiv = document.createElement("div");
  navigationDiv.id = "navigation-div";
  if (window.location.pathname === "/index.html") {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const homeLink = tempDiv.querySelector("button[data-href='/index.html']");
    if (homeLink) {
      homeLink.remove();
      html = tempDiv.innerHTML;
    }
  }
  navigationDiv.innerHTML = html;
  const mainElement = document.querySelector("main");
  document.body.insertBefore(navigationDiv, mainElement);
}

async function fetchNavigationContent() {
  try {
    const response = await fetch("/components/navigation/navigation.html");
    if (!response.ok) throw new Error("Navigation yüklenemedi");

    return await response.text();
  } catch (error) {
    console.error("Navigation yükleme hatası:", error);
    return false;
  }
}

function preventSameLinkReload() {
  navigationButton.addEventListener("click", (e) => {
    e.preventDefault();
    const href = e.target.closest("button").dataset.href;
    if (href === window.location.href) return;
    window.location.href = href;
  });
}
