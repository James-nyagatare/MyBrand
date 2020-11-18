const aPicture = document.querySelector('.admin-pic');
auth.onAuthStateChanged((user)=>{
    aPicture.querySelector('img').src = user.photoURL;
})