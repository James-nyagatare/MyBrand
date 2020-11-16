const auth = firebase.auth();
window.addEventListener("DOMContentLoaded", () => {
const logoutBtn = document.querySelectorAll('.logout');
logoutBtn.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        e.preventDefault();
        auth.signOut().then(()=>{
            console.log('signed out...');
            redirectTo('/admin')
        })
    })
})
});