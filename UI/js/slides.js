const slides = document.getElementsByClassName("project");
let slideIndex = 1;

const showSlides = (n) =>{
    let i;
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    slides[slideIndex-1].style.display = "flex";  
  }

  const plusSlides = (n) => {
    showSlides(slideIndex += n);
  }
showSlides(slideIndex);
