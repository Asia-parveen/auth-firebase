import { getAuth, createUserWithEmailAndPassword } from "./firebase.js";

const auth = getAuth();

const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", () => {
    if (signupEmail.value.trim() && signupPassword.value.trim()) {
        createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                console.log(user);

                // Success message with SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Signed Up!',
                    text: 'Your account has been created successfully!',
                }).then(() => {
                   
                    window.location.href = "signin.html";
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

               
                if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Email in Use',
                        text: 'Please use a different email address.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Sign Up Failed',
                        text: errorMessage,
                    });
                }
            });
    } else {
       
        Swal.fire({
            icon: 'warning',
            title: 'Incomplete Information',
            text: 'Please enter both email and password.',
        });
    }
});





// signupBtn.addEventListener("click", () => {
//     if (signupEmail.value.trim() && signupPassword.value.trim()){
//         createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
//   .then((userCredential) => {
//     // Signed up 
//     const user = userCredential.user;
//     console.log(user);
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     alert(errorCode)
//     alert(errorCode)
   
        
      
       
//     switch (errorMessage) {
//         case  "Firebase: Error (auth/email-already-in-use).":
//            alert("use another email")
            
//             break;
//     }
// });
    
       
//     }else{
//        alert("put your data")
//     }
//    alert(error);
//     // location.href = "signin.html"
//   });
    
