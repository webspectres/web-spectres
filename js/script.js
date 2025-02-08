let projectCard = 
`<div id="project-card">
    <div id="project-img-div">
        <img src="{|project-img|}" class="project-img">
    </div>
    <p id="project-title">{|project-title|}</p>
</div>`;
let memberCard = 
`<div id="member-card" class="m{|member-id|}">
    <div id="member-img-div">
        <img src="{|member-img|}" alt="{|member-img-alt|}" id="member-img">
    </div>
    <p id="member-name">{|member-name|}</p>
    <p id="member-post">{|member-post|}</p>
</div>`;
let updateCard = 
`<div id="update-card" aid="{|update-id|}">
    <img src="{|update-img|}" id="update-img">
    <h2 id="update-title">{|update-title|}</h2>
    <p id="update-date">{|update-date|}</p>
</div>`;
let urlCMethod = 
`<div id="contact-method">
    <div id="cm-img-div">
        <img src="{|cmethod-img|}" id="cm-img" alt="{|cmethod-img-alt|}">
    </div>
    <p id="cm-details"><a id="cm-link" href="{|cmethod-url|}" target="_blank">{|cmethod|}</a></p>
</div>`;
let noUrlCMethod = 
`<div id="contact-method">
    <div id="cm-img-div">
        <img src="{|cmethod-img|}" id="cm-img" alt="{|cmethod-img-alt|}">
    </div>
    <p id="cm-details">{|cmethod|}</p>
</div>`
let smUpdateCard = 
`<div id="sm-update-card" aid="{|update-id|}">
    <img src="{|update-img|}" id="sm-update-img">
    <h2 id="sm-update-title">{|update-title|}</h2>
    <p id="sm-update-date">{|update-date|}</p>
</div>`;

let projectCards = document.getElementById("project-cards");
let memberCards = document.getElementById("member-cards");
let updateCards = document.getElementById("update-cards");
let contactMethods = document.getElementById("contact-methods");

let backdropOpenOnClose = false;
let seeMoreOpen = false;

document.addEventListener('click', e => {
    if(e.target.id === "update-popup"){
        popupClose();
    } else if(e.target.id === "sm-updates"){
        closeSeeMore();
    }
});

function popupOpen(title, content, img){
    let pTitle = document.getElementById("popup-title");
    let pContent = document.getElementById("popup-content")
    let backdrop = document.getElementById("backdrop")
    let popup = document.getElementById("update-popup")
    let popupBox =  document.getElementById("update-popup-box");
    pTitle.innerHTML = title;

    let hyperLinkReg = /{[^\|]+( )?\|\-( )?http(s)?:\/\/([a-zA-Z\-0-9]+\.)+[a-zA-Z\-]+(\?(([a-zA-Z0-9\_\-%]+(=[a-zA-Z0-9\_\-%]+)?&)+)?([a-zA-Z0-9\_\-%]+(=[a-zA-Z0-9\_\-%]+)?)|#[a-zA-Z0-9\_\-%]+)?}/g;

    let hyperLinks = content.match(hyperLinkReg);

    console.log(hyperLinks)
    hyperLinks.forEach(val => {
        let hyperLinkTag = `<a href="{|link|}">{|text|}</a>`;
        let linkText = /^{[^\|]+( )?\|\-/;
        let linkAddress = /http(s)?:\/\/([a-zA-Z\-0-9]+\.)+[a-zA-Z\-]+(\?(([a-zA-Z0-9\_\-%]+(=[a-zA-Z0-9\_\-%]+)?&)+)?([a-zA-Z0-9\_\-%]+(=[a-zA-Z0-9\_\-%]+)?)|#[a-zA-Z0-9\_\-%]+)?}$/g;
        content = content.replace(val, strReplace(hyperLinkTag, {
            text: val.match(linkText)[0].slice(1,-2), 
            link: val.match(linkAddress)[0].slice(0,-1)
        }));
    })

    pContent.innerHTML = content;
    backdrop.style.display = "block";
    popup.style.display = "grid";
    popupBox.style.display = "block";
    popupBox.style.animationName = "scaleUp";
    popupBox.style.animationDuration = ".3s"
    if(seeMoreOpen) backdrop.style.zIndex = "200";
}
function popupClose(){
    let backdrop = document.getElementById("backdrop")
    let popup = document.getElementById("update-popup")
    let popupBox =  document.getElementById("update-popup-box");
    popupBox.onanimationend = () => {
        popup.style.display = "none";
        if(backdropOpenOnClose === false) backdrop.style.display = "none";
        if(seeMoreOpen) backdrop.style.zIndex = "199";
        popupBox.onanimationend = null;
    }
    popupBox.style.animationName = "scaleDown";
    popupBox.style.animationDuration = ".2s";
}
function openSeeMore(updateObj){
    let popup = document.getElementById("sm-updates");
    let popupBox = document.getElementById("sm-updates-box");
    let cardOutput = document.getElementById("sm-update-cards");
    let backdrop = document.getElementById("backdrop")
    let updateObjs = Object.values(updateObj);
    if(updateObjs.length !== popupBox.children.length){
        cardOutput.innerHTML = "";
        for(let i = 0; i < updateObjs.length; i++){
            let val = updateObjs[i];
            cardOutput.innerHTML += strReplace(smUpdateCard, {
                "update-id": (typeof val.id === "number") ? val.id : i,
                "update-img": (val.img && typeof val.img === "string") ? val.img : "./imgs/updates/placeholder.png",
                "update-title": val.title,
                "update-date": val.date
            });
            for(let i = 0; i < cardOutput.children.length; i++){
                let elem = cardOutput.children[i];
                elem.onclick = () => {
                    let id = elem.getAttribute("aid");
                    backdropOpenOnClose = true;
                    popupOpen(updateObjs[i].title, updateObjs[i].long_content, updateObjs[i].img)
                }
            }
        }
    }
    backdrop.style.display = "block";
    popupBox.style.animationName = "scaleUp";
    popupBox.style.animationDuration = ".3s";
    popup.style.display = "grid";
    seeMoreOpen = true;
}
function closeSeeMore(){
    let popup = document.getElementById("sm-updates");
    let popupBox = document.getElementById("sm-updates-box");
    let backdrop = document.getElementById("backdrop")
    let upopup = document.getElementById("update-popup")
    let upopupBox =  document.getElementById("update-popup-box");
    let upopupOpen = (getComputedStyle(upopup).display === "none") ? false : true;
    if(upopupOpen){
        upopupBox.onanimationend = () => {
            upopup.style.display = "none";
            if(backdropOpenOnClose === false) backdrop.style.display = "none";
            upopupBox.onanimationend = null;
            popupBox.style.animationName = "slide-out-left";
            popupBox.style.animationDuration = ".3s";
            popupBox.onanimationend = () => {
                popup.style.display = "none";
                backdrop.style.display = "none";
                popupBox.onanimationend = null;
            }
        }
        upopupBox.style.animationName = "scaleDown";
        upopupBox.style.animationDuration = ".2s";
    } else{
        popupBox.style.animationName = "scaleDown";
        popupBox.style.animationDuration = ".3s";
        popupBox.onanimationend = () => {
            popup.style.display = "none";
            backdrop.style.display = "none";
            popupBox.onanimationend = null;
        }
    }
    backdrop.onclick = null;
    seeMoreOpen = false;
}
function strReplace(str, replaceObj){
    let keys = Object.keys(replaceObj);
    let returnStr = str;
    for(let i = 0; i < keys.length; i++){
        returnStr = returnStr.replace(RegExp(`{\\|${keys[i]}\\|}`,"g"),replaceObj[keys[i]]);
    }
    return returnStr;
}
function forEachUpdate(callback){}

fetch("../templates.json")
.then(val => val.json())
.then(json => {
    let projects = json.projects;
    Object.values(projects).forEach(val => {
        projectCards.innerHTML += strReplace(projectCard, {
            "project-img": val.project_img,
            "project-title": val.project_title
        });
    });
    let members = json.board;
    members.forEach(val => {
        memberCards.innerHTML += strReplace(memberCard, {
            "member-id": val.mid,
            "member-img": val.img,
            "member-img-alt": val.img_alt,
            "member-name": val.name,
            "member-post": val.post
        });
    })
    let updates = json.updates;
    let updateObjs = Object.values(updates);
    console.log(updateObjs)
    let seeMore = document.getElementById("see-more-updates")
    if(updateObjs.length > 3){
        seeMore.style.display = "block";
    }
    for(let i = 0; i < 3; i++){
        if(!updateObjs[i]) break;
        let val = updateObjs[i];
        updateCards.innerHTML += strReplace(updateCard, {
            "update-id": val.id,
            "update-img": (val.img && typeof val.img === "string") ? val.img : `./imgs/updates/placeholder.png`,
            "update-title": val.title,
            "update-date": val.date
        });
    };
    document.querySelectorAll("#update-card").forEach(elem => {
        let aId = elem.getAttribute("aid");
        let val = updates[`u${aId}`];
        console.log(val)
        elem.onclick = () => {
            backdropOpenOnClose = false;
            popupOpen(val.title, val.long_content)
        }
    });
    document.getElementById("popup-close").onclick = () => {
        popupClose(true);
    }
    seeMore.onclick = () => {
        if(updateObjs.length > 3){
            openSeeMore(updateObjs);
        }
    }
    document.getElementById("sm-close").onclick = closeSeeMore;

    let contact_methods = json.contact_methods;
    let cMethodObjs = Object.values(contact_methods);
    for(let i = 0; i < cMethodObjs.length; i++){
        let replaceTemplate = (cMethodObjs[i].url === undefined) ? noUrlCMethod : urlCMethod;
        contactMethods.innerHTML += strReplace(replaceTemplate,{
            "cmethod-img": cMethodObjs[i].icon,
            "cmethod-img-alt": cMethodObjs[i].icon_alt,
            "cmethod": cMethodObjs[i].content,
            "cmethod-url": cMethodObjs[i].url
        })
    }


    let hamburgerLines = document.querySelectorAll("#hamburger div");
    let hamburger = document.getElementById("hamburger");
    let sideNav = document.getElementById("side-nav");
    let sideNavElems = document.querySelectorAll("#snav-link");

    let sideNavStatus = "closed"

    hamburger.onclick = () => {
        if(sideNavStatus === "closed"){
            sideNav.onanimationend = () => {};
            sideNav.style.animationName = "navOpen"
            sideNav.style.animationDuration = ".3s"
            sideNav.style.display = "grid";
            hamburgerLines[2].style.display = "none";
            hamburgerLines[0].style.marginBottom = "-5px";
            hamburgerLines[0].onanimationend = () => hamburgerLines[0].style.transform = "rotate(45deg)";
            hamburgerLines[1].onanimationend = () => hamburgerLines[1].style.transform = "rotate(-45deg)";
            hamburgerLines[0].style.animationName = "rotate45";
            hamburgerLines[0].style.animationDuration = ".3s";
            hamburgerLines[1].style.animationName = "rotateM45";
            hamburgerLines[1].style.animationDuration = ".3s";
            sideNavStatus = "opened";
        } else if(sideNavStatus === "opened"){
            sideNav.style.animationName = "navClose"
            sideNav.style.animationDuration = ".3s"
            sideNav.onanimationend = () => sideNav.style.display = "none";
            hamburgerLines[0].style.animationName = "rotate0";
            hamburgerLines[0].style.animationDuration = ".3s";
            hamburgerLines[1].style.animationName = "rotate0";
            hamburgerLines[1].style.animationDuration = ".3s";
            hamburgerLines[0].style.marginBottom = "5px";
            hamburgerLines[2].style.animationName = "ty0"
            hamburgerLines[2].style.animationDuration = ".3s"
            hamburgerLines[2].style.display = "block";
            hamburgerLines[0].onanimationend = () => hamburgerLines[0].style.transform = "rotate(0deg)";
            hamburgerLines[1].onanimationend = () => {
                hamburgerLines[1].style.transform = "rotate(0deg)";           
            }
            sideNavStatus = "closed"
        }
    }

    sideNavElems.forEach(val => {
        val.onclick = () => hamburger.click();
    })
});

let searchInput = document.getElementById("update-search-input");
let searchBtn = document.getElementById("update-search-btn");

searchInput.onkeydown = (e) => {
    if(e.key === "Enter" && !e.shiftKey && !e.metaKey && !e.ctrlKey){
        searchBtn.click();
    }
}

searchBtn.onclick = () => {
    let elems = document.querySelectorAll("#sm-update-card");
    let showCount = 0;
    elems.forEach(elem => {
        if(!elem.querySelector("h2").innerText.toLowerCase().includes(searchInput.value.toLowerCase())){
            elem.style.display = "none";
        } else{
            elem.style.display = "grid";
            showCount++;
        }
    });
    if(showCount === 0){
        document.getElementById("no-updates").style.display = "block";
    } else{
        document.getElementById("no-updates").style.display = "none";
    }
}
