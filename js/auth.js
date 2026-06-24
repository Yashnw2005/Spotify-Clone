const modal = document.getElementById("authModal");

const openLogin = document.getElementById("openLogin");
const openSignup = document.getElementById("openSignup");

const closeBtn = document.getElementById("closeAuth");

const authTitle = document.getElementById("authTitle");
const authSubmit = document.getElementById("authSubmit");

const switchAuth = document.getElementById("switchAuth");

const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");

let signupMode = false;

// Clear form
function clearForm() {
    authEmail.value = "";
    authPassword.value = "";
}

// Open Login Modal
openLogin.addEventListener("click", () => {

    modal.style.display = "flex";

    signupMode = false;

    authTitle.innerText = "Welcome Back";

    authSubmit.innerText = "Login";

    switchAuth.innerHTML =
        `Don't have an account?
         <span>Create Account</span>`;
});

// Open Signup Modal
openSignup.addEventListener("click", () => {

    modal.style.display = "flex";

    signupMode = true;

    authTitle.innerText = "Create Account";

    authSubmit.innerText = "Sign Up";

    switchAuth.innerHTML =
        `Already have an account?
         <span>Login</span>`;
});

// Close Modal
closeBtn.addEventListener("click", () => {

    clearForm();

    modal.style.display = "none";
});

// Close when clicking outside modal
window.addEventListener("click", (e) => {

    if (e.target === modal) {

        clearForm();

        modal.style.display = "none";
    }
});

// Toggle Login <-> Signup
switchAuth.addEventListener("click", () => {

    signupMode = !signupMode;

    if (signupMode) {

        authTitle.innerText = "Create Account";

        authSubmit.innerText = "Sign Up";

        switchAuth.innerHTML =
            `Already have an account?
             <span>Login</span>`;

    } else {

        authTitle.innerText = "Welcome Back";

        authSubmit.innerText = "Login";

        switchAuth.innerHTML =
            `Don't have an account?
             <span>Create Account</span>`;
    }
});

authSubmit.addEventListener("click", () => {

    const clientId =
        "6sihldp8pdulo7gbril5qt5fu3";

    const redirectUri =
        "http://127.0.0.1:5500";

    const domain =
        "https://ap-south-11hmmd2yzb.auth.ap-south-1.amazoncognito.com";

    if (signupMode) {

        window.location.href =
            `${domain}/signup?client_id=${clientId}&response_type=code&scope=email+openid&redirect_uri=${encodeURIComponent(redirectUri)}`;

    } else {

        window.location.href =
            `${domain}/login?client_id=${clientId}&response_type=code&scope=email+openid&redirect_uri=${encodeURIComponent(redirectUri)}`;
    }
});