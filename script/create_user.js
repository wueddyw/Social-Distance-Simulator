function createUser() {

    // if the user is authenticated, get this "user" object
    // create this user node(doc) in the datebase users collection
    console.log("Works")
    firebase.auth().onAuthStateChanged(function(user) {
        db.collection("users").doc(user.uid).set({
            "name":user.displayName, 
            "email":user.email,
        });
    });
}