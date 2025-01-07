let gameContainer;
let gameFrame;
let playButton;
let fullscreenButton;

document.addEventListener("DOMContentLoaded", function () {
  gameContainer = document.getElementById("game-container");
  gameFrame = document.getElementById("game-frame");
  playButton = document.getElementById("play-button");
  fullscreenButton = document.getElementById("fullscreen-button");

  playButton.addEventListener("click", loadGame);
  fullscreenButton.addEventListener("click", openFullscreen);
});

// Tam ekran modunu açar ve kapatır
function openFullscreen() {
  if (!document.fullscreenElement) {
    if (gameContainer.requestFullscreen) {
      gameContainer.requestFullscreen();
    } else if (gameContainer.mozRequestFullScreen) {
      // Firefox
      gameContainer.mozRequestFullScreen();
    } else if (gameContainer.webkitRequestFullscreen) {
      // Chrome, Safari, Opera
      gameContainer.webkitRequestFullscreen();
    } else if (gameContainer.msRequestFullscreen) {
      // Internet Explorer/Edge
      gameContainer.msRequestFullscreen();
    }
    fullscreenButton.innerHTML = "Tam Ekrandan Çık";
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
    fullscreenButton.innerHTML = "Tam Ekran Yap";
  }
}

// Eğer oyunu oyna butonuna tıklanırsa oyunu yükler
function loadGame() {
  // Eğer cihaz mobil ise, oyunu yükleme
  const isComputer = checkDevice();
  if (!isComputer) {
    gameContainer.innerHTML =
      "<h2>Bu oyun sadece bilgisayarlar için desteklenmektedir.</h2>";
    return;
  }
  gameFrame.src = "https://scratch.mit.edu/projects/1027995806/embed";
  gameFrame.onerror = showError;
}

// Cihazın bilgisayar olup olmadığını kontrol eder
function checkDevice() {
  const userAgent = navigator.userAgent; // Kullanıcının tarayıcı bilgisi
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  return !isMobile;
}

// Oyun yüklenirken hata oluşursa hata mesajını gösterir
function showError() {
  gameFrame.style.display = "none";
  gameContainer.innerHTML = "<h1>Oops! Something went wrong.</h1>";
}
