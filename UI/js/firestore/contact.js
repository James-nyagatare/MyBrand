const contactForm = document.querySelector('#form-contact');
       const name = document.querySelector('#name');
       const contactEmail = document.querySelector('#email');
       const message = document.querySelector('#message');
       //contact form validation and storing
       contactForm.addEventListener('submit',(e)=>{
              e.preventDefault();
             if((checkRequired(name)|| checkRequired(contactEmail) || checkRequired(message)) 
             && checkLength(name,3) && checkEmail(contactEmail)&& checkLength(message,10)){
                  db.collection('querries').add({
                       name: name.value,
                       email: contactEmail.value,
                       message: message.value,
                  })
                contactForm.reset();
             }
       });
  