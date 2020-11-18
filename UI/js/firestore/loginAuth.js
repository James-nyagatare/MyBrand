const auth = firebase.auth();
const adminLogin = document.querySelector("#login-form");
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("logged in .....");
    const {
      providerData: [{ providerId: provider }],
    } = user;
    provider !== "password"
      ? (location.href = "../pages/blogs.html")
      : (location.href = "./pages");
  } else {
    console.log("no user.....");
    // location.href = './admin'
  }
});
adminLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const adminEmail = adminLogin.email;
  const adminPassword = adminLogin.password;
  if (
    (checkRequired(adminEmail) || checkRequired(adminPassword)) &&
    checkEmail(adminEmail) &&
    checkPassword(adminPassword)
  ) {
    auth
      .signInWithEmailAndPassword(adminEmail.value, adminPassword.value)
      .then((cred) => {
        adminLogin.reset();
      });
  } else {
    console.log("invalid things");
  }
});

const authLogin = (client) => {
  let provider;
  if (client === "google") {
    provider = new firebase.auth.GoogleAuthProvider();
  } else if (client === "github") {
    provider = new firebase.auth.GithubAuthProvider();
  } else if (client === "facebook") {
    provider = new firebase.auth.FacebookAuthProvider();
  }
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((cred) => {
      console.log(cred);
      console.log("logged in as: ", cred.user);
    })
    .catch((err) => {
      console.log(err);
    });
};
