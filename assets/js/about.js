document.addEventListener("DOMContentLoaded", () => {
  // Magnetic effect on mouse move
  addMagneticEffect();
  // Rotate and fade on scroll
  addRotateScrollEffect();
});

function addMagneticEffect() {
  const profile = document.querySelector(".profile");
  
  if (profile) {
    document.addEventListener("mousemove", (e) => {
      const rect = profile.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / 10;
      const deltaY = (e.clientY - centerY) / 10;
      
      // Magnetic pull towards cursor
      profile.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
  }
}

function addRotateScrollEffect() {
  const profile = document.querySelector(".profile");
  
  if (profile) {
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY;
      
      // Rotate and scale down
      const rotation = scrolled * 0.5;
      const scale = Math.max(1 - scrolled / 800, 0.3);
      const opacity = Math.max(1 - scrolled / 400, 0);
      
      profile.style.transform = `rotate(${rotation}deg) scale(${scale})`;
      profile.style.opacity = opacity;
      profile.style.transition = "transform 0.1s ease, opacity 0.1s ease";
    });
  }
}