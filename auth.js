let tokenClient;
let accessToken = null;

async function initGoogleAuth() {

    await new Promise(resolve => {
        gapi.load("client", resolve);
    });

    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC]
    });

    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: async (response) => {

            if (response.error) {
                console.error(response);
                alert("ログインに失敗しました。");
                return;
            }

            accessToken = response.access_token;

            document.getElementById("loginBtn").textContent =
                "ログイン済み";

            if (typeof loadInbox === "function") {
                loadInbox();
            }

        }
    });

}

window.addEventListener("load", async () => {

    try{
        await initGoogleAuth();
    }
    catch(e){
        console.error(e);
        alert("Google APIの初期化に失敗しました");
    }

});

document.getElementById("loginBtn").addEventListener("click", () => {

    tokenClient.requestAccessToken({
        prompt:"consent"
    });

});