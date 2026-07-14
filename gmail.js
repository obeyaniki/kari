async function loadInbox(pageToken = null) {

    const response = await gapi.client.gmail.users.messages.list({
        userId: "me",
        maxResults: 25,
        pageToken: pageToken || undefined
    });

    const mailList = document.getElementById("mailList");
    mailList.innerHTML = "";

    if (!response.result.messages) {
        mailList.innerHTML = "<p>メールがありません。</p>";
        return;
    }

    for (const mail of response.result.messages) {

        const detail = await gapi.client.gmail.users.messages.get({
            userId: "me",
            id: mail.id,
            format: "metadata",
            metadataHeaders: ["Subject","From","Date"]
        });

        const headers = detail.result.payload.headers;

        const subject =
            headers.find(h=>h.name==="Subject")?.value || "(件名なし)";

        const from =
            headers.find(h=>h.name==="From")?.value || "(送信者不明)";

        const date =
            headers.find(h=>h.name==="Date")?.value || "";

        const div = document.createElement("div");
        div.className="mail";

        div.innerHTML=`
            <div class="subject">${subject}</div>
            <div class="from">${from}</div>
            <small>${date}</small>
        `;

        div.onclick=()=>openMail(mail.id);

        mailList.appendChild(div);

    }

}

async function openMail(id){

    const detail = await gapi.client.gmail.users.messages.get({
        userId:"me",
        id:id,
        format:"full"
    });

    let body="";

    if(detail.result.snippet){
        body=detail.result.snippet;
    }

    document.getElementById("mailContent").innerHTML=`
        <h2>本文</h2>
        <p>${body}</p>
    `;

}