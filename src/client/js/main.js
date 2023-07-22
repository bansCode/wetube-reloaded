import "../scss/style.scss";

const menuBtn = document.getElementById("header_menuBtn");
const menuContainer = document.getElementById("menu_container");
const menuIcons = document.getElementById("menu_icons");
const main = document.getElementById("main");

const handleOpenMenu = () => {
  menuContainer.classList.toggle("active");
  menuIcons.classList.toggle("deactive");
  main.classList.toggle("menu-active");
};

menuBtn.addEventListener("click", handleOpenMenu);
