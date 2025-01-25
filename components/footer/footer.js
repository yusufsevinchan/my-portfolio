document.addEventListener("DOMContentLoaded", function () {
  // Fetch footer.html and insert it into the page
  fetch("/components/footer/footer.html")
    .then((response) => response.text())
    .then((html) => {
      const footer = document.createElement("footer");
      footer.innerHTML = html;
      // insert the footer element as the last child of the body
      document.body.appendChild(footer);
    })
    .catch((error) => {
      console.warn(error);
    });
});
