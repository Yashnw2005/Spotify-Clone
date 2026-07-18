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

const clientId = "6sihldp8pdulo7gbril5qt5fu3";

const redirectUri =
    "https://main.d2kk1brrq39ha7.amplifyapp.com/";

const domain =
    "https://ap-south-11hmmd2yzb.auth.ap-south-1.amazoncognito.com";

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

    if (signupMode) {

        window.location.href =
            `${domain}/signup?client_id=${clientId}&response_type=code&scope=email+openid&redirect_uri=${encodeURIComponent(redirectUri)}`;

    } else {

        window.location.href =
            `${domain}/login?client_id=${clientId}&response_type=code&scope=email+openid&redirect_uri=${encodeURIComponent(redirectUri)}`;
    }

});

async function exchangeCodeForToken(code) {

    const response = await fetch(
        `${domain}/oauth2/token`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body:
                `grant_type=authorization_code` +
                `&client_id=${clientId}` +
                `&code=${code}` +
                `&redirect_uri=${encodeURIComponent(redirectUri)}`
        }
    );

    return await response.json();
}

// ===============================
// Check if user returned from Cognito
// ===============================

window.addEventListener("load", async () => {

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) return;

    try {

        const tokens = await exchangeCodeForToken(code);

        console.log("Tokens:", tokens);

        // Hide Login & Signup
        document.getElementById("openLogin").style.display = "none";
        document.getElementById("openSignup").style.display = "none";

        // Show User Section
        document.getElementById("userSection").style.display = "flex";

    } catch (error) {

        console.error("Login Error:", error);

    }

});

// ===============================
// Logout
// ===============================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        const clientId = "6sihldp8pdulo7gbril5qt5fu3";

        const logoutUri =
            "https://main.d2kk1brrq39ha7.amplifyapp.com/";

        const domain =
            "https://ap-south-11hmmd2yzb.auth.ap-south-1.amazoncognito.com";

        window.location.href =
            `${domain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;

    });

}