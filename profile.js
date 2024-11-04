import { getAuth, onAuthStateChanged, updateProfile, sendEmailVerification, signOut  } from "./firebase.js";

const auth = getAuth();

let logoutBtn = document.getElementById("logoutBtn");
let editProfile = document.getElementById("editProfileBtn");
let verifyEmailBtn = document.getElementById("verifyemail");
let deleteAccount = document.getElementById("deleteAccountBtn");
let updatePasswordBtn = document.getElementById("updatePasswordBtn");

logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        Swal.fire({
            title: "Success!",
            text: "You have been logged out successfully!",
            icon: "success",
            confirmButtonText: "OK"
        }).then(() => {
            window.location.href = "signin.html"; 
        });
    }).catch((error) => {
        console.error("Sign Out Error", error);
        Swal.fire({
            title: "Error!",
            text: "Error signing out: " + error.message,
            icon: "error",
            confirmButtonText: "OK"
        });
    });
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        const { displayName, photoURL, email, emailVerified} = user;
        
        document.getElementById("userName").innerText = `Welcome, ${displayName || "User"}`;
        document.getElementById("userEmail").innerText = `Email: ${email || "Not available"}`;
        document.getElementById("profilePic").src = photoURL || "path_to_your_default_image.jpg";

        const verificationStatus = emailVerified ? "Verified" : "Not Verified";
        document.getElementById("emailVerificationStatus").innerText = `Email Status: ${verificationStatus}`;
        // Check if displayName or photoURL is missing
        if (!displayName || !photoURL) {
            setTimeout(() => promptForProfileUpdate(user), 1000); 
        }


    } else {
        console.log("User is logged out");
    }
});

function promptForProfileUpdate(user) {
    Swal.fire({
        title: "Complete Your Profile",
        html: `
            <input type="text" id="displayName" class="swal2-input" placeholder="Enter Display Name" value="${user.displayName || ''}">
            <input type="url" id="photoURL" class="swal2-input" placeholder="Enter Photo URL (optional)" value="${user.photoURL || ''}">
        `,
        confirmButtonText: "Save",
        preConfirm: () => {
            const displayName = document.getElementById("displayName").value;
            const photoURL = document.getElementById("photoURL").value;

            if (!displayName) {
                Swal.showValidationMessage("Please fill all fields!");
                return false;
            }

            return { displayName, photoURL };
        }
    }).then((result) => {
        if (result.isConfirmed) {
    
            updateProfile(user, {
                displayName: result.value.displayName,
                photoURL: result.value.photoURL || null
            }).then(() => {
                updateUserProfile(result.value.displayName, result.value.photoURL, user.email);
                Swal.fire({
                    title: "Profile Updated",
                    text: "Your profile has been updated successfully!",
                    icon: "success",
                    confirmButtonText: "OK"
                });
            }).catch((error) => {
                console.error("Error updating profile:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Could not update profile: " + error.message,
                    icon: "error",
                    confirmButtonText: "OK"
                });
            });
        }
    });
}

function updateUserProfile(displayName, photoURL, email, emailVerified) {
    document.getElementById("userName").innerText = `Welcome, ${displayName}`;
    document.getElementById("userEmail").innerText = `Email: ${email || "Not available"}`;
    document.getElementById("profilePic").src = photoURL || "path_to_your_default_image.jpg";
    document.getElementById("emailVerificationStatus").innerText = `Email Status: ${emailVerified ? "Verified" : "Not Verified"}`;
}

if (editProfile) {
    editProfile.addEventListener("click", () => {
        promptForProfileUpdate(auth.currentUser);
    });
}

verifyEmailBtn.addEventListener("click", () => {
    const user = auth.currentUser;
    if (user) {
        sendEmailVerification(user).then(() => {
            Swal.fire({
                title: "Email Verification Sent",
                text: "Please check your inbox for the verification email. Click the link to complete the registration process.",
                icon: "success",
                confirmButtonText: "OK"
            });
        }).catch((error) => {
            console.error("Error sending email verification:", error);
            Swal.fire({
                title: "Error!",
                text: "Could not send email verification: " + error.message,
                icon: "error",
                confirmButtonText: "OK"
            });
        });
    }
});

deleteAccount.addEventListener("click", () => {
    const user = auth.currentUser;
    if (user) {
        Swal.fire({
            title: "Delete Account",
            text: "Are you sure you want to delete your account? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#90EE90",
            cancelButtonColor: "#FFB6C1",
            confirmButtonText: "Yes, delete account"
        }).then((result) => {
            if (result.isConfirmed) {

                signOut(auth).then(() => {
                    user.delete().then(() => {
                        Swal.fire({
                            title: "Account Deleted",
                            text: "Your account has been deleted successfully!",
                            icon: "success",
                            confirmButtonText: "OK"
                        }).then(() => {
                            window.location.href = "index.html"; 
                        });
                    }).catch((error) => {
                        console.error("Error deleting user:", error);
                        if (error.code === 'auth/requires-recent-login') {
                            Swal.fire({
                                title: "Session Expired",
                                text: "Please log in again to delete your account.",
                                icon: "info",
                                confirmButtonText: "OK"
                            }).then(() => {
                                window.location.href = "index.html"; 
                            });
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Could not delete account: " + error.message,
                                icon: "error",
                                confirmButtonText: "OK"
                            });
                        }
                    });
                }).catch((error) => {
                    console.error("Error signing out:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Could not sign out: " + error.message,
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                });
            }
        });
    }
});


updatePasswordBtn.addEventListener("click", () => {
    const user = auth.currentUser;
    if (user) {
        Swal.fire({
            title: 'Enter New Password',
            html: `
                <input type="password" id="newPassword" class="swal2-input" placeholder="Enter new password" minlength="6" required>
                <input type="password" id="confirmPassword" class="swal2-input" placeholder="Confirm new password" minlength="6" required>
            `,
            confirmButtonText: 'Update Password',
            preConfirm: () => {
                const newPassword = document.getElementById("newPassword").value;
                const confirmPassword = document.getElementById("confirmPassword").value;

                if (newPassword !== confirmPassword) {
                    Swal.showValidationMessage("wrong password. Please try again.");
                    return false;
                }

            
                if (newPassword.length < 6) {
                    Swal.showValidationMessage("Password must be at least 6 characters long.");
                    return false;
                }

                return newPassword;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const newPassword = result.value;

                updatePasswordBtn(user, newPassword).then(() => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Your password successfully updated .',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                }).catch((error) => {
                    console.error('Error updating password:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Could not update password: ' + error.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
            }
        });
    }
});