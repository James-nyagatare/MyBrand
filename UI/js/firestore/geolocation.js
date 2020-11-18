if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
function showPosition(position) {
  firebase.firestore().collection("locations")
  .add({ longitude: position.coords.longitude, latitude: position.coords.latitude })
  .catch((error)=>{
      console.log(error);
  })
}