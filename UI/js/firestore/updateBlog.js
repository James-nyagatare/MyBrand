let image;
const updateForm = document.querySelector('#update-form');
const editableTitle = document.querySelector('.title-edit');
const editableContent = document.querySelector('.content-edit');
const editableImage = document.querySelector('.edit-image');
const blogId = location.href.split('?id=')[1];
const blog = db.collection('blogs').doc(blogId);
blog.get().then((doc)=>{
        const post = doc.data();
        editableTitle.value = post.title;
        editableContent.value= post.content; 
})
const updateBlog = (title,content,image)=>{
    const blogData = {title,content,image};
    blog.update(blogData).then(()=> location.href = './index.html');
}

updateForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        image = editableImage.files[0];
        if(image){
            const storageRef = firebase.storage().ref(`blogsImage/${image.name}`);
            const uploadImage = storageRef.put(image);
            uploadImage.snapshot.ref.getDownloadURL().then((downloadURL)=>{
                if((checkRequired(editableTitle)||checkRequired(editableContent))&& checkLength(editableTitle,7)
                       && checkLength(editableContent,10)){
                return updateBlog(editableTitle.value,editableContent.value,downloadURL);
                       } 
            })}else{
                blog.get().then((doc)=>{
                    const post = doc.data();
                    if((checkRequired(editableTitle)||checkRequired(editableContent))&& checkLength(editableTitle,7)
                       && checkLength(editableContent,10)){
                return updateBlog(editableTitle.value,editableContent.value,post.image);
                       } 
            })
            }
})


