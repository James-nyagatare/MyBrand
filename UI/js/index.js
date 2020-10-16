//mobile navigation bar
const mobileNav =()=>{
    const burger= document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li')

    burger.addEventListener('click',()=>{
        //Toggle Nav
        nav.classList.toggle('nav-active');

        navLinks.forEach((link,index)=>{
            if (link.style.animation) {
                link.style.animation='';
              } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index/7 + 0.3}s`
              } 
        })
      
        //Toggle burger
        burger.classList.toggle('toggle');
    })
     //remove burger by clicking each single link
     navLinks.forEach((link)=>{
      link.addEventListener('click',()=>{
          nav.classList.toggle('nav-active')
          //Toggle burger
        burger.classList.toggle('toggle');
      })
   
   })
    
}

mobileNav();