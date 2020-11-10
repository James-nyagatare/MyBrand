const queriesNum = document.querySelector('.queries');
const viewsNum = document.querySelector('.views')
const likesNum = document.querySelector('.blog-likes')
const commentsNum = document.querySelector('.blog-comments')
let totalViews = 0;
let totalComments = 0;
let totalLikes = 0;
db.collection('querries').onSnapshot((docs)=>{
    let queriesCount = docs.size;
    queriesNum.innerHTML = queriesCount;
})

db.collection('blogs').onSnapshot((docs)=>{
    docs.forEach(doc => {
        blog = doc.data();
    totalViews += blog.views;
    totalLikes += blog.likes;
    totalComments += blog.commentsCount;
    
    // viewsNum.innerHTML = totalViews;
    })
     viewsNum.innerHTML = totalViews;
    likesNum.innerHTML = totalLikes;
    commentsNum.innerHTML = totalComments;
})