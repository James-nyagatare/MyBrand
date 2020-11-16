
const editProfileForm = document.querySelector('#edit-profile');
const displayPhotoField = document.querySelector('.ppicture');
const displayNameField = document.querySelector('.pname');
const previewImage = document.querySelector('.profile-picture');
let image;
let file;
auth.onAuthStateChanged((user)=>{
    console.log(user)
    previewImage.querySelector('img').src = user.photoURL;
    console.log(previewImage);
    displayNameField.value = user.displayName;
})
displayPhotoField.addEventListener('change',()=>{
    previewImage.innerHTML="";
    file = displayPhotoField.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = ()=>{
            const preview = document.createElement('img');
            preview.setAttribute("src", reader.result);
            return previewImage.appendChild(preview);
        }
        reader.readAsDataURL(file);
    }
})
editProfileForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    image = displayPhotoField.files[0];
    if(image) return updateWithImage(image);
    return updateWithNoImage();
})

const updateWithNoImage = ()=>{
  const admin = firebase.auth().currentUser;
  admin.updateProfile({
      displayName: displayNameField.value.trim(),
  }).then(()=>{
    editProfileForm.reset();
    redirectTo('/admin/pages')
  })
}
const updateWithImage = (image) =>{
    const admin = firebase.auth().currentUser;
    const storageRef = firebase.storage().ref(`profileImage/${image.name}`);
    const uploadImage = storageRef.put(image);
    uploadImage.snapshot.ref.getDownloadURL().then((downloadURL)=>{
        admin.updateProfile({
            displayName: displayNameField.value.trim(),
            photoURL : downloadURL 
        }).then(()=>{
            editProfileForm.reset();
            redirectTo('/admin/pages')
            console.log('updated....')
        })
     })
}

