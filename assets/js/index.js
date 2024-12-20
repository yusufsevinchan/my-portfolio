// Tam ekran modunu açar ve kapatır 
function openFullscreen() {
  const gameFrame = document.getElementById("game-container");
  if (!document.fullscreenElement) {
    if (gameFrame.requestFullscreen) {
      gameFrame.requestFullscreen();
    } else if (gameFrame.mozRequestFullScreen) { // Firefox
      gameFrame.mozRequestFullScreen();
    } else if (gameFrame.webkitRequestFullscreen) { // Chrome, Safari, Opera
      gameFrame.webkitRequestFullscreen();
    } else if (gameFrame.msRequestFullscreen) { // Internet Explorer/Edge
      gameFrame.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

// Oyun yüklendikten sonra yüklenme ekranını gizler
function hideLoader() {
  const loader = document.getElementById("game-loader");
  loader.style.display = "none";
}

// Oyun yüklenirken hata oluşursa hata mesajını gösterir
function showError() {
  const gameFrame = document.getElementById("game-frame");
  gameFrame.style.display = "none";
  const loader = document.getElementById("game-loader");
  loader.innerHTML = "<p>Oyun Yüklenirken Hata Oluştu!</p>";
}
