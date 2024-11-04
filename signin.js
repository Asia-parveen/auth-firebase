import { getAuth,  signInWithEmailAndPassword }  from "./firebase.js";
const auth = getAuth();

const signinEmail = document.getElementById("signinEmail");
const signinPassword = document.getElementById("signinPassword");
const signinBtn = document.getElementById("signinBtn");

signinBtn.addEventListener("click", () => {
    if (signinEmail.value.trim() && signinPassword.value.trim()) {
        signInWithEmailAndPassword(auth, signinEmail.value, signinPassword.value)
            .then((userCredential) => {
                // Signed in successfully
                const user = userCredential.user;
                console.log(user);

                // Success message with SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Signed In!',
                    text: 'You have successfully signed in!',
                }).then(() => {
                    // Redirect to profile page if needed
                     window.location.href = "profile.html";
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                // Error handling with SweetAlert
                Swal.fire({
                    icon: 'error',
                    title: 'Sign In Failed',
                    text: errorMessage,
                });
            });
    } else {
        // Warning message with SweetAlert for empty fields
        Swal.fire({
            icon: 'warning',
            title: 'Incomplete Information',
            text: 'Please enter both email and password.',
        });
    }
});





// signinBtn.addEventListener("click",() => {
//     if(signinEmail.value.trim() && signinPassword.value.trim()){
//         signInWithEmailAndPassword(auth, signinEmail.value, signinPassword.value)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     console.log(user)
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     alert(errorCode)
//     alert(errorMessage)
//   });
//     }else{
//         console.log("Enter your data");
//     }
//      // location.href = "profile.html"
// });