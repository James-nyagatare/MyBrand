    const queriesNum = document.querySelector('.queries');
    db.collection('querries').onSnapshot((docs)=>{
        let queriesCount = docs.size;
        queriesNum.innerHTML = queriesCount;
    })
