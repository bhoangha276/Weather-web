function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");

  messageElement.textContent = message;
  messageElement.classList.remove(
    "form__message--success",
    "form__message--error"
  );
  messageElement.classList.add(`form message ${type}`);
}
// setFormMessage(loginForm, "success", " You're  logged in!");

function setInputError(inputElement, message) {
  inputElement.classList.add("form__input--error");
  inputElement.parentElement.querySelector(
    ".form__input-error-message"
  ).textContent = message;
}

function clearInputError(inputElement) {
  inputElement.classList.remove("form__input--error");
  inputElement.parentElement.querySelector(
    ".form__input-error-message"
  ).textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccount");

  document
    .querySelector("#linkCreateAccount")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("form--hidden");
      createAccountForm.classList.remove("form--hidden");
    });

  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
  });


  document.querySelectorAll(".form__input").forEach((inputElement) => {
    inputElement.addEventListener("blur", (e) => {
      if (
        e.target.id === "signupUsername" &&
        e.target.value.length > 0 &&
        e.target.value.length < 10
      ) {
        setInputError(
          inputElement,
          "Username must be at least 10 characters in length"
        );
      }
    });

    inputElement.addEventListener("input", (e) => {
      clearInputError(inputElement);
    });

    inputElement.addEventListener;
  });
  
  let button = document.getElementById("button--success");
  let password = document.getElementById("pass1");
  let confPassword = document.getElementById("confpassword");
  let passwordError = document.getElementById("password--error");
  button.addEventListener("click", (e) => {
    
    if (password.value != confPassword.value) {
      passwordError.style.display = "block";
    } else {
      passwordError.style.display = "none";
    }
  });
});
// function changeBg() {
//   const images = [
//     'url("1.jpg")',
//     'url("2.jpg")',
//     'url("3.jpg")',
//     'url("4.jpg")',
//     'url("5.jpg")',
//     'url("6.jpg")',
//   ];

//   const body = document.querySelector("body");
//   const bg = images[Math.floor(Math.random() * images.length)];
//   body.style.background = bg;
// }
// setInterval(changeBg, 3000);
//random background
// function changeBg(){
// var images = [], 
// index = 0;

// images[0] = "0.jpg";
// images[1] = "1.jpg";
// images[2] = "2.jpg";
// images[3] = "3.jpg";
// images[4] = "4.jpg";
// images[5] = "5.jpg";

// index = Math.floor(Math.random() * images.length);
// document.body.style.background ="#fff url('"+images[index]+"') no-repeat center center fixed ";
// }
// changeBg();
// setInterval(changeBg, 5000)
// storing input from register-form

console.log('haha kaka muahah')

function store() {
    const nameT = document.getElementById('signupUsername').value;
    const psT = document.getElementById('pass1').value;
    const email = document.getElementById('femail').value;
    const conf = document.getElementById('confpassword').value;

    if(nameT != ''|| psT != '') {
      {  
      localStorage.setItem('name', nameT);
      localStorage.setItem('pw', psT)
    
      Toastify({
        text: "Success",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        className: "info",
      }).showToast();
    } 
    }else{
      Toastify({
        text: "Fail To Login",
        backgroundColor: "#cc3333",
        className: "info",
      }).showToast();
    }
    
   
}
function ALAL(){
  window.location.href = "../index.html"
}

 
// check if stored data from register-form is equal to entered data in the   login-form
function check() {

    // stored data from the register-form
    var storedName = localStorage.getItem('name');
    var storedPw = localStorage.getItem('pw');
    // let userName = document.getElementById('name-user')
    // userName.innerHTML = storedName;
    
    // entered data from the login-form
    var userName = document.getElementById('name2').value;
    var userPw = document.getElementById('pass2').value;

    // check if stored data from register-form is equal to data from login form
    if(userName == storedName && userPw == storedPw) {
      // document.getElementById('name-user').innerHTML = localStorage.getItem('name');
     
      Toastify({
        text: "Success",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        className: "info",
      }).showToast();
      setTimeout(ALAL, 2000);
    }else if ( userName != storedName && userPw != storedPw){
      Toastify({
        text: "Fail To Login",
        backgroundColor: "#cc3333",
        className: "info",
      }).showToast();
    }  
    
}
chkpwd = function (validate){
  let str = document.getElementById('pass1').value;
  if(str.length < 8){
    document.getElementById('demo').innerHTML = 'Password Length Must Be 8 Char';
    document.getElementById('demo').style.color="#cc3333";
    document.getElementById('demo').style.fontSize="0.85rem";
    return("too_short");
  }else if(str.search(/[0-9]/)== -1){
    document.getElementById('demo').innerHTML = 'Atleast 1 number value  Must Be 8 enter';
    document.getElementById('demo').style.color="#cc3333";
    document.getElementById('demo').style.fontSize="0.85rem";
    return("no_number");
  }
  else if(str.search(/[a-z]/)== -1){
    document.getElementById('demo').innerHTML = 'Atleast 1 lower case  Must Be  enter';
    document.getElementById('demo').style.color="#cc3333";
    document.getElementById('demo').style.fontSize="0.85rem";
    return("no_lowercase");
  }
  else if(str.search(/[A-Z]/)== -1){
    document.getElementById('demo').innerHTML = 'Atleast 1 UperCase Must Be  enter';
    document.getElementById('demo').style.color="#cc3333";
    document.getElementById('demo').style.fontSize="0.85rem";
    return("no_upercase");
  }
  else if(str.search(/[!\@\#\$\%\^\&\(\)\_\+\.\,\;\:]/)== -1){
    document.getElementById('demo').innerHTML = 'Atleast 1 Special Character Must Be  enter';
    document.getElementById('demo').style.color="#cc3333";
    document.getElementById('demo').style.fontSize="0.85rem";
    return("no_sletter");
  }
  document.getElementById('demo').innerHTML = 'Successful';
    document.getElementById('demo').style.color="#4bb544";
    document.getElementById('demo').style.fontSize="0.85rem";
    return("ok");
}

