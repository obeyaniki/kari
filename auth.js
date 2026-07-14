let tokenClient = null;
let gapiReady = false;
let gisReady = false;

function gapiLoaded() {
    gapi.load("client", initializeGapiClient);
}

async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC]
    });

    gapiReady = true;
    maybeEnableButton();
}

function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: async (tokenResponse) => {

            if (tokenResponse.error) {
                console.error(tokenResponse);
                alert("Google認証に失敗しました。");
                return;
            }

            document.getElementById("loginBtn").textContent =
                "ログイン済み";

            await loadInbox();
        }
    });

    gisReady = true;
    maybeEnableButton();
}

function maybeEnableButton() {

    if (gapiReady && gisReady) {

        document.getElementById("loginBtn").disabled = false;

    }

}

window.onload = () => {

    document.getElementById("loginBtn").disabled = true;

    gapiLoaded();

    gisLoaded();

};

document.getElementById("loginBtn").onclick = () => {

    tokenClient.requestAccessToken({
        prompt: "consent"
    });

};
