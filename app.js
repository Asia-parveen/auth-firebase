import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider, signInWithPopup } from "./firebase.js";

const auth = getAuth();
const provider = new GoogleAuthProvider();

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
googleBtn.addEventListener("click", () => {
    console.log("Google Login button was clicked");
  
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google LogIn successful:", result.user);
  
        Swal.fire({
          icon: "success",
          title: "Sign-In Successful",
          text: `Welcome user, ${result.user.displayName}! Redirecting to your profile...`,
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          window.location.href = "profile.html";
        });
      })
      .catch((error) => {
        console.error("Error during Google sign-in:", error);
  
        let message = " unknown error occurred.";
        switch (error.code) {
          case "auth/popup-blocked":
            message = "Popup was blocked. Please allow popups.";
            break;
          case "auth/popup-closed-by-user":
            message = "closed the popup. Try again.";
            break;
          case "auth/invalid-api-key":
            message = "Invalid API key.";
            break;
          case "auth/network-request-failed":
            message = "Network error.";
            break;
          case "auth/account-exists-with-different-credential":
            message = "An account exists with this email.";
            break;
          case "auth/operation-not-allowed":
            message = "Google Sign-In is not enabled.";
            break;
        }
  
        Swal.fire({
          icon: "error",
          title: "Sign-In Failed",
          text: message,
        });
      });
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
    
