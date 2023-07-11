import "../scss/style.scss";

const menuBtn = document.getElementById("header_menuBtn");
const menuContainer = document.getElementById("menu_container");
const menuIcons = document.getElementById("menu_icons");

const handleOpenMenu = () => {
  console.log("hi");
  menuContainer.classList.toggle("active");
  menuIcons.classList.toggle("deactive");
};

menuBtn.addEventListener("click", handleOpenMenu);
