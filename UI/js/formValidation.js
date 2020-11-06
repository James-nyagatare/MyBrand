

//a function to display an error
const showError=(input,message)=>{
    const inputController = input.parentElement;
    inputController.classList ='input-field error';
    const errorMessage = inputController.querySelector('h6');
    errorMessage.innerHTML = message;
}
const removeError =(input)=>{
    const inputController = input.parentElement;
    inputController.classList ='input-field'
}

   //a function that checks the length of entered input fields.
const checkLength =(input,min)=>{
    if(input.value.trim().length < min){
        showError(input,`${input.id} should be atleast ${min} characters`);
    } else {
        removeError(input);
        return true
    }
}
    //a function to validate an email
 const checkEmail = (input)=>{
      const emailRegex =/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      const email = String(input.value).toLowerCase();
      const isValidEmail = emailRegex.test(email);
      if(!isValidEmail) {
          showError(input,'email is not valid');
      }else{
           removeError(input);
           return true;
      }
       
} 

