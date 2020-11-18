const createForm = document.querySelector('#create-form');
const blogTitle = document.querySelector('#title');
const blogContent = document.querySelector('#content');
const blogImage = document.querySelector('#image');
createForm.addEventListener('submit',(e)=>{
    const user = auth.currentUser;
    e.preventDefault();
    if((checkRequired(blogTitle)||checkRequired(blogContent)||checkRequired(blogImage))
     && checkLength(blogTitle,7) && checkLength(blogContent,10)){
        const imageFile = blogImage.files[0];
        const storageRef = firebase.storage().ref(`blogsImage/${imageFile.name}`);
        const uploadImage = storageRef.put(imageFile);
        uploadImage.snapshot.ref.getDownloadURL().then((downloadURL)=>{
            db.collection('blogs').add({
                title: blogTitle.value,
                content: blogContent.value,
                image: downloadURL,
                likes: 0,
                views: 0,
                commentsCount: 0,
                author: user.displayName,
                time: Date.now() 
            }).then(()=>{
                createForm.reset();
                location.href = './index.html'
            })
        })
    }
})