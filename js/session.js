const clientId = "6sihldp8pdulo7gbril5qt5fu3";

const redirectUri =
    "https://main.d2kk1brrq39ha7.amplifyapp.com/";

const domain =
    "https://ap-south-11hmmd2yzb.auth.ap-south-1.amazoncognito.com";

window.addEventListener("load", async () => {

    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");

    if (!code) return;

    try {

        const response = await fetch(`${domain}/oauth2/token`, {

            method: "POST",

            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },

            body: new URLSearchParams({

                grant_type: "authorization_code",

                client_id: clientId,

                code: code,

                redirect_uri: redirectUri

            })

        });

        const tokens = await response.json();

        console.log(tokens);

    } catch (err) {

        console.error(err);

    }

});