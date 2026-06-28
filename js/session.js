// Check if Cognito redirected back with an authorization code
const params = new URLSearchParams(window.location.search);
const authCode = params.get("code");

if (authCode) {
    console.log("Authorization Code:", authCode);

    // Save temporarily (next step we'll exchange it for tokens)
    sessionStorage.setItem("authCode", authCode);

    // Remove the code from the URL
    window.history.replaceState({}, document.title, window.location.pathname);
}