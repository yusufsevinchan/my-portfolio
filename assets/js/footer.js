document.addEventListener("DOMContentLoaded", function () {
  // Fetch footer.html and insert it into the page
  fetch("../footer/footer.html")
    .then((response) => response.text())
    .then((html) => {
      const footer = document.createElement("footer");
      footer.innerHTML = html;
      document.body.appendChild(footer);
    })
    .catch((error) => {
      console.warn(error);
    });
});
