const allBlogs = document.querySelector('.more-blogs');
let html = '';
db.collection('blogs').orderBy('time','desc').onSnapshot((docs)=>{
    docs.forEach((doc)=>{
        blog = doc.data();
        blog.id = doc.id;
        html += `<div class="all-blogs">
        <h1>${blog.title}</h1>
        <h4>${moment(blog.time).format(" MMMM DD, YYYY")} by Nyagatare James</h4>
        <div class="blogs-image"><img src="${blog.image}" alt=""></div>
        <div class="clamp-text">
            ${blog.content}
        </div>
        <div class="padding"><a href="./blog.html?id=${blog.id}" button>Read more </a> </div>
        <hr>
        </div>`
    })
    allBlogs.innerHTML = html;
})