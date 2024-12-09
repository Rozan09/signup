var uname = document.getElementById("exampleFormControlInput1")
var email = document.getElementById("exampleFormControlInput2")
var password = document.getElementById("inputPassword")
var valid = document.getElementById("valid")
var userList = []
if (localStorage.getItem("list") == null) {
    userList = []
} else {
    userList = JSON.parse(localStorage.getItem("list"))
}


function emailExist() {
    for (var i = 0; i < userList.length; i++) {
        if (userList[i].email.toLowerCase() == email.value.toLowerCase()) {
            return false
        }
    }
}

function signUp() {
    var user = {
        name: uname.value,
        email: email.value,
        password: password.value,
    }
    if (uname.value == "" || email.value == "" || password.value == ""){
        document.getElementById('valid').innerHTML = '<span class="text-danger">All inputs is required</span>'
        return false
    }
    if (userList.length == 0) {
        userList.push(user)
        localStorage.setItem("list",  JSON.stringify(userList))
        document.getElementById('valid').innerHTML = '<span class="text-success">success</span>'  
        return true
    }
    if (emailExist() == false) {
        document.getElementById('valid').innerHTML = '<span class="text-danger">email already exists</span>'    

    } else {
        userList.push(user)
        localStorage.setItem("list", JSON.stringify(userList))
        document.getElementById('valid').innerHTML = '<span class="text-success">success</span>'    
    }
}
function signin() {
    if (email.value === "" || password.value === "") {
        valid.innerHTML = '<span class="text-danger">All inputs are required</span>';
        return false;
    }
    
    var userFound = userList.find(user =>
        user.email.toLowerCase() === email.value.toLowerCase() &&
        user.password === password.value
    );

    if (userFound) {
        localStorage.setItem("currentUser", userFound.name);
        window.location.href="home.html"
        return true;
    } else {
        valid.innerHTML = '<span class="text-danger">Invalid email or password</span>';
        return false;
    }
}

var userName = localStorage.getItem("currentUser");
if (userName) {
    document.getElementById('msg').innerHTML = "Welcome " + userName
}

function logout(){
    localStorage.removeItem("currentUser");
    window.location.href="signin.html"
}