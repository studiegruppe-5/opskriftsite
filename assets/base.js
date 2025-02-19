// TIL BURGERMENU
document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const mainMenu = document.querySelector(".menu");
  const subMenu = document.querySelector(".submenu");
  const openSubmenuBtn = document.querySelector(".open-submenu");
  const backButton = document.querySelector(".back-button");

  // Burger-ikonet: Toggler visning af hovedmenu/submenu
  burger.addEventListener("click", function () {
    // Hvis en menu allerede er åben, lukkes alle og burgerikonet fjernes som kryds
    if (
      mainMenu.classList.contains("open") ||
      subMenu.classList.contains("open")
    ) {
      mainMenu.classList.remove("open");
      subMenu.classList.remove("open");
      burger.classList.remove("open");
    } else {
      // Åben hovedmenuen og forvandl burgerikonet til et kryds
      mainMenu.classList.add("open");
      burger.classList.add("open");
    }
  });

  // Åbn submenuen fra hovedmenuen
  openSubmenuBtn.addEventListener("click", function () {
    mainMenu.classList.remove("open");
    subMenu.classList.add("open");
    // Burgerikonet forbliver som kryds
  });

  // Tilbage til hovedmenuen fra submenuen
  backButton.addEventListener("click", function () {
    subMenu.classList.remove("open");
    mainMenu.classList.add("open");
    // Burgerikonet forbliver som kryds
  });
});

// TILBAGEKNAP
function goBack() {
  window.history.back();
}
