const blogsContainer = document.querySelector('.blogs-container');
let totalComments = 0;
let totalLikes = 0;
let html ='';
db.collection('blogs').orderBy('time','desc').limit(6).get().then((docs)=>{
    docs.forEach(doc => {
        const blog = doc.data();
        blog.id = doc.id;
        totalComments += blog.commentsCount;
        totalLikes += blog.likes;
        html += ` <a href="./pages/blog.html?id=${blog.id}" class="blog">
        <div class="blog-top">
            <div class="blog-image">
                <img src="${blog.image}" alt="blogImage">
            </div>
            <div class="blog-title">${blog.title}</div>
        </div>
        <hr>
        <div class="blog-bottom">
        <span>
            <i class="fa fa-heart-o"></i></i>
            ${blog.likes}
        </span>
        <span>
            <i class="fa fa-commenting-o"></i>
            ${blog.commentsCount}
        </span>
        </div>
        </a>`
    });
    blogsContainer.innerHTML = html;
})