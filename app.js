document.querySelectorAll(".menu").forEach(btn=>{

    btn.onclick=()=>{

        document.querySelectorAll(".menu")
            .forEach(x=>x.classList.remove("active"));

        btn.classList.add("active");

        loadInbox();

    };

});

document.getElementById("searchBox")
.addEventListener("input",e=>{

    const keyword=e.target.value.toLowerCase();

    document.querySelectorAll(".mail").forEach(mail=>{

        mail.style.display=
            mail.textContent.toLowerCase().includes(keyword)
            ? ""
            : "none";

    });

});