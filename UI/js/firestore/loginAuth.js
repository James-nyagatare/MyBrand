const auth = firebase.auth();
const adminLogin = document.querySelector("#login-form");
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("logged in .....");
    const {
      providerData: [{ providerId: provider }],
    } = user;
    provider !== "password"
      ? (location.href = "./admin")
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
  const providers = {
    google: "GoogleAuthProvider",
    github: "GithubAuthProvider",
    facebook: "FacebookAuthProvider",
  };
  const provider = new firebase.auth[providers[client]]();
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
