const singleBlog = document.querySelector('.blog-content');
const commentForm = document.querySelector('#comment-form');
const commentContent = document.querySelector('.comment-content');
const comments = document.querySelector('.blog-comment')
const blogId = location.href.split('?id=')[1];
const increment = firebase.firestore.FieldValue.increment(1);
db.collection('blogs').doc(blogId).update({views:increment});
db.collection('blogs').doc(blogId).onSnapshot((doc) => {
    let html = '';
    const blog = doc.data();
    html +=`<div class="all-blogs">
    <h1 class="blog-title">${blog.title}</h1>
    <h4>${moment(blog.time).format("MMMM DD, YYYY")} by Nyagatare James</h4>
    <div class="blogs-image"><img src="${blog.image}" alt=""></div>
</div>
<div class="edit-delete">
    <span button><a href="../admin/pages/edit.html?id=${blogId}" class="edit-btn"><i class="fa fa-edit "></i></a></span>
    <span button class="btn-delete" onclick="deleteBlog()"><a href="" ><i class="fa fa-trash "></i></a></i>
</div>
<div class="lower-blog">
    <p class="blog-content">
       ${blog.content}
    </p>

    <div class="like-comment">
        <span button class='likes' onclick='addLike()'><i class="fa fa-heart-o"></i>${blog.likes}</span>
        <span button><i class="fa fa-commenting-o"></i>${blog.commentsCount}</span>
        </span>
    </div>
    <hr>
</div>`

singleBlog.innerHTML = html;
})
db.collection('blogs').doc(blogId).collection('comments').orderBy('time','desc').onSnapshot((docs)=>{
    let html = '';
    docs.forEach((doc)=>{
        const comment = doc.data();
        html +=` <div class="comment">
        <div class="profile-date">
            <div class="profile-pic"><img src="../images/blank-avatar.png" alt=""></div>
            <div class="profile-name">
                <h2>${comment.author}</h2>
                <p>${moment(comment.time).fromNow()}</p>
            </div>
        </div>
        <div class="cmnt">
            <p>${comment.comment}</p> 
        </div>
    </div>`
    })
    comments.innerHTML = html;
})
commentForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(checkLength(commentContent,2)){
        db.collection('blogs').doc(blogId).collection('comments').add({
            comment : commentContent.value,
            author: 'Anonymous',
            time: Date.now()
        }).then(()=>{
            db.collection('blogs').doc(blogId).update({commentsCount:increment})
           commentForm.reset();
        })
    }
})

const deleteBlog =()=> {
    const result = confirm("Want to delete?");
    if (result) {
      db.collection('blogs').doc(blogId).delete()
        .then(() => {
          console.log("Post deleted successfully");
          location.href = '../admin/pages/index.html'
        })
    }
}

const addLike = ()=>{
    db.collection('blogs').doc(blogId).update({likes:increment});
}

