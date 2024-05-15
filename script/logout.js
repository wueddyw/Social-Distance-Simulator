function logout(){
   firebase.auth().signOut().then(function() {
  console.log('Signed Out');
})
    window.location.replace("index.html");
    
}