document.addEventListener("DOMContentLoaded", init);

async function init() {
  await loadNavigation();
}

async function loadNavigation() {
  const cachedHtml = localStorage.getItem("navigationHtml");
  if (cachedHtml) {
    renderNavigation(cachedHtml);
  } else {
    let html = await fetchNavigationContent();
    if (html) {
      localStorage.setItem("navigationHtml", html);
      renderNavigation(html);
    }
  }
}

function renderNavigation(html) {
  const navigationDiv = document.createElement("div");
  navigationDiv.id = "navigation-div";

  // Remove home link if the page is equal to index.html
  if (window.location.pathname === "/index.html") {
    html = removeHomeLink(html);
  }

  navigationDiv.innerHTML = html;
  const mainElement = document.querySelector("main");
  document.body.insertBefore(navigationDiv, mainElement);

  // Prevent same page navigation
  preventSamePageNavigation();
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

function removeHomeLink(html) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // Choose the home link element
  const homeLink = tempDiv.querySelector("a[href*='index.html']");
  if (homeLink) {
    homeLink.remove();
  }
  return tempDiv.innerHTML;
}

function preventSamePageNavigation() {
  const navigation = document.getElementById("nav-menu");
  if (!navigation) return;

  navigation.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link && link.href === window.location.href) {
      event.preventDefault();
    }
  });
}
