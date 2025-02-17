document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const submenuToggle = document.getElementById("submenu-toggle");

  menuToggle.addEventListener("change", function () {
    if (!this.checked) {
      submenuToggle.checked = false; // Lukker submenu, når hovedmenu lukkes
    }
  });
});
