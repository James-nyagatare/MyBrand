const queryBox= document.querySelector(".query")
    db.collection('querries').onSnapshot((docs)=>{
       let enter = "";
       docs.forEach((doc)=>{
           enter+=`
    <div class="comment">
    <div class="profile-date">
    <div class="profile-name">
        <h2>${doc.data().name}</h2>
        <p>${doc.data().email}</p>
    </div>
</div>
<div class="cmnt">
    <p>${doc.data().message}</p> 
</div>
</div>`
       })
queryBox.innerHTML = enter;
    })