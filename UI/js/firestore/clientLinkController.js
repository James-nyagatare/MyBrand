const authUsersLink = document.querySelector(".logged-in");
const unauthUserLink = document.querySelector(".logged-out");
const pAuthUsersLink = document.querySelector("#logged-in");
const pUnAuthUsersLink = document.querySelector("#logged-in");
auth.onAuthStateChanged((user) => {
  if (user) {
    authUsersLink.style.display = "flex";
    pAuthUsersLink.style.display = "block";
  } else {
    unauthUserLink.style.display = "flex";
    pUnAuthUsersLink.style.display = "block";
  }
});
