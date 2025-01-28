document.addEventListener("DOMContentLoaded", init);

async function init() {
  // Fetch footer.html and insert it into the page
  await loadFooterContent();

  // Prevent same page reload
  preventSameLinkReload();
}

async function loadFooterContent() {
  const cachedHtml = localStorage.getItem("footerHtml");
  if (cachedHtml) {
    renderFooter(cachedHtml);
  } else {
    let html = await fetchFooterContent();
    if (html) {
      localStorage.setItem("footerHtml", html);
      renderFooter(html);
    }
  }
}

function renderFooter(html) {
  const footerDiv = document.createElement("div");
  footerDiv.id = "footer-div";
  footerDiv.innerHTML = html;

  // insert the footer element as the last child of the body
  document.body.appendChild(footerDiv);
}

async function fetchFooterContent() {
  try {
    const response = await fetch("/components/footer/footer.html");
    if (!response.ok) throw new Error("Footer yüklenemedi");
    return await response.text();
  } catch (error) {
    console.error("Footer yükleme hatası:", error);
  }
}

function preventSameLinkReload() {
  const footer = document.querySelector("footer");
  footer.addEventListener("click", (event) => {
    if (
      event.target.tagName === "A" &&
      event.target.href === window.location.href
    ) {
      event.preventDefault();
    }
  });
}
