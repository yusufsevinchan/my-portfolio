document.addEventListener("DOMContentLoaded", () => {
  // Hide profile photo when scrolled down on mobile devices
  hideProfileOnScroll();
});

function hideProfileOnScroll() {
  const profile = document.querySelector(".profile");

  // If profile photo exists and the device is mobile
  if (profile && window.innerWidth <= 768) {
    window.addEventListener("scroll", () => {
      // Get the distance from the top of the page
      const distanceFromTop = window.scrollY;

      if (distanceFromTop > 50) {
        profile.style.opacity = 0;
      } else {
        profile.style.opacity = 1;
      }
    });
  }
}
