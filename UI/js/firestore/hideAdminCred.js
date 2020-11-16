let providerHolder;
const adminLinks = document.querySelectorAll('.admin-links');
const navUl = document.getElementsByTagName('ul')[0];
const clientLinks = document.querySelectorAll('.client-links');
const pClientLinks = document.querySelectorAll('.pclient-links');
const pAdminLinks = document.querySelectorAll('.padmin-links');
auth.onAuthStateChanged((user)=>{
    
    if(user){
        const {email, providerData:[{providerId:provider}]} = user;
        providerHolder = provider
        if(providerHolder === 'password'){
            navUl.setAttribute("id","admin-links");
            adminLinks.forEach((link)=>{
                link.style.display = "flex";
            })
            pAdminLinks.forEach((link)=>{
                link.style.display = "block";
            })
        }
    }else{
        clientLinks.forEach((link)=>{
            link.style.display = "flex";
        })
        pClientLinks.forEach((link)=>{
            link.style.display = "block";
        })
    }
})

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
