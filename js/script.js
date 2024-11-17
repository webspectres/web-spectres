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

let projectCards = document.getElementById("project-cards");
let memberCards = document.getElementById("member-cards");

fetch("./templates.json")
.then(val => val.json())
.then(json => {
    let projects = json.projects;
    Object.values(projects).forEach(val => {
        projectCards.innerHTML += projectCard
        .replace(/{\|project-img\|}/g, val.project_img)
        .replace(/{\|project-title\|}/g, val.project_title)
    });
    let members = json.board;
    members.forEach(val => {
        memberCards.innerHTML += memberCard
        .replace(/{\|member-id\|}/g, val.mid)
        .replace(/{\|member-img\|}/g, val.img)
        .replace(/{\|member-img-alt\|}/g, val.img_alt)
        .replace(/{\|member-name\|}/g, val.name)
        .replace(/{\|member-post\|}/g, val.post)
    })
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
})