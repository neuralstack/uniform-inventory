// Initialize Firebase
var config = {
    apiKey: "AIzaSyA6MZB_05f3iHzNWU9TLBnh4ImCV8l9QKU",
    authDomain: "productionmodule.firebaseapp.com",
    databaseURL: "https://productionmodule.firebaseio.com",
    projectId: "productionmodule",
    storageBucket: "",
    messagingSenderId: "682109476740"
};
firebase.initializeApp(config);

// delivery note

var rootref = firebase.database().ref().child("panel/production");
rootref.on("child_added", snap => {

    //var address= snap.child("address").val();
    var keys = snap.key;
    var names = snap.child("name").val();
    var comi = snap.child("comid").val();
    var deli = snap.child("delivery").val();
    var cut = snap.child("cutting").val();
    var stit = snap.child("stitching").val();
    if (deli == "0") { var cccut = "In Progress" }
    if (cut == "1" && deli == "0" && stit == "1") {

        $("#para").append(`<tr><td>` + names + `</td><td>` + comi + `</td><td>` + cccut + `</td><td><button onclick='delnode("${keys}");'>Completed</button></td></tr>`);
    }
});


function delnode(keys){
    var txt = " ";
    	 if(confirm("Are You Sure You want to submit this data?")){
        firebase.database().ref().child('/panel/production/' + keys + '/delivery')
        .remove();
alert("Order Completed")
          window.location.reload();
         }
         else{
             
         }
         document.getElementById("demo").innerHTML = txt;
            
    	}



// delivery note end