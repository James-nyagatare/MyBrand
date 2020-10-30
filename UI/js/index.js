//mobile navigation bar
const mobileNav = () => {
  const burger = document.querySelector(".burger");
  const sideNav = document.querySelector(".side-nav");
  const navLinks = document.querySelectorAll(".side-links li");

  const refreshAnims = (param) => {
    param.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 1s ease forwards ${index / 6}s`;
      }
    });
  };
  burger.addEventListener("click", () => {
    //Toggle Nav
    sideNav.classList.toggle("nav-active");
    refreshAnims(navLinks);

    //Toggle burger
    burger.classList.toggle("toggle");
  });
  //remove burger by clicking each single link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      sideNav.classList.toggle("nav-active");
     refreshAnims(navLinks)
      //Toggle burger
      burger.classList.toggle("toggle");
    });
  });
};

const editProfile =()=>{
  const profile = document.querySelector(".admin-pic");
  const sideEdit = document.querySelector(".edit-dp");
  profile.addEventListener('click',()=>{
    sideEdit.classList.toggle("edit-active");
  })
}
mobileNav();
editProfile();

