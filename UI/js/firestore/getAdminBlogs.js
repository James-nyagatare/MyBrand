const posts = document.querySelector('.blogs-container');
let html ='';
db.collection('blogs').orderBy('time','desc').onSnapshot((docs)=>{
    docs.forEach((doc)=>{
        blog = doc.data();
        blog.id = doc.id;
        // totalViews += blog.views;
        // totalComments += blog.commentsCount;
        // totalLikes += blog.likes;
        html += `<a href="../../pages/blog.html?id=${blog.id}" class="blog">
        <div class="blog-top">
            <div class="blog-image">
                <img src="${blog.image}">
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
            <i class="fa fa-eye"></i>
            ${blog.views}
        </span>
        <span>
            <i class="fa fa-commenting-o"></i>
            ${blog.commentsCount}
        </span>
        </div>
        </a>`
    })
    posts.innerHTML = html;
})