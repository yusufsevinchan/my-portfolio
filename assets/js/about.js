document.addEventListener("DOMContentLoaded", () => {
  // Hide profile photo when scrolled down on mobile devices
  hideProfileOnScroll();
});

function hideProfileOnScroll() {
  const profile = document.querySelector(".profile");

  // If profile photo exists and the device is mobile
  if (profile && window.innerWidth <= 768) {
    // Add event listener to scroll event
    window.addEventListener("scroll", () => {
      // Get the distance from the top of the page
      const distanceFromTop = window.scrollY;

      // Hide the profile photo when scrolled down
      if (distanceFromTop > 50) {
        // Change 100 based on your needs
        profile.style.opacity = 0; // Hide
      } else {
        profile.style.opacity = 1;
      }
    });
  }
}
