document.addEventListener("DOMContentLoaded", init);

async function init() {
  // Fetch footer.html and insert it into the page
  await loadFooterContent();
  // Prevent same page reload
  preventSameLinkReload();
}

async function loadFooterContent() {
  await fetch("/components/footer/footer.html")
    .then((response) => response.text())
    .then((html) => {
      const footerDiv = document.createElement("div");
      footerDiv.id = "footer-div";
      footerDiv.innerHTML = html;
      // insert the footer element as the last child of the body
      document.body.appendChild(footerDiv);
    })
    .catch((error) => {
      console.warn(error);
    });
}

function preventSameLinkReload() {
  // tüm <a> etiketleri içinde <li> öğesine tıklama olayını yakala
  const anchors = document.querySelectorAll("footer a");
  anchors.forEach(function (anchor) {
    anchor.addEventListener("click", (event) =>
      anchorClickHandler(event, anchor)
    );
  });
}

function anchorClickHandler(event, anchor) {
  if (anchor.href === window.location.href) {
    event.preventDefault();
  }
}
